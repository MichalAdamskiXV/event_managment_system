import { useParams } from "react-router-dom"

const Event = () => {

    const { eventId } = useParams();

    return (
        <div>
            <button onClick={() => console.log(eventId)}>CLICK ME</button>
        </div>
    )
}

export default Event
