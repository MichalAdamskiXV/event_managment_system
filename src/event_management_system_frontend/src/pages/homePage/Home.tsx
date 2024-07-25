import { EventSummary, fetchEvents } from "../../backend";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import EventsCards from "@/components/EventsCards";

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
            const fetchEventsList = await fetchEvents(page, 50); // Fetch 50 events per page
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
        <div className="p-6 w-[100%] bg-body h-[100%] flex flex-wrap gap-6 justify-center relative">
            {loading ? (
                <Loader message="Loading Events List" />
            ) : (
                <EventsCards eventsItems={events} isLoading={loading} />
            )}
            <div className="w-full flex justify-between mt-4">
                <button onClick={handlePrevPage} disabled={page === 0} className="btn">
                    Previous
                </button>
                {events && (
                    <button onClick={handleNextPage} disabled={events.length < 50} className="btn">
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default Home;
