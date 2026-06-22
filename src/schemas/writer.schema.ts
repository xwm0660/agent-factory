import {z} from 'zod'



export const WriterSchema = z.object({
    title:z.string(),
    script:z.array(z.string())
})

export type WriterResult = z.infer<typeof WriterSchema>;