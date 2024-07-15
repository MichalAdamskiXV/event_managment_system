import { eventSchema } from "./formSchema";

import { zodResolver } from "@hookform/resolvers/zod"; //tu jest bład
import { useForm } from "react-hook-form"; //albo tu
import { date, z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const CreateEvent = () => {

    const formFields: { formName: keyof z.infer<typeof eventSchema>, formLabel: string, formDescription: string, type?: string }[] = [
        { formName: "eventName", formLabel: "Event Name", formDescription: "Enter Event Name." },
        { formName: "organizers", formLabel: "Organizers", formDescription: "Enter Event Organizers." },
        { formName: "localization", formLabel: "Localization", formDescription: "Enter Event Localization." },
        { formName: "hourFrom", formLabel: "Hour From", formDescription: "" },
        { formName: "hourTo", formLabel: "Hour To", formDescription: "" },
    ];

    // 1. Define your form.
    const form = useForm<z.infer<typeof eventSchema>>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            eventName: "",
            organizers: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof eventSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }
    return (
        <div className="p-6 w-[100%] bg-body h-[100%]">
            <div className="w-[600px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {
                            formFields.map((formField) => (
                                <FormField
                                    key={formField.formName}
                                    control={form.control}
                                    name={formField.formName}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-aqua-blue text-lg font-bold">{formField.formLabel}</FormLabel>
                                            <FormControl>
                                                <Input placeholder="shadcn" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                {formField.formDescription}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))
                        }
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CreateEvent;