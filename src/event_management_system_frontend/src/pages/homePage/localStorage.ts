export const addToFavorities = (eventItemId: string) => {
    localStorage.setItem(eventItemId, "LIKED");
    const b = localStorage.getItem(eventItemId);
    // console.log(`${eventItemId}: ${b}`);
    const likedEvents = {
        eventId: eventItemId,
        like: b
    }

    return likedEvents;
}