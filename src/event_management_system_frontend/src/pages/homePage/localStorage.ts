import { likeEvent, unlikeEvent } from "@/backend";

export const addToFavorities = (currentLikes: { eventId: string }[], eventsId: string[]) => {
    eventsId.forEach((eventId) => {
        const alreadyLiked = currentLikes.some(like => like.eventId === eventId);

        if (alreadyLiked) {
            localStorage.setItem(eventId, "LIKED");
            //likeBackendLikes(eventId);
        } else {
            localStorage.removeItem(eventId);
            //unlikeEventBackend(eventId);
        }
    });
};

export const getFavoritedEvents = (): string[] => {
    const favoritedEvents: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && localStorage.getItem(key) === "LIKED") {
            favoritedEvents.push(key);
        }
    }
    return favoritedEvents;
};

export const likeBackendLikes = async (eventId: string) => {
    try {
        const updateLikes = await likeEvent(eventId);
        return updateLikes;
    } catch (error) {
        console.error(`Failed to like event. ERROR `, error)
    }
}

export const unlikeEventBackend = async (eventId: string) => {
    try {
        const updateLikes = await unlikeEvent(eventId);
        console.log(updateLikes);
    } catch (error) {
        console.error(`Failed to unlike event. ERROR `, error)
    }
}