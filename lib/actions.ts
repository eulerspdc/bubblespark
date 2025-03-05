"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { z } from "zod"


import { linkTreeSchema } from "@/lib/validations"
import { prisma } from "./db/prisma"

export async function getLinkTrees() {
  return await prisma.linkTree.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
}

export async function getLinkTree(id: string) {
  return await prisma.linkTree.findUnique({
    where: {
      id,
    },
  })
}

export async function createLinkTree(values: z.infer<typeof linkTreeSchema>) {
  const validatedFields = linkTreeSchema.parse(values)

  const { campaignContentPageId, ...data } = validatedFields

  await prisma.linkTree.create({
    data: {
      ...data,
      ...(campaignContentPageId ? { campaignContentPageId } : {}),
    },
  })

  revalidatePath("/linktree")
  redirect("/linktree")
}

export async function updateLinkTree(id: string, values: z.infer<typeof linkTreeSchema>) {
  const validatedFields = linkTreeSchema.parse(values)

  const { campaignContentPageId, ...data } = validatedFields

  await prisma.linkTree.update({
    where: {
      id,
    },
    data: {
      ...data,
      ...(campaignContentPageId ? { campaignContentPageId } : {}),
    },
  })

  revalidatePath(`/linktree/${id}`)
  revalidatePath("/linktree")
  redirect(`/linktree/${id}`)
}

export async function deleteLinkTree(id: string) {
  await prisma.linkTree.delete({
    where: {
      id,
    },
  })

  revalidatePath("/linktree")
  redirect("/linktree")
}

