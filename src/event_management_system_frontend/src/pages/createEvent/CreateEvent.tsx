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
import { comporessImage } from "./compressImage";
import { formFields, contactFields } from "@/constants";
import { addEventOffer } from "@/backend";
import Loader from "../../components/Loader";

const CreateEvent = () => {

    const [addingEvent, setAddingEvent] = useState(false);

    const [eventImage, setEventImage] = useState({
        mainImage: "",
        secondImage: ""
    })

    const imageFields = [
        { id: 'mainImage', name: 'mainImage', label: "Select Main Event Image", image: eventImage.mainImage },
        { id: 'secondImage', name: 'secondImage', label: "Select Secondary Event Image", image: eventImage.secondImage },
    ];

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

    const onSubmit = async (values: z.infer<typeof eventSchema>) => {
        setAddingEvent(true);

        const generateId = () => {
            return Date.now().toString() + Math.random().toString(36).substr(2, 9);
        };

        const createEventObject = {
            id: generateId(),
            mainImage: eventImage.mainImage,
            secondImage: eventImage.secondImage,
            likes: '0',
            ...values
        };

        await addEventOffer(createEventObject);
        setAddingEvent(false);
    }

    return (
        <div className="p-6 w-[100%] bg-body h-[100%] flex gap-6 pt-12 relative">
            {addingEvent && <Loader />}
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