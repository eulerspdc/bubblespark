"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import { LinkTreeCard } from "@/components/linktree/link-tree-card"
import { LinkTreeList } from "@/components/linktree/link-tree-list"
import { ThemeToggle } from "@/components/theme-toggle"
import { ViewToggle } from "@/components/linktree/view-toggle"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getLinkTrees } from "@/lib/actions"

export default function Home() {
  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    // Try to get the saved view mode from localStorage if on client
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("linkTreeViewMode") as "grid" | "list" | null
      return savedMode || "grid"
    }
    return "grid"
  })

  // Use React Query to fetch data
  const { data: linkTrees = [], isLoading } = useQuery({
    queryKey: ["linkTrees"],
    queryFn: getLinkTrees,
  })

  // Save view mode to localStorage when it changes
  const handleViewChange = (mode: "grid" | "list") => {
    setViewMode(mode)
    if (typeof window !== "undefined") {
      localStorage.setItem("linkTreeViewMode", mode)
    }
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">LinkTree Manager</h1>
          <p className="text-muted-foreground">Manage your LinkTree entries</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Separator orientation="vertical" className="h-8 hidden sm:block" />
          <ViewToggle currentView={viewMode} onViewChange={handleViewChange} />
          <Button asChild>
            <Link href="/linktree/create">
              <Plus className="mr-2 h-4 w-4" />
              New LinkTree
            </Link>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-center">
            <p>Loading LinkTree entries...</p>
          </div>
        </div>
      ) : linkTrees.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-xl font-semibold mb-2">No LinkTree entries found</h2>
          <p className="text-muted-foreground mb-6">Get started by creating your first LinkTree entry</p>
          <Button asChild>
            <Link href="/linktree/create">
              <Plus className="mr-2 h-4 w-4" />
              Create LinkTree
            </Link>
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {linkTrees.map((linkTree) => (
            <LinkTreeCard key={linkTree.id} linkTree={linkTree} />
          ))}
        </div>
      ) : (
        <LinkTreeList linkTrees={linkTrees} />
      )}
    </div>
  )
}

