import { LinkTreeForm } from "@/components/linktree/link-tree-form"

export default function NewLinkTreePage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8 text-center">Create New LinkTree</h1>
      <LinkTreeForm />
    </div>
  )
}

