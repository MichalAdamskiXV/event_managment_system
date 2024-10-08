import { z } from "zod";

export const eventSchema = z.object({
    eventName: z.string().min(5, { message: 'Event Name Must Be At Least 5 Characters.' }).max(50, { message: "The field can only contain 50 characters" }),
    organizers: z.string().min(5, { message: "Organizers must be at least 5 characters." }).max(50, { message: "The field can only contain 50 characters" }),
    localization: z.string().min(3, { message: "Localization must be at least 3 characters." }).max(40, { message: "The field can only contain 40 characters" }),
    ticketPrice: z.string().min(1, { message: "Ticket Price Is Required" }),
    hourFrom: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, "Invalid time format (HH:MM:SS)").max(8, { message: "The field can only contain 8 characters" }),
    hourTo: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, "Invalid time format (HH:MM:SS)").max(8, { message: "The field can only contain 8 characters" }),
    eventDescription: z.string().min(200, { message: "Description must be at lest 200 characters" }).max(500, { message: "The field can only contain 500 characters" }),
    email: z.string().email({ message: "Email Address Is Invalid." }).max(50, { message: "The field can only contain 50 characters" }),
    phone: z.string().min(9, { message: "Phone Number Is Invalid" }).max(9, { message: "The field can only contain 9 characters" }),
})

export const finalOrderSchema = z.object({
    userName: z.string().min(2),
    userLastname: z.string().min(2),
    email: z.string().email({ message: "Email Address Is Invalid." }).max(50, { message: "The field can only contain 50 characters" }),
    repeatEmail: z.string().email({ message: "Email Address Is Invalid." }).max(50, { message: "The field can only contain 50 characters" })
}).refine(data => data.email === data.repeatEmail, {
    message: "Emails do not match",
    path: ["repeatEmail"]
});