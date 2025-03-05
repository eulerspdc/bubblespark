'use client';
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Edit, ExternalLink, Eye, EyeOff, Trash } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { deleteLinkTree } from "@/lib/actions"


interface LinkTreeCardProps {
  linkTree: {
    id: string
    title: string
    description: string
    url: string
    logoUrl: string
    hasAgeRestrictions: boolean
    visible: boolean
    createdAt: Date
    updatedAt: Date
  }
  isDetailed?: boolean
}

export function LinkTreeCard({ linkTree, isDetailed = false }: LinkTreeCardProps) {
  const deleteWithConfirmation = async () => {
    toast.promise(
      new Promise((resolve, reject) => {
        if (confirm("Are you sure you want to delete this LinkTree?")) {
          deleteLinkTree(linkTree.id)
            .then(() => resolve(true))
            .catch(reject)
        } else {
          reject(new Error("Deletion cancelled"))
        }
      }),
      {
        loading: "Deleting LinkTree...",
        success: "LinkTree deleted successfully",
        error: "Failed to delete LinkTree",
      },
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="line-clamp-1">{linkTree.title}</CardTitle>
          <CardDescription>
            Created {formatDistanceToNow(new Date(linkTree.createdAt), { addSuffix: true })}
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          {linkTree.hasAgeRestrictions && (
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
              Age Restricted
            </Badge>
          )}
          {linkTree.visible ? (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              <Eye className="mr-1 h-3 w-3" />
              Visible
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
              <EyeOff className="mr-1 h-3 w-3" />
              Hidden
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-4">
          <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
            <img
              src={linkTree.logoUrl || "/placeholder.svg"}
              alt={`${linkTree.title} logo`}
              className="h-full w-full object-cover"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=48&width=48"
              }}
            />
          </div>
          <div className="flex-1">
            <p className={`text-sm text-muted-foreground ${isDetailed ? "" : "line-clamp-2"}`}>
              {linkTree.description}
            </p>
            {isDetailed && (
              <div className="mt-4">
                <p className="text-sm font-medium">URL:</p>
                <a
                  href={linkTree.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline flex items-center"
                >
                  {linkTree.url}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isDetailed ? (
          <>
            <Button variant="outline" asChild>
              <Link href="/links">Back to List</Link>
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link href={`/links/${linkTree.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <Button variant="destructive" onClick={deleteWithConfirmation}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </>
        ) : (
          <>
            <Button variant="outline" asChild>
              <Link href={`/links/${linkTree.id}`}>View Details</Link>
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" asChild>
                <Link href={`/links/${linkTree.id}/edit`}>
                  <Edit className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="destructive" size="icon" onClick={deleteWithConfirmation}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

