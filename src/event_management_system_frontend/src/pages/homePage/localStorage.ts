export const addToFavorities = (currentLikes: { eventId: string }[], eventsId: string[]) => {
    eventsId.forEach((eventId) => {
        const alreadyLiked = currentLikes.some(like => like.eventId === eventId);

        if (alreadyLiked) {
            localStorage.setItem(eventId, "LIKED");
        } else {
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