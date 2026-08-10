import { google } from "googleapis"
import type { Registration } from "@/lib/supabase"

let cachedClient: ReturnType<typeof buildClient> | null = null

function buildClient() {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!keyJson) return null

  let credentials: {
    client_email: string
    private_key: string
  }
  try {
    credentials = JSON.parse(keyJson)
  } catch {
    return null
  }

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })

  return google.sheets({ version: "v4", auth })
}

function getClient() {
  if (!cachedClient) cachedClient = buildClient()
  return cachedClient
}

export function isSheetsConfigured() {
  if (
    !process.env.GOOGLE_SPREADSHEET_ID ||
    !process.env.GOOGLE_SHEET_NAME ||
    !process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  ) {
    return false
  }
  try {
    const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY)
    return Boolean(creds.client_email && creds.private_key)
  } catch {
    return false
  }
}

function sheetNameFor(tipe: Registration["tipe"]) {
  const base = process.env.GOOGLE_SHEET_NAME || "Registrations"
  return tipe === "atlet" ? `${base} Atlet` : `${base} Umum`
}

async function ensureTabs(
  sheets: NonNullable<ReturnType<typeof buildClient>>,
  spreadsheetId: string
) {
  const titles = [sheetNameFor("umum"), sheetNameFor("atlet")]
  try {
    const { data } = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: "sheets.properties.title",
    })
    const existing = new Set(
      (data.sheets || []).map((s) => s.properties?.title).filter(Boolean)
    )
    const missing = titles.filter((t) => !existing.has(t))
    if (missing.length > 0) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: missing.map((title) => ({ addSheet: { properties: { title } } })),
        },
      })
    }
  } catch (err) {
    console.error("Google Sheets ensure tabs error:", err)
  }
}

function answersToText(jawaban?: Registration["jawaban_pengetahuan"]) {
  if (!jawaban?.length) return ""
  return jawaban
    .map((j) => `${j.pertanyaan}: ${j.jawaban}`)
    .join(" | ")
}

function hyperlink(url?: string | null, label = "Lihat PDF") {
  if (!url) return ""
  return `=HYPERLINK("${url}", "${label}")`
}

function formatWIB(iso: string) {
  const date = new Date(iso)
  const wib = new Date(date.getTime() + 7 * 3600 * 1000)
  const pad = (n: number) => String(n).padStart(2, "0")
  const dd = pad(wib.getUTCDate())
  const mm = pad(wib.getUTCMonth() + 1)
  const yyyy = wib.getUTCFullYear()
  const hh = pad(wib.getUTCHours())
  const mi = pad(wib.getUTCMinutes())
  return `${dd}/${mm}/${yyyy} ${hh}:${mi} WIB`
}

function regToRow(reg: Registration) {
  return [
    reg.nama_lengkap,
    reg.nrp,
    reg.jurusan,
    reg.no_telepon,
    reg.email || "",
    reg.tipe,
    reg.jenis_panah || "",
    answersToText(reg.jawaban_pengetahuan),
    hyperlink(reg.file_url_komitmen),
    hyperlink(reg.file_url_bukti_ig),
    hyperlink(reg.file_url_portofolio),
    reg.status,
    `${formatWIB(reg.created_at)} (${new Date(reg.created_at).toISOString()})`,
  ]
}

export const SHEET_HEADERS = [
  "Nama Lengkap",
  "NRP",
  "Jurusan",
  "No Telepon",
  "Email",
  "Tipe",
  "Jenis Panah",
  "Jawaban Pengetahuan",
  "Surat Komitmen",
  "Bukti Instagram",
  "Portofolio",
  "Status",
  "Tanggal Daftar (WIB / Zulu)",
]

const COLUMNS = "A:M"

export async function appendRegistrationToSheet(reg: Registration) {
  const sheets = getClient()
  if (!sheets) {
    throw new Error(
      "Google Sheets client tidak dapat dibuat. Periksa GOOGLE_SERVICE_ACCOUNT_KEY (harus JSON satu baris, private_key dengan \\n)."
    )
  }

  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID!
  const sheetName = sheetNameFor(reg.tipe)

  await ensureTabs(sheets, spreadsheetId)
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!${COLUMNS}`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [regToRow(reg)] },
  })
  return res.status === 200
}

export async function ensureSheetHeaders() {
  const sheets = getClient()
  if (!sheets || !isSheetsConfigured()) return

  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID

  try {
    await ensureTabs(sheets, spreadsheetId!)
    for (const title of [sheetNameFor("umum"), sheetNameFor("atlet")]) {
      try {
        const { data } = await sheets.spreadsheets.values.get({
          spreadsheetId: spreadsheetId!,
          range: `${title}!A1:M`,
        })
        const existing = data.values?.[0]
        if (!existing || existing.length === 0) {
          await sheets.spreadsheets.values.update({
            spreadsheetId: spreadsheetId!,
            range: `${title}!A1:M`,
            valueInputOption: "RAW",
            requestBody: { values: [SHEET_HEADERS] },
          })
        }
      } catch {
        // ignore — headers likely missing but append still works
      }
    }
  } catch (err) {
    console.error("Google Sheets ensure headers error:", err)
  }
}

export async function pushAllRegistrationsToSheet(regs: Registration[]) {
  const sheets = getClient()
  if (!sheets) {
    throw new Error(
      "Google Sheets client tidak dapat dibuat. Periksa GOOGLE_SERVICE_ACCOUNT_KEY (harus JSON satu baris, private_key dengan \\n)."
    )
  }

  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID!

  await ensureTabs(sheets, spreadsheetId)
  let total = 0

  for (const tipe of ["umum", "atlet"] as const) {
    const title = sheetNameFor(tipe)
    const rows = regs.filter((r) => r.tipe === tipe).map(regToRow)

    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: `${title}!${COLUMNS}`,
    })
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${title}!A1:M`,
      valueInputOption: "RAW",
      requestBody: { values: [SHEET_HEADERS] },
    })
    if (rows.length > 0) {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${title}!A2:M`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: rows },
      })
    }
    total += rows.length
  }

  return total
}
