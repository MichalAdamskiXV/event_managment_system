import { Link } from "react-router-dom";
import ExaplePhoto from "../public/example_photo.jpg"
import { FaHeart } from "react-icons/fa";
import { EventProps, fetchEvents } from "./backend";
import { useEffect, useState } from "react";

const Home = () => {

    const [events, setEvents] = useState<EventProps[]>();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const fetchEventsList = await fetchEvents();
            setEvents(fetchEventsList);
        } catch (error) {
            console.error("failed to fetch", error)
        }
    }

    return (
        <div className="p-6 w-[100%] bg-body h-[100%] flex flex-wrap gap-6 justify-center">
            {
                events?.map((event) => (
                    <Link to={`/event/${event.id}`}>
                        <div key={event.id} className="w-[300px] bg-dark rounded-[8px] p-3 cursor-pointer shadow-2xl">
                            <img src={event.mainImage} alt={event.eventName} className="w-[300px] h-[250px] object-cover rounded-[8px]" />
                            <div className="pt-1">
                                <h3 className="font-extrabold text-white text-xl">{event.eventName}</h3>
                                <p className="font-bold text-light text-lg">{event.organizers}</p>
                                <span className="flex items-center gap-3 text-lg text-light pt-1"><FaHeart className="text-red" />{event.likes}</span>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default Home
