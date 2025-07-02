"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Target } from "lucide-react"

export default function Header() {
  const navigation = [
    { name: "Beranda", href: "/" },
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Prestasi", href: "/prestasi" },
    { name: "Kegiatan", href: "/kegiatan" },
    { name: "Galeri", href: "/galeri" },
    { name: "Blog", href: "/blog" },
    { name: "Kontak", href: "/kontak" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">ITS Archery</span>
          </Link>

          {/* Desktop Navigation - Always visible */}
          <nav className="flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Button>Bergabung</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
