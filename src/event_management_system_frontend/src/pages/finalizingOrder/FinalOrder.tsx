import { EventProps, selectEventById } from "@/backend";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { buyTicketNFT } from "../showEvent/ticketNFT";

const FinalOrder = () => {

    const { finalEventId } = useParams();
    const [events, setEvents] = useState<EventProps[]>();

    useEffect(() => {
        fetchSpecyficEvent();
    }, [])

    const fetchSpecyficEvent = async () => {
        try {
            if (finalEventId) {
                const event = await selectEventById(finalEventId);
                setEvents(event);
            }
        } catch (error) {
            console.error(`Failed to fetch event with id: ${finalEventId}. ERROR - `, error);
        }
    }

    const handleFinalOrder = async (eventItemId: string) => {
        const selectedEvent = events?.find(eventItem => eventItem.id === eventItemId);
        try {
            if (selectedEvent) {
                const ticket = await buyTicketNFT(selectedEvent);
                console.log(ticket);
            }
        } catch (error) {
            console.log("Failed to buy ticket. ERROR - ", error)
        }
    }

    return (
        <div className="w-[100%] h-[100%] flex items-center justify-center">
            <div className="w-[70%] text-center p-6">
                <h1 className="text-aqua-blue font-bold text-2xl">Finalizing Order</h1>
                <div>

                </div>
                <div>
                    <button onClick={() => { finalEventId && handleFinalOrder(finalEventId) }} className="hover:bg-body hover:text-aqua-blue border-solid border-[2px] border-aqua-blue text-body w-[300px] p-2 bg-aqua-blue rounded-[8px] font-bold text-xl">Send Ticket</button>
                </div>
            </div>
        </div>
    )
}

export default FinalOrder