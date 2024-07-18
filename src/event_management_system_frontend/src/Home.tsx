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
            const fetchEventsList = await fetchEvents(page, 50); // Fetch 10 events per page
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
                    <div key={event.id} className="w-[800px] h-[260px] bg-dark rounded-[8px] shadow-2xl flex p-2 relative">
                        <div className="w-[100%] h-[100%]">
                            <div className="pl-1 pr-1">
                                <h3 className="font-extrabold text-aqua-blue text-2xl">{event.eventName}</h3>
                                <p className="font-bold text-form-gray text-xl pt-1">{event.organizers}</p>
                                <p className="text-lg text-light pt-3 text-justify">
                                    {event.eventDescription.length > 300 && event.eventDescription.slice(0, 300) + " ..."}
                                </p>
                                <span className="flex items-center gap-3 text-xl text-light">
                                    <div className="flex items-center gap-3 absolute bottom-2">
                                        <FaHeart className="text-red" />{event.likes}
                                    </div>
                                    <div className="absolute bottom-2 right-2">
                                        <Link to={`/event/${event.id}`}>
                                            <button className="hover:bg-body text-lg font-bold cursor-pointer text-aqua-blue rounded-[8px] bg-dark border-solid border-body border-[2px] p-2 px-4 flex items-center">See More</button>
                                        </Link>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            )}
            <div className="w-full flex justify-between mt-4">
                <button onClick={handlePrevPage} disabled={page === 0} className="btn">
                    Previous
                </button>
                {
                    events && (
                        <button onClick={handleNextPage} disabled={events.length < 50} className="btn">
                            Next
                        </button>
                    )
                }
            </div>
        </div>
    );
};

export default Home;