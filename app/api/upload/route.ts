import { type NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import { getServerUser } from "@/lib/supabase-server"

export async function POST(request: NextRequest) {
  const user = await getServerUser()
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.formData()
    const file: File | null = data.get("file") as unknown as File
    const category = data.get("category") as string

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name}`

    const categoryPath = join(process.cwd(), "public", "uploads", category)
    const filePath = join(categoryPath, filename)

    const fs = require("fs")
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true })
    }

    await writeFile(filePath, buffer)

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      filename: filename,
      path: `/uploads/${category}/${filename}`,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ success: false, message: "Upload failed" })
  }
}
