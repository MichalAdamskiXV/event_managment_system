import { EventProps, selectEventById } from "@/backend";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { buyTicketNFT } from "../showEvent/ticketNFT";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { finalOrderSchema } from "../createEvent/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FinalOrder = () => {

    const { finalEventId } = useParams();
    const [events, setEvents] = useState<EventProps[]>();

    const emailFields: { formName: keyof z.infer<typeof finalOrderSchema>, formLabel: string, formDescription: string, placeholder: string }[] = [
        { formName: "email", formLabel: "Email", formDescription: "Enter Email", placeholder: "Email" },
        { formName: "repeatEmail", formLabel: "Repeat Email", formDescription: "Repeat Email", placeholder: "Repeat Email" }
    ]


    useEffect(() => {
        fetchSpecyficEvent();
    }, [])

    const form = useForm<z.infer<typeof finalOrderSchema>>({
        resolver: zodResolver(finalOrderSchema),
        defaultValues: {
            email: "",
            repeatEmail: ""
        }
    })

    const onSubmit = (values: z.infer<typeof finalOrderSchema>) => {
        console.log(values)

        finalEventId && handleFinalOrder(finalEventId);
    }

    const fetchSpecyficEvent = async () => {
        try {
            if (finalEventId) {
                const event = await selectEventById(finalEventId);
                setEvents(event);
            }
        } catch (error) {
            console.error(`Failed to fetch event with id: ${finalEventId}. ERROR - `, error);
        }
    }

    const handleFinalOrder = async (eventItemId: string) => {
        const selectedEvent = events?.find(eventItem => eventItem.id === eventItemId);
        try {
            if (selectedEvent) {
                const ticket = await buyTicketNFT(selectedEvent);
                console.log(ticket);
            }
        } catch (error) {
            console.log("Failed to buy ticket. ERROR - ", error)
        }
    }

    return (
        <div className="w-[100%] h-[100%] flex items-center justify-center">
            <div className="w-[70%] text-center p-6">
                <h1 className="text-aqua-blue font-bold text-2xl">Finalizing Order</h1>
                <div className="w-[100%] p-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[100%] flex flex-wrap justify-center gap-6">
                            <div className="w-[600px]">
                                {
                                    emailFields.map((formField) => (
                                        <FormField
                                            key={formField.formName}
                                            control={form.control}
                                            name={formField.formName}
                                            render={({ field }) => (
                                                <FormItem className="p-2">
                                                    <FormLabel className="text-aqua-blue text-xl font-bold">{formField.formLabel}</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={formField.placeholder} {...field} />
                                                    </FormControl>
                                                    <FormDescription className="text-base font-bold">
                                                        {formField.formDescription}
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ))
                                }
                            </div>
                            <div className="block w-[100%]">
                                <Button type="submit" className="hover:bg-body hover:text-aqua-blue border-solid border-[2px] border-aqua-blue text-body w-[300px] p-2 bg-aqua-blue rounded-[8px] font-bold text-xl">Send Ticket</Button>
                            </div>
                        </form>
                    </Form>
                </div>
                <div>
                    {/* <button onClick={() => { finalEventId && handleFinalOrder(finalEventId) }} className="hover:bg-body hover:text-aqua-blue border-solid border-[2px] border-aqua-blue text-body w-[300px] p-2 bg-aqua-blue rounded-[8px] font-bold text-xl">Send Ticket</button> */}
                </div>
            </div>
        </div>
    )
}

export default FinalOrder