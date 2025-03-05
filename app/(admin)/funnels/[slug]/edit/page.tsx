"use client"

import { EditSidesheet } from "@/components/edit-sidesheet"
import { FixedSidesheet } from "@/components/fixed-sidesheet"
import { LandingPagePreview } from "@/components/landing-page-preview"
import { ThemeOption, ColorScheme } from "@/components/theme-selector"
import { DeviceToggle } from "@/components/device-toggle"
import { useCampaign } from "@/hooks/useCampaign"
import { useCallback, useEffect, useState } from "react"
import { getFunnelBySlug } from "@/app/server/actions/funnels"
import { Button } from "@/components/ui/button"


const initialCampaign = {
  id: null,
  youtubeAccountId: null,
  funnelName: null,
  videoUrl: null,
  description: null,
  slug: null,
  expiresAt: null,
  campaignLinkUrl: null,
  campaignLinkActive: null,
  isPublished: null,
  showConclusionPage:null,
  userId: null,
  totalCost: null,
  createdAt: null,
  updatedAt: null,
  theme: "modern" as ThemeOption,
  colorScheme: "dark" as ColorScheme,
}

export default function CampaignEditorViewPage({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }
) {

  const { campaign, updateCampaign } = useCampaign(initialCampaign)
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("mobile")

  const [resposta, setResposta] = useState<any>(null);

  useEffect(() => {
    getInitalData();
  }, []);

  const getInitalData = async () => {
    const slug = (await params).slug
    const resultado = await getFunnelBySlug(slug);
    if (resultado) {
      updateCampaign(resultado);
    }
    setResposta(resultado);
  }

  // console.log(resposta);

  return (
    <div className="flex h-screen">
      {/* Preview Section */}
      <div className="flex-1 flex flex-col">
        {/* Fixed Device Toggle */}
        <div className="bg-white border-b border-gray-200 p-4 z-10">
          <div className="max-w-screen-xl mx-auto ">
            <DeviceToggle device={device} setDevice={setDevice} />
            
          </div>
        </div>

        {/* Scrollable Preview Area */}
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          <div className="max-w-screen-xl mx-auto">
            <LandingPagePreview campaign={campaign} device={device} />
          </div>
        </div>
      </div>

      {/* Fixed Sidesheet for Large Screens */}
      <div className="hidden lg:block w-[400px] border-l border-gray-200 bg-white overflow-y-auto">
        <FixedSidesheet campaign={campaign} updateCampaign={updateCampaign} />
      </div>

      {/* Mobile Sidesheet Trigger */}
      <div className="lg:hidden fixed bottom-4 right-4">
        <EditSidesheet campaign={campaign} updateCampaign={updateCampaign} />
      </div>
    </div>
  )
}

