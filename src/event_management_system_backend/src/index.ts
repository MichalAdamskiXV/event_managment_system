import { Canister, None, Opt, query, Record, Some, text, update, Vec, nat, Principal } from 'azle';

const TicketNFT = Record({
    id: text,
    eventItemId: text,
    owner: Principal,
    metadata: text
});

let tickets: { id: string, eventItemId: string, owner: Principal, metadata: string }[] = [];

const generateUniqueId = (): string => {
    return Math.random().toString(36).substring(2);
}

const createTicket = (eventItemId: string, owner: Principal, metadata: string) => {
    const id = generateUniqueId();
    const ticketNFT = { id, eventItemId, owner, metadata };
    tickets.push(ticketNFT);
    return ticketNFT;
}

const transferTicketNFT = (ticketId: string, newOwner: Principal) => {
    const ticket = tickets.find(ticket => ticket.id === ticketId);
    if (ticket) {
        ticket.owner = newOwner;
        return true;
    }
    return false;
}

const getTicketsByOwner = (owner: Principal) => {
    return tickets.filter(ticket => ticket.owner === owner);
}

const EventOffer = Record({
    id: text,
    eventName: text,
    eventDescription: text,
    localization: text,
    organizers: text,
    hourFrom: text,
    hourTo: text,
    email: text,
    phone: text,
    ticketPrice: text,
    likes: text
});

const EventSummary = Record({
    id: text,
    eventName: text,
    organizers: text,
    likes: text,
    eventDescription: text,
});

let events: {
    id: string,
    eventName: string,
    eventDescription: string,
    localization: string,
    organizers: string,
    hourFrom: string,
    hourTo: string,
    email: string,
    phone: string,
    ticketPrice: string,
    likes: string
}[] = [];

export default Canister({
    addEventBasicInfo: update([EventOffer], text, (newEvent) => {
        events.push({
            id: newEvent.id,
            eventName: newEvent.eventName,
            eventDescription: newEvent.eventDescription,
            localization: newEvent.localization,
            organizers: newEvent.organizers,
            hourFrom: newEvent.hourFrom,
            hourTo: newEvent.hourTo,
            email: newEvent.email,
            phone: newEvent.phone,
            ticketPrice: newEvent.ticketPrice,
            likes: newEvent.likes
        });
        return `Added basic info for event: ${newEvent.eventName}`
    }),

    getEventsOffer: query([nat, nat], Vec(EventSummary), (start, limit) => {
        const selectedEvents = events
            .slice(Number(start), Number(start) + Number(limit))
            .map(event => ({
                id: event.id,
                eventName: event.eventName,
                organizers: event.organizers,
                likes: event.likes,
                eventDescription: event.eventDescription,
            }));
        return selectedEvents;
    }),

    selectSpecyficEvent: query([text], Opt(EventOffer), (id) => {
        const selectedEvent = events.find(event => event.id === id);
        return selectedEvent ? Some(selectedEvent) : None;
    }),

    likeEvent: update([text], text, (id) => {
        const eventIndex = events.findIndex(eventItem => eventItem.id === id);
        const selectedEvent = events[eventIndex];
        const like = parseInt(selectedEvent.likes);
        const updateLike = like + 1;

        events[eventIndex] = {
            ...selectedEvent,
            likes: updateLike.toString()
        };

        return `Added Like to Event With ID: ${id}`
    }),

    unlikeEvent: update([text], text, (id) => {
        const eventIndex = events.findIndex(eventItem => eventItem.id === id);
        const selectedEvent = events[eventIndex];
        const like = parseInt(selectedEvent.likes);
        const updateLike = like - 1;

        events[eventIndex] = {
            ...selectedEvent,
            likes: updateLike.toString()
        };

        return `Unliked Event With ID: ${id}`
    }),

    createTicketNFT: update([text, Principal, text], TicketNFT, (eventItemId, owner, metadata) => {
        const ticketNFT = createTicket(eventItemId, owner, metadata);
        return ticketNFT;
    }),

    transferTicketNFT: update([text, Principal], text, (ticketId, newOwner) => {
        const success = transferTicketNFT(ticketId, newOwner);
        if (success) {
            return `Ticket with ID ${ticketId} transferred to new owner - ${newOwner}.`;
        } else {
            return `Ticket with ID ${ticketId} not found.`;
        }
    }),

    getTicketsByOwner: query([Principal], Vec(TicketNFT), (owner) => {
        return getTicketsByOwner(owner);
    }),

    getHotEvents: query([], Vec(EventSummary), () => {
        const sortedEvents = events
            .sort((a, b) => parseInt(b.likes) - parseInt(a.likes))
            .slice(0, 30)
            .map(event => ({
                id: event.id,
                eventName: event.eventName,
                organizers: event.organizers,
                likes: event.likes,
                eventDescription: event.eventDescription,
            }));
        return sortedEvents;
    })
});
