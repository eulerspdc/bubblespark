import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, X } from "lucide-react"

interface EditableFieldProps {
  value: string | number
  onSave: (value: string | number) => void
  type?: "text" | "number" | "date"
  label: string
}

export const EditableField: React.FC<EditableFieldProps> = ({ value, onSave, type = "text", label }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleSave = () => {
    onSave(editedValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedValue(value)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2">
        <Input
          ref={inputRef}
          type={type}
          value={editedValue ?? ""}
          onChange={(e) => setEditedValue(e.target.value)}
          className="w-full"
        />
        <Button size="icon" onClick={handleSave}>
          <Check className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline" onClick={handleCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between">
      <span className="font-medium">{label}:</span>
      <span className="cursor-pointer hover:underline" onClick={() => setIsEditing(true)}>
        {value}
      </span>
    </div>
  )
}

