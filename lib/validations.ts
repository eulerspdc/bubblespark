import { z } from "zod"

export const linkTreeSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  url: z.string().url("Please enter a valid URL"),
  logoUrl: z.string().url("Please enter a valid logo URL"),
  hasAgeRestrictions: z.boolean().default(false),
  visible: z.boolean().default(true),
  campaignContentPageId: z.string().nullable().optional(),
})

export type LinkTreeFormValues = z.infer<typeof linkTreeSchema>

