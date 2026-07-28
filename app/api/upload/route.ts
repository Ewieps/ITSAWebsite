import { type NextRequest, NextResponse } from "next/server"
import { getServerUser } from "@/lib/supabase-server"
import { uploadFile } from "@/lib/storage"

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

    const publicUrl = await uploadFile(file, category)

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      path: publicUrl,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 })
  }
}
