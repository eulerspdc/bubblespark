import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import type { Campaign } from "../types/campaign"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ThemeSelector } from "./theme-selector"

interface FixedSidesheetProps {
  campaign: Campaign
  updateCampaign: (updates: Partial<Campaign>) => void
}

export function FixedSidesheet({ campaign, updateCampaign }: FixedSidesheetProps) {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div>
        <h2 className="text-xl font-semibold mb-1">Edit Campaign</h2>
        <p className="text-sm text-muted-foreground">Make changes to your campaign landing page.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="funnelName">Funnel Name</Label>
          <Input
            id="funnelName"
            value={campaign.funnelName  ?? ""}
            onChange={(e) => updateCampaign({ funnelName: e.target.value })}
            placeholder="Enter funnel name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="videoUrl">URL da campanha (Ex.: Youtube)</Label>
          <Input
            id="videoUrl"
            value={campaign.videoUrl  ?? ""}
            onChange={(e) => updateCampaign({ videoUrl: e.target.value })}
            placeholder="YouTube video URL"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={campaign.description ?? ""}
            onChange={(e) => updateCampaign({ description: e.target.value })}
            placeholder="Enter campaign description"
            className="min-h-[100px]"
          />
        </div>

        {/* <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={campaign.slug ?? ""}
            onChange={(e) => updateCampaign({ slug: e.target.value })}
            placeholder="campaign-slug"
          />
        </div> */}

        <div className="space-y-2">
          <Label>Expires At</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !campaign.expiresAt && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {campaign.expiresAt ? format(campaign.expiresAt, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={campaign.expiresAt ? new Date(campaign.expiresAt) : undefined}
                onSelect={(date) => updateCampaign({ expiresAt: date || new Date() })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="campaignLinkUrl">Campaign Link URL</Label>
          <Input
            id="campaignLinkUrl"
            value={campaign.campaignLinkUrl ?? ""}
            onChange={(e) => updateCampaign({ campaignLinkUrl: e.target.value })}
            placeholder="https://example.com/campaign"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalCost">Total Cost</Label>
          <Input
            id="totalCost"
            type="number"
            value={campaign.totalCost ?? ""}
            onChange={(e) => updateCampaign({ totalCost: Number.parseFloat(e.target.value) })}
            placeholder="0.00"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="campaignLinkActive">Campaign Link Active</Label>
            <div className="text-sm text-muted-foreground">Enable or disable the campaign link</div>
          </div>
          <Switch
            id="campaignLinkActive"
            checked={campaign.campaignLinkActive ?? false}
            onCheckedChange={(checked) => updateCampaign({ campaignLinkActive: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="isPublished">Published</Label>
            <div className="text-sm text-muted-foreground">Make this campaign visible to the public</div>
          </div>
          <Switch
            id="isPublished"
            checked={campaign.isPublished ?? false}
            onCheckedChange={(checked) => updateCampaign({ isPublished: checked })}
          />
        </div>

        <div className="space-y-2">
          <Label>Theme</Label>
          <ThemeSelector
            selectedTheme={campaign.theme ?? "modern"}
            colorScheme={campaign.colorScheme ?? "dark"}
            onThemeChange={(theme) => updateCampaign({ theme })}
            onColorSchemeChange={(colorScheme) => updateCampaign({ colorScheme })}
          />
        </div>

        <div className="pt-4 space-y-2">
          <Button className="w-full" variant="default">
            Save Changes
          </Button>
          <Button className="w-full" variant="outline">
            Preview Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

