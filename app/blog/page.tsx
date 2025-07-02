import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"

export default function BlogPage() {
  const featuredPost = {
    id: 1,
    title: "Teknik Dasar Panahan: Panduan Lengkap untuk Pemula",
    excerpt:
      "Pelajari teknik-teknik fundamental dalam panahan yang akan menjadi fondasi kuat untuk mengembangkan kemampuan Anda. Dari stance hingga release, semua dibahas lengkap di sini.",
    image: "/placeholder.svg?height=400&width=800",
    author: "Ahmad Rizki",
    date: "15 Juli 2024",
    readTime: "8 menit",
    category: "Tutorial",
    featured: true,
  }

  const blogPosts = [
    {
      id: 2,
      title: "Persiapan Mental Sebelum Kompetisi Panahan",
      excerpt:
        "Mental yang kuat adalah kunci sukses dalam kompetisi panahan. Simak tips-tips persiapan mental dari atlet berpengalaman.",
      image: "/placeholder.svg?height=300&width=400",
      author: "Sari Indah",
      date: "12 Juli 2024",
      readTime: "6 menit",
      category: "Tips",
    },
    {
      id: 3,
      title: "Sejarah Perkembangan Panahan di Indonesia",
      excerpt: "Mengenal lebih dalam tentang perjalanan olahraga panahan di Indonesia dari masa ke masa.",
      image: "/placeholder.svg?height=300&width=400",
      author: "Budi Santoso",
      date: "10 Juli 2024",
      readTime: "10 menit",
      category: "Sejarah",
    },
    {
      id: 4,
      title: "Review Peralatan Panahan Terbaru 2024",
      excerpt: "Ulasan lengkap tentang peralatan panahan terbaru yang bisa meningkatkan performa Anda.",
      image: "/placeholder.svg?height=300&width=400",
      author: "Maya Putri",
      date: "8 Juli 2024",
      readTime: "7 menit",
      category: "Review",
    },
    {
      id: 5,
      title: "Latihan Fisik untuk Pemanah: Program 30 Hari",
      excerpt: "Program latihan fisik khusus yang dirancang untuk meningkatkan kekuatan dan stabilitas pemanah.",
      image: "/placeholder.svg?height=300&width=400",
      author: "Doni Pratama",
      date: "5 Juli 2024",
      readTime: "12 menit",
      category: "Fitness",
    },
    {
      id: 6,
      title: "Analisis Teknik Juara Dunia Panahan 2024",
      excerpt: "Pembahasan mendalam tentang teknik-teknik yang digunakan oleh juara dunia panahan tahun ini.",
      image: "/placeholder.svg?height=300&width=400",
      author: "Lisa Wati",
      date: "3 Juli 2024",
      readTime: "9 menit",
      category: "Analisis",
    },
    {
      id: 7,
      title: "Memilih Busur yang Tepat untuk Pemula",
      excerpt: "Panduan lengkap memilih busur pertama yang sesuai dengan kebutuhan dan budget pemula.",
      image: "/placeholder.svg?height=300&width=400",
      author: "Ahmad Rizki",
      date: "1 Juli 2024",
      readTime: "5 menit",
      category: "Tutorial",
    },
  ]

  const categories = ["Semua", "Tutorial", "Tips", "Review", "Sejarah", "Fitness", "Analisis"]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-accent text-accent-foreground mb-6">Blog & Artikel</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Pusat Pengetahuan Panahan</h1>
            <p className="text-xl text-primary-foreground/80">
              Temukan artikel, tips, tutorial, dan insight terbaru seputar dunia panahan dari para ahli dan praktisi
              berpengalaman.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Artikel Pilihan</h2>
            <p className="text-muted-foreground">Artikel terbaru dan paling populer dari komunitas kami</p>
          </div>

          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative aspect-video lg:aspect-auto">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">Featured</Badge>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge variant="secondary" className="w-fit mb-4">
                  {featuredPost.category}
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">{featuredPost.title}</h3>
                <p className="text-muted-foreground mb-6 text-lg">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <Button asChild className="w-fit">
                  <Link href={`/blog/${featuredPost.id}`}>
                    Baca Selengkapnya
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button key={category} variant="outline" className="rounded-full bg-transparent">
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    {post.category}
                  </Badge>
                  <CardTitle className="line-clamp-2 text-lg">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/blog/${post.id}`}>
                        Baca
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Berlangganan Newsletter</h2>
            <p className="text-muted-foreground mb-8">
              Dapatkan artikel terbaru, tips panahan, dan update kegiatan ITS Archery langsung di inbox Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-4 py-2 rounded-lg border border-input bg-background"
              />
              <Button>Berlangganan</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Punya Artikel Menarik?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Bagikan pengetahuan dan pengalaman Anda dengan komunitas ITS Archery. Kirimkan artikel Anda untuk
            dipublikasikan di blog kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Kirim Artikel
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
            >
              Panduan Menulis
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
