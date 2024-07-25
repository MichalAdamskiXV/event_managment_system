import { EventSummary, fetchEvents } from "@/backend";
import EventsCards from "@/components/EventsCards";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";

const SearchPage = () => {
    const [events, setEvents] = useState<EventSummary[]>();
    const [originalEvents, setOriginalEvents] = useState<EventSummary[]>();
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, [page]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const fetchEventsList = await fetchEvents(page, 50);
            setEvents(fetchEventsList);
            setOriginalEvents(fetchEventsList);
        } catch (error) {
            console.error("Failed to fetch", error);
        } finally {
            setLoading(false);
        }
    };

    const findSpecyficEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value.toUpperCase();

        if (searchValue.length === 0) {
            setEvents(originalEvents);
        } else {
            const filteredEvents = originalEvents?.filter((eventItem) => {
                return (
                    eventItem.eventName.toUpperCase().includes(searchValue) ||
                    eventItem.organizers.toUpperCase().includes(searchValue) ||
                    eventItem.eventDescription.toUpperCase().includes(searchValue)
                );
            });
            setEvents(filteredEvents);
        }
    };

    const handleNextPage = () => setPage(page + 1);
    const handlePrevPage = () => setPage(page - 1);

    return (
        <div className="p-6 w-[100%] bg-body h-[100%] flex flex-wrap gap-6 justify-center relative">
            <div className="pt-4">
                <input
                    onChange={findSpecyficEvent}
                    type="text"
                    className="outline-none font-bold text-gray text-xl bg-dark p-3 w-[800px] rounded-[8px]"
                    placeholder="Search ..."
                />
            </div>
            {loading ? (
                <Loader message="Loading Events List" />
            ) : (
                <EventsCards
                    eventsItems={events}
                    isLoading={loading}
                />
            )}
            <div className="w-full flex justify-between mt-4">
                <button onClick={handlePrevPage} disabled={page === 0} className="btn">
                    Previous
                </button>
                {events?.length === 50 && (
                    <button onClick={handleNextPage} className="btn">
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
