import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Edit, ExternalLink, Eye, EyeOff, Trash } from 'lucide-react'
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { deleteLinkTree } from "@/lib/actions"

interface LinkTreeListProps {
  linkTrees: {
    id: string
    title: string
    description: string
    url: string
    logoUrl: string
    hasAgeRestrictions: boolean
    visible: boolean
    createdAt: Date
    updatedAt: Date
  }[]
}

export function LinkTreeList({ linkTrees }: LinkTreeListProps) {
  const deleteWithConfirmation = async (id: string, title: string) => {
    toast.promise(
      new Promise((resolve, reject) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
          deleteLinkTree(id)
            .then(() => resolve(true))
            .catch(reject)
        } else {
          reject(new Error("Deletion cancelled"))
        }
      }),
      {
        loading: "Deleting LinkTree...",
        success: "LinkTree deleted successfully",
        error: "Failed to delete LinkTree"
      }
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Logo</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead className="hidden md:table-cell">URL</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden sm:table-cell">Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {linkTrees.map((linkTree) => (
            <TableRow key={linkTree.id}>
              <TableCell>
                <div className="h-10 w-10 rounded-md overflow-hidden">
                  <img 
                    src={linkTree.logoUrl || "/placeholder.svg"} 
                    alt={`${linkTree.title} logo`} 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg?height=40&width=40"
                    }}
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <Link 
                  href={`/linktree/${linkTree.id}`}
                  className="hover:underline"
                >
                  {linkTree.title}
                </Link>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <p className="line-clamp-1 max-w-[200px] text-muted-foreground">
                  {linkTree.description}
                </p>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <a 
                  href={linkTree.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline flex items-center max-w-[150px] truncate"
                >
                  {linkTree.url}
                  <ExternalLink className="ml-1 h-3 w-3 flex-shrink-0" />
                </a>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {linkTree.visible ? (
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 w-fit">
                      <Eye className="mr-1 h-3 w-3" />
                      Visible
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 w-fit">
                      <EyeOff className="mr-1 h-3 w-3" />
                      Hidden
                    </Badge>
                  )}
                  {linkTree.hasAgeRestrictions && (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 w-fit">
                      Age Restricted
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-muted-foreground">
                {formatDistanceToNow(new Date(linkTree.createdAt), { addSuffix: true })}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/linktree/${linkTree.id}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/linktree/${linkTree.id}/edit`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    onClick={() => deleteWithConfirmation(linkTree.id, linkTree.title)}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {linkTrees.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No LinkTree entries found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
