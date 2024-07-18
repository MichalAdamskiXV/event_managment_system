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
    mainImage: text,
    secondImage: text,
    ticketPrice: text,
    likes: text
});

const EventSummary = Record({
    id: text,
    eventName: text,
    organizers: text,
    likes: text,
    mainImage: text,
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
    mainImage: string,
    secondImage: string,
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
            mainImage: "",
            secondImage: "",
            ticketPrice: newEvent.ticketPrice,
            likes: newEvent.likes
        });
        return `Added basic info for event: ${newEvent.eventName}`
    }),

    addEventImages: update([text, text, text], text, (id, mainImage, secondImage) => {
        const event = events.find(event => event.id = id);
        if (event) {
            event.mainImage = mainImage;
            event.secondImage = secondImage;
            return `Added images for event: ${event.eventName}`;
        }
        return 'Failed to find event.'
    }),

    getEventsOffer: query([nat, nat], Vec(EventSummary), (start, limit) => {
        const selectedEvents = events
            .slice(Number(start), Number(start) + Number(limit))
            .map(event => ({
                id: event.id,
                eventName: event.eventName,
                organizers: event.organizers,
                likes: event.likes,
                mainImage: event.mainImage
            }));
        return selectedEvents;
    }),

    selectSpecyficEvent: query([text], Opt(EventOffer), (id) => {
        const selectedEvent = events.find(event => event.id === id);
        return selectedEvent ? Some(selectedEvent) : None;
    })
});
