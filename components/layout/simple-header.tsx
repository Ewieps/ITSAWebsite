"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function SimpleHeader() {
  const navigation = [
    { name: "Beranda", href: "/" },
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Prestasi", href: "/prestasi" },
    { name: "Kegiatan", href: "/kegiatan" },
    { name: "Galeri", href: "/galeri" },
    { name: "Kontak", href: "/kontak" },
  ]

  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/uploads/material/ITSAlogo.png" alt="ITS Archery" width={32} height={32} className="rounded" />
            <span className="font-bold text-xl text-gray-900">ITS Archery</span>
          </Link>

          {/* Navigation - Horizontal scroll on mobile */}
          <nav className="flex items-center space-x-6 overflow-x-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-primary whitespace-nowrap transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Button className="ml-4 flex-shrink-0">Bergabung</Button>
        </div>
      </div>
    </header>
  )
}
