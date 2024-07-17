import { event_management_system_backend } from '../../../declarations/event_management_system_backend';

interface EventProps {
    id: string,
    eventName: string,
    eventDescription: string,
    localization: string,
    organizers: string,
    hourFrom: string,
    hourTo: string,
    email: string,
    phone: string,
    mainImage: string,
    secondImage: string,
    ticketPrice: string,
}

export const addEventOffer = async (eventOffer: EventProps) => {
    try {
        const createEventOffer = await event_management_system_backend.createEventOffer(eventOffer);
        console.log(createEventOffer)
        return createEventOffer;
    } catch (error) {
        console.error("Failed to create event offer: ERROR - ", error)
    }
}