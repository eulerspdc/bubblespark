"use client"

import { useState } from "react"
import { LayoutGrid, List } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

interface ViewToggleProps {
  onViewChange: (view: "grid" | "list") => void
  currentView: "grid" | "list"
}

export function ViewToggle({ onViewChange, currentView }: ViewToggleProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          {currentView === "grid" ? (
            <>
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:ml-1">Grid View</span>
            </>
          ) : (
            <>
              <List className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:ml-1">List View</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onViewChange("grid")}>
          <LayoutGrid className="mr-2 h-4 w-4" />
          <span>Grid View</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onViewChange("list")}>
          <List className="mr-2 h-4 w-4" />
          <span>List View</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
