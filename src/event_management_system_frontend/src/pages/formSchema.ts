import { z } from "zod";

export const eventSchema = z.object({
    eventName: z.string().min(5, {
        message: 'Event Name Must Be At Least 5 Characters.'
    }),
    organizers: z.string().min(10).refine((value) => {
        return value.trim().split(/\s+/).length >= 2;
    }, { message: "Input Must Contain At Leastt Two Words." }),
    localization: z.string().min(3, { message: "Localization must be at least 3 characters." }),
    hourFrom: z.string().time(),
    hourTo: z.string().time()
})