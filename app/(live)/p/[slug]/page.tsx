import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Youtube } from "lucide-react"
import Image from "next/image"
import { YouTubeEmbed } from "@/components/core/youtube-embed"


export default async function FunnelLandingViewPage({params}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white relative overflow-hidden">
      {/* Background Decorations */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-20 left-0 w-40 h-40 opacity-10">
          <div className="w-full h-full bg-dots-pattern" />
        </div>
        <div className="absolute top-40 right-0 w-80 h-80 opacity-10">
          <div className="w-full h-full transform rotate-45 border-t border-l border-gray-500" />
        </div>
      </div> */}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Bem vindo ao nosso
            <br />
            grupo VIP do Telegram! {slug}
          </h1>
          <p className="text-gray-300 mb-6">
            Para ter acesso à nossa comunidade, basta cadastrar
            <br />
            seus dados e clicar no botão que você será redirecionado.
          </p>
          <p className="text-[#00D1D1] text-sm mb-8 max-w-xl mx-auto">
            Obs: você só teve acesso a esse link por que entendeu
            <br />o nosso propósito em algum dos nossos conteúdos.
            <br />
            Portanto, evite compartilhá-lo com quem não está
            <br />
            comprometido em aprender e evoluir nesse mercado.
          </p>
        </div>

        {/* Form and Video Section */}
        <div className="grid gap-8 items-start md:grid-cols-2">
          <div className="space-y-4 p-4">
            <div>
              <label className="block mb-2">
          Nome Completo <span className="text-red-500">*</span>
              </label>
              <Input placeholder="Digite seu nome completo" className="bg-[#2A2A2A] border-gray-700" />
            </div>
            <div>
              <label className="block mb-2">
          Email <span className="text-red-500">*</span>
              </label>
              <Input type="email" placeholder="seuemail@gmail.com" className="bg-[#2A2A2A] border-gray-700" />
            </div>
            <div>
              <label className="block mb-2">Telefone (opcional)</label>
              <Input placeholder="(00) 0000-0000" className="bg-[#2A2A2A] border-gray-700" />
            </div>
            <Button className="w-full bg-[#00D1D1] hover:bg-[#00B1B1] text-white">Pegue seu convite!</Button>
          </div>

          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <YouTubeEmbed videoUrl={"https://www.youtube.com/watch?v=zvjysgDyUQ8"} />
          </div>
        </div>

        {/* Attention Section */}
        <div className="text-center mt-16 mb-16">
          <h2 className="text-2xl font-bold mb-4">Atenção!</h2>
          <p className="text-gray-300 mb-6">
            Obs: você só teve acesso a esse link por que mereceu, portanto,
            <br />
            evite compartilhá-lo para quem não esteja tão comprometido
            <br />
            quanto você.
          </p>
          <Button className="bg-[#00D1D1] hover:bg-[#00B1B1] text-white">Pegue seu convite!</Button>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800 pt-8 mt-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-03%20at%2010.50.52-wk7crpHZKZPGsynebBz9b3xHCclfMI.png"
              alt="Logo"
              width={150}
              height={50}
              className="h-12 w-auto"
            /> */}
            <div className="space-y-2">
              <p className="text-sm text-center md:text-right text-gray-400">Redes sociais:</p>
              <div className="flex gap-4 justify-center md:justify-end">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 mt-8">
            Crie seu negócio digital com a <span className="text-[#8F3985]">Bubble Spark</span>.
          </div>
        </footer>
      </div>
    </div>
  )
}

