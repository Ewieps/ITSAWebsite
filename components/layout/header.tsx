"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Header() {
  const navigation = [
    { name: "Beranda", href: "/" },
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Prestasi", href: "/prestasi" },
    { name: "Kegiatan", href: "/kegiatan" },
    { name: "Galeri", href: "/galeri" },
    { name: "Kontak", href: "/kontak" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/uploads/material/ITSAlogo.png" alt="ITS Archery" width={32} height={32} className="rounded" />
            <span className="font-bold text-xl">ITS Archery</span>
          </Link>

          {/* Desktop Navigation */}
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
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-primary-foreground" asChild>
              <Link href="/pendaftaran">Pendaftaran</Link>
            </Button>
          </div>
        </div>
      </div>
            {/* <Button>Bergabung</Button>
          </div>
        </div>
      </div> */}
    </header>
  )
}
