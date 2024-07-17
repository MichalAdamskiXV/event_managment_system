import { event_management_system_backend } from '../../../declarations/event_management_system_backend';

export interface EventProps {
    id: string;
    eventName: string;
    eventDescription: string;
    localization: string;
    organizers: string;
    hourFrom: string;
    hourTo: string;
    email: string;
    phone: string;
    mainImage: string;
    secondImage: string;
    ticketPrice: string;
    likes: string;
}

export interface EventSummary {
    id: string,
    eventName: string,
    organizers: string,
    likes: string,
    mainImage: string,
}

export const addEventOffer = async (eventOffer: EventProps) => {
    try {
        const createEventOffer = await event_management_system_backend.createEventOffer(eventOffer);
        console.log(createEventOffer);
        return createEventOffer;
    } catch (error) {
        console.error("Failed to create event offer: ERROR - ", error);
    }
};

export const fetchEvents = async (start: number, limit: number) => {
    try {
        const events = await event_management_system_backend.getEventsOffer(BigInt(start), BigInt(limit));
        return events;
    } catch (error) {
        console.error("Failed to fetch events: ERROR - ", error);
    }
};

export const selectEventById = async (eventId: string) => {
    try {
        const event = await event_management_system_backend.selectSpecyficEvent(eventId);
        return event;
    } catch (error) {
        console.error(`Failed to fetch event with id: ${eventId}. ERROR - `, error);
    }
};