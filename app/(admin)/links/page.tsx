import Link from "next/link"
import { Plus } from "lucide-react"

import { LinkTreeCard } from "@/components/linktree/link-tree-card"
import { Button } from "@/components/ui/button"
import { getLinkTrees } from "@/lib/actions"

export default async function Home() {
  const linkTrees = await getLinkTrees()

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">LinkTree Manager</h1>
          <p className="text-muted-foreground">Manage your LinkTree entries</p>
        </div>
        <Button asChild>
          <Link href="/links/create">
            <Plus className="mr-2 h-4 w-4" />
            New LinkTree
          </Link>
        </Button>
      </div>

      {linkTrees.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-xl font-semibold mb-2">No LinkTree entries found</h2>
          <p className="text-muted-foreground mb-6">Get started by creating your first LinkTree entry</p>
          <Button asChild>
            <Link href="/links/create">
              <Plus className="mr-2 h-4 w-4" />
              Create LinkTree
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {linkTrees.map((linkTree) => (
            <LinkTreeCard key={linkTree.id} linkTree={linkTree} />
          ))}
        </div>
      )}
    </div>
  )
}

