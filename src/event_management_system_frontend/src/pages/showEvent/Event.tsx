import { EventProps, selectEventById } from "@/backend";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { FaHeart } from "react-icons/fa";
import { buyTicketNFT } from "./ticketNFT";
import { getAccessToken } from "@/services/payPalService";
import PaymentLayout from "../payment/PaymentLayout";

const Event = () => {
    const { eventId } = useParams();
    const [events, setEvents] = useState<EventProps[]>();

    const [payment, setPayment] = useState(false);
    const [paymentData, setPaymentData] = useState({
        eventId: "",
        price: "",
        email: ""
    });

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

    const hanlePaymentWindow = (eventItemId: string) => {
        const selectedEvent = events?.find(eventItem => eventItem.id === eventItemId);

        if (selectedEvent) {
            const paymentData = {
                eventId: selectedEvent.id,
                price: selectedEvent.ticketPrice,
                email: selectedEvent.email
            }
            setPaymentData(paymentData);
            setPayment(true);
        }
    }

    return (
        <div className="p-6 w-[100vw] bg-body h-[100vh] pt-12 relative">
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
                                <Link to={`/payment/${eventItem.id}/${eventItem.email}/${eventItem.ticketPrice}`}>
                                    <button onClick={() => hanlePaymentWindow(eventItem.id)} className="font-bold text-xl text-body p-3 w-[250px] bg-aqua-blue rounded-[8px] border-solid border-aqua-blue border-[2px] hover:bg-body hover:text-aqua-blue">BUY TICKET</button>
                                </Link>
                                <span className="pl-6 font-bold text-light text-3xl">{eventItem.ticketPrice} USD</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Event
