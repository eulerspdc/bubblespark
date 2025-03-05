import { notFound } from "next/navigation"

import { LinkTreeForm } from "@/components/linktree/link-tree-form"
import { getLinkTree } from "@/lib/actions"

interface EditLinkTreePageProps {
  params: {
    id: string
  }
}

export default async function EditLinkTreePage({ params }: EditLinkTreePageProps) {
  const linkTree = await getLinkTree(params.id)

  if (!linkTree) {
    notFound()
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8 text-center">Edit LinkTree</h1>
      <LinkTreeForm linkTree={linkTree} isEditing />
    </div>
  )
}

