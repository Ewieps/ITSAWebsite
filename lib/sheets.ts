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
  return Boolean(process.env.GOOGLE_SPREADSHEET_ID && process.env.GOOGLE_SHEET_NAME && process.env.GOOGLE_SERVICE_ACCOUNT_KEY)
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
  "Tipe",
  "Jenis Panah",
  "Jawaban Pengetahuan",
  "Surat Komitmen",
  "Bukti Instagram",
  "Portofolio",
  "Status",
  "Tanggal Daftar (WIB / Zulu)",
]

export async function appendRegistrationToSheet(reg: Registration) {
  const sheets = getClient()
  if (!sheets || !isSheetsConfigured()) return false

  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID
  const sheetName = process.env.GOOGLE_SHEET_NAME || "Registrations"

  try {
    const res = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:L`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [regToRow(reg)] },
    })
    return res.status === 200
  } catch (err) {
    console.error("Google Sheets append error:", err)
    return false
  }
}

export async function ensureSheetHeaders() {
  const sheets = getClient()
  if (!sheets || !isSheetsConfigured()) return

  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID
  const sheetName = process.env.GOOGLE_SHEET_NAME || "Registrations"

  try {
    const { data } = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:L1`,
    })
    const existing = data.values?.[0]
    if (!existing || existing.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1:L1`,
        valueInputOption: "RAW",
        requestBody: { values: [SHEET_HEADERS] },
      })
    }
  } catch {
    // ignore — headers likely missing but append still works
  }
}

export async function pushAllRegistrationsToSheet(regs: Registration[]) {
  const sheets = getClient()
  if (!sheets || !isSheetsConfigured()) return 0

  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID
  const sheetName = process.env.GOOGLE_SHEET_NAME || "Registrations"

  try {
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: `${sheetName}!A:L`,
    })
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1:L1`,
      valueInputOption: "RAW",
      requestBody: { values: [SHEET_HEADERS] },
    })
    const rows = regs.map(regToRow)
    if (rows.length > 0) {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetName}!A2:L`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: rows },
      })
    }
    return rows.length
  } catch (err) {
    console.error("Google Sheets sync error:", err)
    return 0
  }
}
