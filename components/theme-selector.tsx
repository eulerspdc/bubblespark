import { Moon, Sun } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export type ThemeOption = "modern" | "classic" | "minimalist"
export type ColorScheme = "light" | "dark"

interface ThemeSelectorProps {
  selectedTheme: ThemeOption
  colorScheme: ColorScheme
  onThemeChange: (theme: ThemeOption) => void
  onColorSchemeChange: (scheme: ColorScheme) => void
}

export function ThemeSelector({ selectedTheme = "modern", colorScheme, onThemeChange, onColorSchemeChange }: ThemeSelectorProps) {
  return (
    <div className="space-y-4">
      <RadioGroup value={selectedTheme} onValueChange={(value) => onThemeChange(value as ThemeOption)}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="modern" id="modern" />
          <Label htmlFor="modern">Modern</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="classic" id="classic" />
          <Label htmlFor="classic">Classic</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="minimalist" id="minimalist" />
          <Label htmlFor="minimalist">Minimalist</Label>
        </div>
      </RadioGroup>

      <div className="flex items-center space-x-2">
        <Switch
          id="color-scheme"
          checked={colorScheme === "dark"}
          onCheckedChange={(checked) => onColorSchemeChange(checked ? "dark" : "light")}
        />
        <Label htmlFor="color-scheme">
          {colorScheme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Label>
      </div>
    </div>
  )
}

