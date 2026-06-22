import {z} from 'zod'


export const PlannerSchema = z.object({
    title: z.string(),
    angle:z.string(),
    story:z.string()
})


export type PlannerResult = z.infer<typeof PlannerSchema>