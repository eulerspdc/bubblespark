import { notFound } from "next/navigation"

import { LinkTreeCard } from "@/components/linktree/link-tree-card"
import { getLinkTree } from "@/lib/actions"

interface LinkTreePageProps {
  params: {
    id: string
  }
}

export default async function LinkTreePage({ params }: LinkTreePageProps) {
  const linkTree = await getLinkTree(params.id)

  if (!linkTree) {
    notFound()
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8 text-center">LinkTree Details</h1>
      <LinkTreeCard linkTree={linkTree} isDetailed />
    </div>
  )
}

