import { useState } from "react";
import { eventSchema } from "./formSchema";

import {
    Button,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    useForm,
    z,
    zodResolver,
    Textarea,
} from "./imports"
import { formFields, contactFields } from "@/constants";
import { addEventBasicInfo } from "@/backend";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {

    const [addingEvent, setAddingEvent] = useState(false);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof eventSchema>>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            eventName: "",
            organizers: "",
            hourFrom: "",
            hourTo: "",
            localization: "",
            eventDescription: "",
            ticketPrice: "",
            phone: "",
            email: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof eventSchema>) => {
        setAddingEvent(true);
        try {
            const generateId = () => {
                return Date.now().toString() + Math.random().toString(36).substr(2, 9);
            };

            const eventId = generateId();
            const basicInfo = { ...values, id: eventId, likes: '0' };

            await addEventBasicInfo(basicInfo);
        } catch (error) {
            console.error("Failed to create event object: ERROR - ", error)
        }

        setAddingEvent(false);
        navigate('/');
    }

    return (
        <div className="p-6 w-[100%] bg-body h-[100%] flex gap-6 pt-12 relative">
            {addingEvent && <Loader message="Adding Event Offer" />}
            <div className="w-[100%] flex justify-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-6 flex-wrap justify-center">
                        <div className="w-[600px]">
                            {
                                formFields.map((formField) => (
                                    <div key={formField.formName} className={`${formField.type === "TIME" && 'flex justify-between'} p-2`}>
                                        <FormField
                                            key={formField.formName}
                                            control={form.control}
                                            name={formField.formName}
                                            render={({ field }) => (
                                                <FormItem>
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
                                    </div>
                                ))
                            }
                        </div>
                        <div className="p-2">
                            <FormField
                                control={form.control}
                                name="eventDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-aqua-blue text-xl font-bold">Event Description</FormLabel>
                                        <FormControl>
                                            <Textarea className="w-[600px] h-[160px]" placeholder="Type Your Event Description Here." id="eventDescription" {...field} />
                                        </FormControl>
                                        <FormDescription className="text-base font-bold w-[600px] text-justify">
                                            Type Your Event Description. Be As Accoure As You Can.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="w-[600px]">
                                {
                                    contactFields.map((formField) => (
                                        <div className="pt-5" key={formField.formName}>
                                            <FormField
                                                key={formField.formName}
                                                control={form.control}
                                                name={formField.formName}
                                                render={({ field }) => (
                                                    <FormItem>
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
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="w-[100%] p-2 flex justify-center gap-6">
                            <div className="w-[600px]">
                                <p className="text-lg font-bold text-form-gray text-justify w-[100%] pb-6">
                                    Check your description again. Remember to provide the exact time, date, location, and organizers.
                                    Check if the event description is accurate and legible, and if all data has been entered accurately.
                                </p>
                                <Button type="submit" className="font-bold text-xl w-[100%] h-[50px] text-white rounded-[8px] bg-form-gray hover:text-aqua-blue hover:bg-body">Create Event</Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div >
    );
};

export default CreateEvent;