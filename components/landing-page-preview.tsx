import type { Campaign } from "../types/campaign"
import { cn } from "@/lib/utils"

interface LandingPagePreviewProps {
  campaign: Campaign
  device: "mobile" | "tablet" | "desktop"
}

export function LandingPagePreview({ campaign, device }: LandingPagePreviewProps) {
  const deviceClasses = {
    mobile: "w-full max-w-[375px]",
    tablet: "w-full max-w-[768px]",
    desktop: "w-full max-w-[1280px]",
  }

  const themeClasses = {
    modern: {
      light: "bg-white text-gray-800",
      dark: "bg-gray-900 text-white",
    },
    classic: {
      light: "bg-gray-100 text-gray-800",
      dark: "bg-gray-800 text-gray-100",
    },
    minimalist: {
      light: "bg-white text-black",
      dark: "bg-black text-white",
    },
  }

  const buttonClasses = {
    modern: "bg-blue-500 hover:bg-blue-600 text-white",
    classic: "bg-green-500 hover:bg-green-600 text-white",
    minimalist: "bg-black hover:bg-gray-800 text-white",
  }

  return (
    <div
      className={cn(
        deviceClasses[device],
        themeClasses[campaign.theme ?? "modern"][campaign.colorScheme ?? "light"],
        "mx-auto p-6 rounded-lg shadow-lg",
      )}
    >
      <h1 className="text-3xl font-bold mb-4">{campaign.funnelName}</h1>
      <p className="mb-6">{campaign.description}</p>

      <div className="aspect-video mb-6 flex items-center justify-center bg-gray-200 rounded">
        {campaign.videoUrl ? (
          <iframe
        src={`https://www.youtube.com/embed/${(campaign.videoUrl?.split("v=")[1] ?? "")}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={false}
        className="w-full h-full rounded"
          ></iframe>
        ) : (
          <p className="text-gray-500">Insira o video da campanha.</p>
        )}
      </div>

      <form className="space-y-4 mb-6">
        {/* <input type="text" placeholder="Nome Completo" className="w-full p-2 border rounded" />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
        <input type="tel" placeholder="Telefone (opcional)" className="w-full p-2 border rounded" /> */}
        <button
          className={cn(
            "w-full p-2 rounded font-bold",
            buttonClasses[campaign.theme ?? "modern"],
            campaign.colorScheme === "dark" && "border border-white",
          )}
        >
          Pegue seu convite!
        </button>
      </form>

      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">Atenção!</h2>
        <p className="mb-4">
          Obs: você só teve acesso a esse link por que mereceu, portanto, evite compartilhá-lo para quem não esteja tão
          comprometido quanto você.
        </p>
        <button
          className={cn(
            "px-4 py-2 rounded font-bold",
            buttonClasses[campaign.theme  ?? "modern"],
            campaign.colorScheme === "dark" && "border border-white",
          )}
        >
          Pegue seu convite!
        </button>
      </div>
    </div>
  )
}

