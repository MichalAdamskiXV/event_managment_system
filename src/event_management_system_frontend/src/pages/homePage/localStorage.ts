import { likeEvent, unlikeEvent } from "@/backend";

export const updateFavorities = (currentLikes: { eventId: string }[]) => {
    const favoritedEvents = getFavoritedEvents();

    currentLikes.forEach(({ eventId }) => {
        if (!favoritedEvents.includes(eventId)) {
            localStorage.setItem(eventId, "LIKED");
        }
    });

    favoritedEvents.forEach(eventId => {
        if (!currentLikes.some(like => like.eventId === eventId)) {
            localStorage.removeItem(eventId);
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
        return await likeEvent(eventId);
    } catch (error) {
        console.error("Failed to like event. ERROR ", error);
        throw error;
    }
};

export const unlikeEventBackend = async (eventId: string) => {
    try {
        return await unlikeEvent(eventId);
    } catch (error) {
        console.error("Failed to unlike event. ERROR ", error);
        throw error;
    }
};
