import { ChangeEvent, useState } from "react";
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
    cn,
    format,
    useForm,
    z,
    zodResolver,
    Textarea,
} from "./imports"
import imageCompression from "browser-image-compression";
import { comporessImage } from "./compressImage";

const CreateEvent = () => {

    const [eventImage, setEventImage] = useState({
        mainImage: "",
        secondImage: ""
    })

    const formFields: { formName: keyof z.infer<typeof eventSchema>, formLabel: string, formDescription: string, placeholder: string, type?: string }[] = [
        { formName: "eventName", formLabel: "Event Name", formDescription: "Enter Event Name.", placeholder: "Event Name" },
        { formName: "organizers", formLabel: "Organizers", formDescription: "Enter Event Organizers.", placeholder: "Organizers" },
        { formName: "localization", formLabel: "Localization", formDescription: "Enter Event Localization.", placeholder: "Localization" },
        { formName: "ticketPrice", formLabel: "Ticket Price", formDescription: "Enter Ticket Price.", placeholder: "Ticket Price" },
        { formName: "hourFrom", formLabel: "Hour From", formDescription: "", placeholder: "Format: 00:00:00", type: "TIME" },
        { formName: "hourTo", formLabel: "Hour To", formDescription: "", placeholder: "Format: 00:00:00", type: "TIME" },
    ];

    const contactFields: { formName: keyof z.infer<typeof eventSchema>, formLabel: string, formDescription: string, placeholder: string }[] = [
        { formName: "phone", formLabel: "Phone Number", formDescription: "Enter Phone Number To Contact.", placeholder: "Phone Number" },
        { formName: "email", formLabel: "Email Address", formDescription: "Enter Email Address To Contact.", placeholder: "Email Address" },
    ]

    const imageFields = [
        { id: 'mainImage', name: 'mainImage', label: "Select Main Event Image", image: eventImage.mainImage },
        { id: 'secondImage', name: 'secondImage', label: "Select Secondary Event Image", image: eventImage.secondImage },
    ];

    // 1. Define your form.
    const form = useForm<z.infer<typeof eventSchema>>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            eventName: "",
            organizers: "",
            hourFrom: "",
            hourTo: "",
            localization: "",
            eventDescription: ""
        },
    });

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target;
        if (files && files.length > 0) {
            try {
                const image = files[0];

                let base64Image = await comporessImage(image);
                if (base64Image) {
                    name === "mainImage" && setEventImage({ ...eventImage, mainImage: base64Image })
                    name === "secondImage" && setEventImage({ ...eventImage, secondImage: base64Image });
                }
            } catch (error) {
                console.error("Failed to compress image: ERROR - ", error);
            }
        }
    }

    function onSubmit(values: z.infer<typeof eventSchema>) {
        console.log(values);
    }

    return (
        <div className="p-6 w-[100%] bg-body h-[100%] flex gap-6 pt-12">
            <div className="w-[100%] flex justify-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-6 flex-wrap justify-center">
                        <div className="w-[600px]">
                            {
                                formFields.map((formField) => (
                                    <div className={`${formField.type === "TIME" && 'flex justify-between'} p-2`}>
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
                                        <div className="pt-5">
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
                            <div className="w-[600px] flex justify-between">
                                {
                                    imageFields.map((image) => (
                                        <div key={image.id} className={`${image.image ? 'border-none' : "border-solid border-[2px] border-aqua-blue"} w-[280px] h-[280px] text-aqua-blue rounded-[8px] flex items-center justify-center`}>
                                            <div>
                                                <input type="file" onChange={handleChange} name={image.name} id={image.name} required className="opacity-0 width-[0.1px] height-[0.1px] absolute" />
                                                {
                                                    image.image ? (
                                                        <img alt="Main Image" src={image.image} className="w-[280px] h-[280px] object-cover rounded-[8px]" />
                                                    ) : (
                                                        <label htmlFor={image.name} className="block relative w-[250px] h-[240px] flex items-center justify-center text-aqua-blue cursor-pointer font-bold">
                                                            {image.label}
                                                            <p className="absolute bottom-[-35px] left-[10px]"></p>
                                                        </label>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
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
        </div>
    );
};

export default CreateEvent;