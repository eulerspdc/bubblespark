import { Button } from "@/components/ui/button"
import { Smartphone, Tablet, Monitor } from "lucide-react"

interface DeviceToggleProps {
  device: "mobile" | "tablet" | "desktop"
  setDevice: (device: "mobile" | "tablet" | "desktop") => void
}

export function DeviceToggle({ device, setDevice }: DeviceToggleProps) {
  return (
    <div className="flex justify-center space-x-2">
      <Button variant={device === "mobile" ? "default" : "outline"} size="sm" onClick={() => setDevice("mobile")}>
        <Smartphone className="h-4 w-4 mr-2" />
        Mobile
      </Button>
      <Button variant={device === "tablet" ? "default" : "outline"} size="sm" onClick={() => setDevice("tablet")}>
        <Tablet className="h-4 w-4 mr-2" />
        Tablet
      </Button>
      <Button variant={device === "desktop" ? "default" : "outline"} size="sm" onClick={() => setDevice("desktop")}>
        <Monitor className="h-4 w-4 mr-2" />
        Desktop
      </Button>
    </div>
  )
}

