import { EventProps, selectEventById } from "@/backend";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const Event = () => {

    const { eventId } = useParams();
    const [event, setEvent] = useState<EventProps[]>();

    useEffect(() => {
        fetchSpecyficEvent();
    }, [])

    const fetchSpecyficEvent = async () => {
        try {
            if (eventId) {
                const event = await selectEventById(eventId);
                setEvent(event);
            }
        } catch (error) {
            console.error(`Failed to fetch event with id: ${eventId}. ERROR - `, error);
        }
    }

    return (
        <div>
            {
                event?.map((item) => (
                    <div key={item.id}>
                        <h1>{item.id}</h1>
                        <h2>{item.eventName}</h2>
                    </div>
                ))
            }
        </div>
    )
}

export default Event
