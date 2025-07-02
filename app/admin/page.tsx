"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, ImageIcon, Users, Trophy, Calendar, Settings } from "lucide-react"

export default function AdminPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append("file", selectedFile)
    formData.append("category", "gallery")

    try {
      // Simulasi upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      // Reset form
      setSelectedFile(null)
      setUploadProgress(0)
      alert("Gambar berhasil diupload!")
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Upload gagal!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Kelola konten website ITS Archery</p>
        </div>

        <Tabs defaultValue="images" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="images">
              <ImageIcon className="w-4 h-4 mr-2" />
              Gambar
            </TabsTrigger>
            <TabsTrigger value="members">
              <Users className="w-4 h-4 mr-2" />
              Anggota
            </TabsTrigger>
            <TabsTrigger value="achievements">
              <Trophy className="w-4 h-4 mr-2" />
              Prestasi
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="w-4 h-4 mr-2" />
              Kegiatan
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Pengaturan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Gambar</CardTitle>
                <CardDescription>Upload gambar untuk galeri, prestasi, atau kegiatan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Drag & drop gambar atau klik untuk browse</p>
                    <Input type="file" accept="image/*" onChange={handleFileSelect} className="max-w-xs mx-auto" />
                  </div>
                </div>

                {selectedFile && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <Badge variant="secondary">Ready</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Kategori</label>
                        <select className="w-full px-3 py-2 border rounded-md">
                          <option value="gallery">Galeri</option>
                          <option value="achievements">Prestasi</option>
                          <option value="events">Kegiatan</option>
                          <option value="members">Anggota</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Judul</label>
                        <Input placeholder="Masukkan judul gambar" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Deskripsi</label>
                      <Textarea placeholder="Deskripsi gambar (opsional)" />
                    </div>

                    {uploadProgress > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <Button onClick={handleUpload} className="w-full">
                      Upload Gambar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Gallery Management */}
            <Card>
              <CardHeader>
                <CardTitle>Kelola Galeri</CardTitle>
                <CardDescription>Gambar yang sudah diupload</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div key={item} className="relative group">
                      <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary">
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive">
                            Hapus
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>Kelola Anggota</CardTitle>
                <CardDescription>Tambah dan edit data anggota</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Fitur kelola anggota akan segera hadir...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Kelola Prestasi</CardTitle>
                <CardDescription>Tambah dan edit prestasi</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Fitur kelola prestasi akan segera hadir...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Kelola Kegiatan</CardTitle>
                <CardDescription>Tambah dan edit kegiatan</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Fitur kelola kegiatan akan segera hadir...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Website</CardTitle>
                <CardDescription>Konfigurasi umum website</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Fitur pengaturan akan segera hadir...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
