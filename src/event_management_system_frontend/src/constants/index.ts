import { eventSchema, finalOrderSchema } from "@/pages/createEvent/formSchema";
import { z } from "zod"

export const formFields: { formName: keyof z.infer<typeof eventSchema>, formLabel: string, formDescription: string, placeholder: string, type?: string }[] = [
    { formName: "eventName", formLabel: "Event Name", formDescription: "Enter Event Name.", placeholder: "Event Name" },
    { formName: "organizers", formLabel: "Organizers", formDescription: "Enter Event Organizers.", placeholder: "Organizers" },
    { formName: "localization", formLabel: "Localization", formDescription: "Enter Event Localization.", placeholder: "Localization" },
    { formName: "ticketPrice", formLabel: "Ticket Price", formDescription: "Enter Ticket Price.", placeholder: "Ticket Price" },
    { formName: "hourFrom", formLabel: "Hour From", formDescription: "", placeholder: "Format: 00:00:00", type: "TIME" },
    { formName: "hourTo", formLabel: "Hour To", formDescription: "", placeholder: "Format: 00:00:00", type: "TIME" },
];

export const contactFields: { formName: keyof z.infer<typeof eventSchema>, formLabel: string, formDescription: string, placeholder: string }[] = [
    { formName: "phone", formLabel: "Phone Number", formDescription: "Enter Phone Number To Contact.", placeholder: "Phone Number" },
    { formName: "email", formLabel: "Email Address", formDescription: "Enter Email Address To Contact.", placeholder: "Email Address" },
]

export const emailFields: { formName: keyof z.infer<typeof finalOrderSchema>, formLabel: string, formDescription: string, placeholder: string }[] = [
    { formName: "userName", formLabel: "Name", formDescription: "Enter Name", placeholder: "Name" },
    { formName: "userLastname", formLabel: "Lastname", formDescription: "Enter Lastname", placeholder: "Lastname" },
    { formName: "email", formLabel: "Email", formDescription: "Enter Email", placeholder: "Email" },
    { formName: "repeatEmail", formLabel: "Repeat Email", formDescription: "Repeat Email", placeholder: "Repeat Email" }
]