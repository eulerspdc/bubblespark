import type { ThemeOption, ColorScheme } from "../components/theme-selector"

// export interface Campaign {
//   id: string
//   youtubeAccountId: string
//   funnelName: string
//   videoUrl: string
//   description: string
//   slug: string
//   expiresAt: Date
//   campaignLinkUrl: string
//   campaignLinkActive: boolean
//   isPublished: boolean
//   totalCost: number
//   theme: ThemeOption
//   colorScheme: ColorScheme
// }

export interface Campaign {
    id: string | null
    youtubeAccountId?: string | null
    funnelName: string | null
    videoUrl?: string | null
    description: string | null
    slug: string | null
    expiresAt:Date | string | null
    campaignLinkUrl: string | null
    campaignLinkActive: boolean | null
    isPublished: boolean | null
    showConclusionPage: boolean | null
    userId?: string | null
    totalCost: number | null
    createdAt: Date | string | null
    updatedAt: Date |  string | null
    theme: ThemeOption 
    colorScheme: ColorScheme | null
  }

