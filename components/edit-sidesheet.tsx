import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import type { Campaign } from "../types/campaign"
import { PencilIcon } from "lucide-react"
import { FixedSidesheet } from "./fixed-sidesheet"

interface EditSidesheetProps {
  campaign: Campaign
  updateCampaign: (updates: Partial<Campaign>) => void
}

export function EditSidesheet({ campaign, updateCampaign }: EditSidesheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="rounded-full h-14 w-14 shadow-lg">
          <PencilIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-[400px] p-0">
        <FixedSidesheet campaign={campaign} updateCampaign={updateCampaign} />
      </SheetContent>
    </Sheet>
  )
}

