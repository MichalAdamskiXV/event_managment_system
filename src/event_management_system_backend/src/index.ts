import { Canister, None, Opt, query, Record, Some, text, update, Vec, nat } from 'azle';

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
    })
});