import { Link } from "react-router-dom";
// import ExaplePhoto from "../public/example_photo.jpg"
import { FaHeart } from "react-icons/fa";
import { EventProps, EventSummary, fetchEvents } from "../../backend";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { addToFavorities } from "./localStorage";


const Home = () => {
    const [events, setEvents] = useState<EventSummary[]>();
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const [currentLikes, setCurrentLikes] = useState({});

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

    const handleLikeChange = (event: any, eventItemId: string) => {
        const id = event.currentTarget.getAttribute("name");
        events?.map((eventItem) => {
            if (eventItem.id === id) {
                let like = parseInt(eventItem.likes);
                like += 1;

                const a = addToFavorities(eventItemId);
                setCurrentLikes({ ...currentLikes, ...a });
            }
        })
    }

    return (
        <div className="p-6 w-[100%] bg-body h-[100%] flex flex-wrap gap-6 justify-center">
            {loading ? (
                <div>Loading...</div>
            ) : (
                events?.map((eventItem) => (
                    <div key={eventItem.id} className="w-[800px] h-[260px] bg-dark rounded-[8px] shadow-2xl flex p-2 relative">
                        <button onClick={() => console.log(currentLikes)}>CICK ME</button>
                        <div className="w-[100%] h-[100%]">
                            <div className="pl-1 pr-1">
                                <h3 className="font-extrabold text-aqua-blue text-2xl">{eventItem.eventName}</h3>
                                <p className="font-bold text-form-gray text-xl pt-1">{eventItem.organizers}</p>
                                <p className="text-lg text-light pt-3 text-justify">
                                    {eventItem.eventDescription.length > 300 && eventItem.eventDescription.slice(0, 300) + " ..."}
                                </p>
                                <span className="flex items-center gap-3 text-xl text-light">
                                    <div className="flex items-center gap-3 absolute bottom-2">
                                        {/* <FaHeart className={`${isLiked ? 'text-red' : 'text-body'} text-2xl`} name={eventItem.id} onClick={(event) => handleLikeChange(event, eventItem.id)} /> */}
                                        {eventItem.likes}

                                    </div>
                                    <div className="absolute bottom-2 right-2">
                                        <Link to={`/event/${eventItem.id}`}>
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