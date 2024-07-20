import { createTicketNFT, EventProps, getTicketsByOwner, transferTicketNFT } from "@/backend";

export const buyTicketNFT = async (selectedEvent: EventProps) => {
    try {
        const metadata = JSON.stringify({
            eventName: selectedEvent?.eventName,
            hourFrom: selectedEvent?.hourFrom,
            hourTo: selectedEvent?.hourTo,
            localization: selectedEvent?.localization
        })
        const ticket = await createTicketNFT(selectedEvent.id, metadata);
        if (ticket) {
            const transferTicket = await transferTicketNFT(ticket?.id);
            console.log(transferTicket);
        }
        return ticket;
    } catch (error) {
        console.error("Failed to buy ticket. ERROR - ", error);
    }
}

// export const getTicket = async () => {
//     try {
//         const getTicketByOwner = await getTicketsByOwner();
//         console.log(getTicketByOwner);
//     } catch (error) {
//         console.error("Filed to get ticket by owner. ERROR - ", error);
//     }
// }