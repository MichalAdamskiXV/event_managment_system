import { Link } from "react-router-dom";
import ExaplePhoto from "../public/example_photo.jpg"
import { FaHeart } from "react-icons/fa";
import { EventProps, EventSummary, fetchEvents } from "./backend";
import { useEffect, useState } from "react";

const Home = () => {
    const [events, setEvents] = useState<EventSummary[]>();
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, [page]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const fetchEventsList = await fetchEvents(page, 10); // Fetch 10 events per page
            setEvents(fetchEventsList);
        } catch (error) {
            console.error("Failed to fetch", error);
        } finally {
            setLoading(false);
        }
    };

    const handleNextPage = () => setPage(page + 1);
    const handlePrevPage = () => setPage(page - 1);

    return (
        <div className="p-6 w-[100%] bg-body h-[100%] flex flex-wrap gap-6 justify-center">
            {loading ? (
                <div>Loading...</div>
            ) : (
                events?.map((event) => (
                    <Link key={event.id} to={`/event/${event.id}`}>
                        <div className="w-[300px] bg-dark rounded-[8px] p-3 cursor-pointer shadow-2xl">
                            <img src={event.mainImage} alt={event.eventName} className="w-[300px] h-[250px] object-cover rounded-[8px]" />
                            <div className="pt-1">
                                <h3 className="font-extrabold text-white text-xl">{event.eventName}</h3>
                                <p className="font-bold text-light text-lg">{event.organizers}</p>
                                <span className="flex items-center gap-3 text-lg text-light pt-1">
                                    <FaHeart className="text-red" />{event.likes}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))
            )}
            <div className="w-full flex justify-between mt-4">
                <button onClick={handlePrevPage} disabled={page === 0} className="btn">
                    Previous
                </button>
                {
                    events && (
                        <button onClick={handleNextPage} disabled={events.length < 10} className="btn">
                            Next
                        </button>
                    )
                }
            </div>
        </div>
    );
};

export default Home;