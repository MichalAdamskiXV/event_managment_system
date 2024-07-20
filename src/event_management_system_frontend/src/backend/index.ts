import { HttpAgent, Actor } from '@dfinity/agent';
import { event_management_system_backend, idlFactory } from '../../../declarations/event_management_system_backend';
import { Principal } from '@dfinity/principal';

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
    ticketPrice: string;
    likes: string;
}

export interface EventSummary {
    id: string;
    eventName: string;
    organizers: string;
    likes: string;
    eventDescription: string;
}

export const addEventBasicInfo = async (eventOffer: EventProps) => {
    try {
        const createEventOffer = await event_management_system_backend.addEventBasicInfo(eventOffer);
        console.log(createEventOffer);
    } catch (error) {
        console.error("Failed to create event offer with basic info: ERROR - ", error);
    }
}

export const fetchEvents = async (start: number, limit: number) => {
    try {
        const events = await event_management_system_backend.getEventsOffer(BigInt(start), BigInt(limit));
        console.log(events);
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

export const likeEvent = async (eventId: string) => {
    try {
        const likedEvent = await event_management_system_backend.likeEvent(eventId);
        return likedEvent;
    } catch (error) {
        console.error(`Failed to like event with id: ${eventId}. ERROR `, error)
    }
}

export const unlikeEvent = async (eventId: string) => {
    try {
        const unlikedEvent = await event_management_system_backend.unlikeEvent(eventId);
        return unlikedEvent;
    } catch (error) {
        console.error(`Failed to like event with id: ${eventId}. ERROR `, error)
    }
}

const agent = new HttpAgent();
// const eventActor = Actor.createActor(idlFactory, {
//     agent,
//     canisterId: 'aovwi-4maaa-aaaaa-qaagq-cai',
// });

export const createTicketNFT = async (eventItemId: string, metadata: string = "Ticket Metadata Here") => {
    try {
        const principal = await agent.getPrincipal();
        const createTicket = await event_management_system_backend.createTicketNFT(eventItemId, principal, metadata);
        return createTicket;
    } catch (error) {
        console.error("Failed to create ticket NFT. ERROR - ", error);
    }
}

const ownersId: string[] = [];

export const transferTicketNFT = async (ticketId: string) => {
    try {
        const newOwner = await agent.getPrincipal();
        const transefTicket = await event_management_system_backend.transferTicketNFT(ticketId, newOwner);
        //return owner ID newOwner.toString();
        ownersId.push(newOwner.toString());
        return transefTicket;
    } catch (error) {
        console.error("Failed to trasfer NTF ticket. ERROR - ", error);
    }
}

export const getTicketsByOwner = async () => {
    try {
        // const newOwner = await agent.getPrincipal();
        const ownerPrincipal = Principal.fromText(ownersId[0]); // Jeśli `ownersId[0]` jest stringiem

        // Wywołaj backendową funkcję z obiektem Principal
        const getTicket = await event_management_system_backend.getTicketsByOwner(ownerPrincipal);
        return getTicket;
    } catch (error) {
        console.error("Failed to get ticket by owner. ERROR - ", error);
    }
}