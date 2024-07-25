import { EventSummary } from "@/backend";
import Loader from "./Loader";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import DotsLoader from "./DotsLoader";
import { useEffect, useState, useRef } from "react";
import { updateFavorities, getFavoritedEvents, likeBackendLikes, unlikeEventBackend } from "@/pages/homePage/localStorage";

interface EventsCardsProps {
    eventsItems: EventSummary[] | undefined;
    isLoading: boolean;
}

const EventsCards = ({ eventsItems, isLoading }: EventsCardsProps) => {
    const [currentLikes, setCurrentLikes] = useState<{ eventId: string }[]>([]);
    const [likeLoading, setLikeLoading] = useState({
        eventId: '',
        setLoading: false
    });
    const isInitialized = useRef(false);

    useEffect(() => {
        if (eventsItems) {
            const updatedEvents = eventsItems.map(event => ({
                ...event,
                isLiked: currentLikes.some(like => like.eventId === event.id),
            }));

            console.log(updatedEvents);
        }
    }, [likeLoading]);

    // Fetch initial likes from localStorage
    useEffect(() => {
        if (!isInitialized.current) {
            const favoritedEvents = getFavoritedEvents();
            const updatedLikes = favoritedEvents.map(eventId => ({ eventId }));
            setCurrentLikes(updatedLikes);
            isInitialized.current = true;
        }
    }, []);


    // Update localStorage whenever currentLikes changes
    useEffect(() => {
        if (isInitialized.current && eventsItems) {
            updateFavorities(currentLikes);
        }
    }, [currentLikes, eventsItems]);

    // Handle like/unlike actions
    const handleLikeChange = async (eventItemId: string) => {
        const alreadyLiked = currentLikes.some(like => like.eventId === eventItemId);
        const updatedLikes = alreadyLiked
            ? currentLikes.filter(like => like.eventId !== eventItemId)
            : [...currentLikes, { eventId: eventItemId }];

        setCurrentLikes(updatedLikes);

        try {
            setLikeLoading({ eventId: eventItemId, setLoading: true });
            if (alreadyLiked) {
                await unlikeEventBackend(eventItemId);
            } else {
                await likeBackendLikes(eventItemId);
            }
        } catch (error) {
            console.error("Failed to update backend likes. ERROR - ", error);
        } finally {
            setLikeLoading({ eventId: eventItemId, setLoading: false });
        }
    };

    if (isLoading) {
        return <Loader message="Loading Hot Events ..." />;
    }

    if (eventsItems?.length === 0) {
        return <div className="p-6 w-[100%] bg-body h-[100%] flex flex-wrap gap-6 justify-center relative"><p className="text-2xl font-extrabold text-light">No events found.</p></div>;
    }

    return (
        <div className="p-6 w-[100%] bg-body h-[100%] flex flex-wrap gap-6 justify-center relative">
            {eventsItems?.map((eventItem) => {
                const isLiked = currentLikes.some(likeItem => likeItem.eventId === eventItem.id);

                return (
                    <div key={eventItem.id} className="w-[800px] h-[260px] bg-dark rounded-[8px] shadow-2xl flex p-2 relative">
                        <div className="w-[100%] h-[100%]">
                            <div className="pl-1 pr-1">
                                <h3 className="font-extrabold text-aqua-blue text-2xl">{eventItem.eventName}</h3>
                                <p className="font-bold text-form-gray text-xl pt-1">{eventItem.organizers}</p>
                                <p className="text-lg text-light pt-3 text-justify w-[100%] overflow-hidden">
                                    {eventItem.eventDescription.length > 300 ? eventItem.eventDescription.slice(0, 300) + " ..." : eventItem.eventDescription}
                                </p>
                                <span className="flex items-center gap-3 text-xl text-light">
                                    <div className="flex items-center gap-3 absolute bottom-2">
                                        <FaHeart
                                            className={`${isLiked ? 'text-red' : 'text-body'} text-2xl cursor-pointer`}
                                            name={eventItem.id}
                                            onClick={() => handleLikeChange(eventItem.id)}
                                        />
                                        {
                                            likeLoading.eventId === eventItem.id && likeLoading.setLoading
                                                ? (<span className="pl-3"><DotsLoader /></span>)
                                                : <span>{parseInt(eventItem.likes)}</span>
                                        }
                                        {/* + (isLiked ? 1 : 0) */}
                                    </div>
                                    <div className="absolute bottom-2 right-2">
                                        <Link to={`/event/${eventItem.id}`}>
                                            <button className="hover:bg-body text-lg font-bold cursor-pointer text-aqua-blue rounded-[8px] bg-dark border-solid border-body border-[2px] p-2 px-4 flex items-center">
                                                See More
                                            </button>
                                        </Link>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default EventsCards;
