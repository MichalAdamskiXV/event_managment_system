import { Canister, None, Opt, query, Record, Some, text, update, Vec } from 'azle';

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
    createEventOffer: update([EventOffer], text, (newOffer) => {
        events.push(newOffer);
        return `Added Event: ${newOffer.eventName}`;
    }),

    getEventsOffer: query([], Vec(EventOffer), () => {
        return events;
    }),

    selectSpecyficEvent: query([text], Opt(EventOffer), (id) => {
        const selectedEvent = events.find(event => event.id === id);
        return selectedEvent ? Some(selectedEvent) : None;
    })
})
