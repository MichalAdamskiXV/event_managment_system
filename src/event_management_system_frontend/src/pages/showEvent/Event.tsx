import { EventProps, selectEventById } from "@/backend";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

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

    return (
        <div className="p-6 w-[100%] bg-body h-[100%] pt-12 relative">
            {
                events?.map((event) => (
                    <div>
                        <header className="text-center font-bold text-3xl text-aqua-blue">
                            {event.eventName}
                        </header>
                        <div className="flex justify-center gap-6 w-[80%]">
                            <img alt={event.eventName} src={event.mainImage} className="w-[400px] h-[300px]" />
                            <img alt={event.eventName} src={event.secondImage} className="w-[400px] h-[300px]" />
                        </div>
                        <div key={event.id}>
                            <h1>{event.id}</h1>
                            <h2>{event.eventName}</h2>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Event
