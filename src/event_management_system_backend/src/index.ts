import { Canister, query, Record, text, update, Vec } from 'azle';

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
}[] = [];

export default Canister({
    createEventOffer: update([EventOffer], text, (newOffer) => {
        events.push(newOffer);
        return `Added Event: ${newOffer.eventName}`;
    }),

    getEventsOffer: query([], Vec(EventOffer), () => {
        return events;
    })
})
