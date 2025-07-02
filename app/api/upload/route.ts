import { type NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get("file") as unknown as File
    const category = data.get("category") as string

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create filename with timestamp to avoid conflicts
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name}`

    // Create category folder path
    const categoryPath = join(process.cwd(), "public", "uploads", category)
    const filePath = join(categoryPath, filename)

    // Create directory if it doesn't exist
    const fs = require("fs")
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true })
    }

    // Write file
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
