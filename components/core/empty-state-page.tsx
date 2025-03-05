import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface EmptyStateProps {
  title: string
  message: string
  actionLabel: string
  onAction?: () => void
}

export function EmptyState({ title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <svg
          className="w-24 h-24 text-muted-foreground"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 15s1.5 2 4 2 4-2 4-2" />
          <line x1="9" x2="9.01" y1="9" y2="9" />
          <line x1="15" x2="15.01" y1="9" y2="9" />
        </svg>
        <p className="text-center text-muted-foreground">{message}</p>
      </CardContent>
      {onAction && <CardFooter>
        <Button className="w-full" onClick={onAction}>
          {actionLabel}
        </Button>
      </CardFooter>}
    </Card>
  )
}

