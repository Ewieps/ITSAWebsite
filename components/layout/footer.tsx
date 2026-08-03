"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Youtube, Mail, Phone } from "lucide-react"

export default function Footer() {
  const [contact, setContact] = useState({
    phone: "+62 812-3456-7890",
    email: "info@itsarchery.com",
    instagram: "",
    facebook: "",
    youtube: "",
  })

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.settings.contact) {
          const c = data.settings.contact
          setContact({
            phone: c.phone || "+62 812-3456-7890",
            email: c.email || "info@itsarchery.com",
            instagram: c.instagram || "",
            facebook: c.facebook || "",
            youtube: c.youtube || "",
          })
        }
      })
      .catch(() => {})
  }, [])

  const toUrl = (value: string, fallback: string) => {
    if (!value) return fallback
    return value.startsWith("http") ? value : `https://${value}`
  }

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/uploads/material/ITSAlogo.png" alt="ITS Archery" width={32} height={32} className="rounded" />
              <span className="font-bold text-xl">ITS Archery</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Komunitas panahan terdepan di Institut Teknologi Sepuluh Nopember. Mengembangkan bakat, meraih prestasi,
              membangun karakter.
            </p>
            <div className="flex gap-1">
              {contact.instagram && (
                <Link href={toUrl(contact.instagram, "#")} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg">
                  <Instagram className="w-5 h-5" />
                </Link>
              )}
              {contact.facebook && (
                <Link href={toUrl(contact.facebook, "#")} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg">
                  <Facebook className="w-5 h-5" />
                </Link>
              )}
              {contact.youtube && (
                <Link href={toUrl(contact.youtube, "#")} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg">
                  <Youtube className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Menu Utama</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-primary block py-1.5">Beranda</Link></li>
              <li><Link href="/tentang-kami" className="text-muted-foreground hover:text-primary block py-1.5">Tentang Kami</Link></li>
              <li><Link href="/prestasi" className="text-muted-foreground hover:text-primary block py-1.5">Prestasi</Link></li>
              <li><Link href="/kegiatan" className="text-muted-foreground hover:text-primary block py-1.5">Kegiatan</Link></li>
              <li><Link href="/galeri" className="text-muted-foreground hover:text-primary block py-1.5">Galeri</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{contact.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{contact.email}</span>
              </li>
              {contact.instagram && (
                <li>
                  <a href={toUrl(contact.instagram, "#")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary py-1.5 break-all">
                    <Instagram className="w-4 h-4 shrink-0" />
                    <span className="text-sm">{contact.instagram}</span>
                  </a>
                </li>
              )}
              {contact.youtube && (
                <li>
                  <a href={toUrl(contact.youtube, "#")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary py-1.5 break-all">
                    <Youtube className="w-4 h-4 shrink-0" />
                    <span className="text-sm">{contact.youtube}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} ITS Archery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
