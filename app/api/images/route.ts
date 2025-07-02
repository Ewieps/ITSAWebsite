import { NextResponse } from "next/server"
import { readdir } from "fs/promises"
import { join } from "path"

export async function GET() {
  try {
    const uploadsPath = join(process.cwd(), "public", "uploads")
    const categories = ["gallery", "achievements", "events", "members"]

    const images: any[] = []

    for (const category of categories) {
      try {
        const categoryPath = join(uploadsPath, category)
        const files = await readdir(categoryPath)

        files.forEach((file) => {
          if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            images.push({
              id: `${category}-${file}`,
              filename: file,
              category: category,
              path: `/uploads/${category}/${file}`,
              uploadDate: new Date().toISOString(), // In real app, get from database
            })
          }
        })
      } catch (error) {
        // Category folder doesn't exist yet, skip
        continue
      }
    }

    return NextResponse.json({ success: true, images })
  } catch (error) {
    console.error("Error fetching images:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch images" })
  }
}
