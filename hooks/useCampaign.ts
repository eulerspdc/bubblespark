import { useState } from "react"
import type { Campaign } from "../types/campaign"

export function useCampaign(initialData: Campaign) {
  const [campaign, setCampaign] = useState<Campaign>(initialData)

  const updateCampaign = (updates: Partial<Campaign>) => {
    setCampaign((prev) => ({ ...prev, ...updates }))
  }

  return { campaign, updateCampaign }
}

