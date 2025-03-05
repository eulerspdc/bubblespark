"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createLinkTree, updateLinkTree } from "@/lib/actions"

import { linkTreeSchema, type LinkTreeFormValues } from "@/lib/validations"

interface LinkTreeFormProps {
  linkTree?: LinkTreeFormValues
  isEditing?: boolean
}

export function LinkTreeForm({ linkTree, isEditing = false }: LinkTreeFormProps) {
  const router = useRouter()

  const form = useForm<LinkTreeFormValues>({
    resolver: zodResolver(linkTreeSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
      logoUrl: "",
      hasAgeRestrictions: false,
      visible: true,
      campaignContentPageId: null,
      ...linkTree,
    },
  })

  useEffect(() => {
    if (linkTree) {
      form.reset(linkTree)
    }
  }, [form, linkTree])

  async function onSubmit(data: LinkTreeFormValues) {
    try {
      if (isEditing && linkTree?.id) {
        await updateLinkTree(linkTree.id, data)
        toast.success("LinkTree updated", {
          description: "Your LinkTree has been updated successfully.",
        })
      } else {
        await createLinkTree(data)
        toast.success("LinkTree created", {
          description: "Your LinkTree has been created successfully.",
        })
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong", {
        description: "Please try again later.",
      })
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit LinkTree" : "Create LinkTree"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update your LinkTree information below." : "Fill in the details to create a new LinkTree."}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/logo.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <FormField
                control={form.control}
                name="hasAgeRestrictions"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Age Restrictions</FormLabel>
                      <FormDescription>Check if this content has age restrictions</FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="visible"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Visible</FormLabel>
                      <FormDescription>Check to make this LinkTree visible</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

