// import { getFunnelBySlug } from "@/app/server/actions/funnels";

// export default async function FunnelCampaignViewPage({
//     params,
//   }: {
//     params: Promise<{ slug: string }>;
//   }) {
//     const slug = (await params).slug;

//     const funnel = await getFunnelBySlug(slug);

//     if(!funnel) {
//       return <div>Funil não encontrado</div>
//     }
    
//     return (
//       <div>
//         <h1>{funnel.funnelName}</h1>
//         <p>{funnel.description}</p>   
//         <p>{funnel?.videoUrl}</p>   
//       </div>
//     );
//   }


"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react"
import { EditableField } from "../../editable-field"

interface Funnel {
  id: number
  title: string
  description: string
  leadsCount: number
  isActive: boolean
  isPublished: boolean
  videoUrl: string
  expiraEm: string
  diasNoAr: number
  leadsTrend: "up" | "down"
}

// Simulating fetching funnel data
const getFunnelById = (id: number): Funnel => ({
  id,
  title: "Funil de Exemplo",
  description: "Descrição do funil de exemplo",
  leadsCount: 100,
  isActive: true,
  isPublished: true,
  videoUrl: "https://example.com/video",
  expiraEm: "2023-12-31",
  diasNoAr: 30,
  leadsTrend: "up",
})

export default function FunnelDetail() {
  const id = "1"

  const [funnel, setFunnel] = useState<Funnel>(() => getFunnelById(Number(id)))

  const handleFieldUpdate = (field: keyof Funnel, value: string | number | boolean) => {
    setFunnel((prev) => ({ ...prev, [field]: value }))
    // Here you would typically make an API call to update the funnel
    console.log(`Updated ${field} to:`, value)
  }

  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" onClick={() => {}} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para a lista
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Funil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <EditableField label="Título" value={funnel.title} onSave={(value) => handleFieldUpdate("title", value)} />
          <EditableField
            label="Descrição"
            value={funnel.description}
            onSave={(value) => handleFieldUpdate("description", value)}
          />
          <EditableField
            label="URL do Vídeo"
            value={funnel.videoUrl}
            onSave={(value) => handleFieldUpdate("videoUrl", value)}
          />
          <EditableField
            label="Número de Leads"
            value={funnel.leadsCount}
            onSave={(value) => handleFieldUpdate("leadsCount", Number(value))}
            type="number"
          />
          <div className="flex items-center justify-between">
            <span className="font-medium">Tendência de Leads:</span>
            <Button
              variant="ghost"
              onClick={() => handleFieldUpdate("leadsTrend", funnel.leadsTrend === "up" ? "down" : "up")}
            >
              {funnel.leadsTrend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </Button>
          </div>
          <EditableField
            label="Expira em"
            value={funnel.expiraEm}
            onSave={(value) => handleFieldUpdate("expiraEm", value)}
            type="date"
          />
          <EditableField
            label="Dias no ar"
            value={funnel.diasNoAr}
            onSave={(value) => handleFieldUpdate("diasNoAr", Number(value))}
            type="number"
          />
          <div className="flex items-center justify-between">
            <span className="font-medium">Status:</span>
            <Switch checked={funnel.isActive} onCheckedChange={(checked) => handleFieldUpdate("isActive", checked)} />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Publicado:</span>
            <Switch
              checked={funnel.isPublished}
              onCheckedChange={(checked) => handleFieldUpdate("isPublished", checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

