import { createTicketNFT, EventProps, getTicketsByOwner, selectEventById } from "@/backend";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { FaHeart } from "react-icons/fa";
import { buyTicketNFT } from "./ticketNFT";

const Event = () => {
    const { eventId } = useParams();
    const [events, setEvents] = useState<EventProps[]>();

    useEffect(() => {
        fetchSpecyficEvent();
    }, [])

    const fetchSpecyficEvent = async () => {
        try {
            if (eventId) {
                const event = await selectEventById(eventId);
                setEvents(event);
            }
        } catch (error) {
            console.error(`Failed to fetch event with id: ${eventId}. ERROR - `, error);
        }
    }

    const handleBuyTicket = async (eventItemId: string) => {
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
        <div className="p-6 w-[100%] bg-body h-[100%] pt-12 relative">
            {
                events?.map((eventItem) => (
                    <div key={eventItem.id}>
                        <div className="w-[100%] flex justify-center">
                            <header className="w-[70%] text-center font-bold text-3xl text-aqua-blue relative">
                                {eventItem.eventName.toUpperCase()}
                                <div className="absolute top-0 right-0 flex items-center gap-3 text-red">
                                    <span className="text-light">{eventItem.likes}</span>
                                    <FaHeart />
                                </div>
                            </header>
                        </div>
                        <div className="w-[100%] flex justify-center">
                            <div className="w-[70%] text-justify pt-6 relative">
                                <p className="pt-2 text-lg font-bold text-form-gray">
                                    Organizer: {eventItem.organizers}
                                </p>
                            </div>
                        </div>
                        <div className="w-[100%] flex justify-center">
                            <div className="w-[70%] text-justify pt-6 relative">
                                <h3 className="text-form-gray font-bold text-2xl">Event Description</h3>
                                <p className="pt-2 text-lg font-bold text-gray">
                                    {eventItem.eventDescription}
                                </p>
                            </div>
                        </div>
                        <div className="w-[100%] flex justify-center">
                            <div className="w-[70%] text-justify pt-6 text-form-gray flex gap-10">
                                <div>
                                    <span className="font-bold text-2xl">Hour From</span>
                                    <p className="text-gray text-xl">{eventItem.hourFrom.slice(0, 5)}</p>
                                </div>
                                <div>
                                    <span className="font-bold text-2xl">Hour To</span>
                                    <p className="text-gray text-xl">{eventItem.hourTo.slice(0, 5)}</p>
                                </div>
                                <div>
                                    <span className="font-bold text-2xl">Localization</span>
                                    <p className="text-gray text-xl">{eventItem.localization}</p>
                                </div>
                                <div>
                                    <span className="font-bold text-2xl">Email</span>
                                    <p className="text-gray text-xl">{eventItem.email}</p>
                                </div>
                                <div>
                                    <span className="font-bold text-2xl">Phone</span>
                                    <p className="text-gray text-xl">{eventItem.phone}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[100%] flex justify-center">
                            <div className="w-[70%] pt-12">
                                <button onClick={() => handleBuyTicket(eventItem.id)} className="font-bold text-xl text-body p-3 w-[250px] bg-aqua-blue rounded-[8px] border-solid border-aqua-blue border-[2px] hover:bg-body hover:text-aqua-blue">BUY TICKET</button>
                                <span className="pl-6 font-bold text-light text-3xl">{eventItem.ticketPrice} PLN</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Event
