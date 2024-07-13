import { Link } from "react-router-dom";
import ExaplePhoto from "../public/example_photo.jpg"
import { FaHeart } from "react-icons/fa";

const Home = () => {

    const events = [
        { id: 1, title: 'Event 1', organizers: 'Organizer 1', likes: 100, img: ExaplePhoto },
        { id: 2, title: 'Event 2', organizers: 'Organizer 2', likes: 89, img: ExaplePhoto },
        { id: 3, title: 'Event 3', organizers: 'Organizer 3', likes: 23, img: ExaplePhoto },
        { id: 4, title: 'Event 4', organizers: 'Organizer 4', likes: 12, img: ExaplePhoto },
        { id: 5, title: 'Event 5', organizers: 'Organizer 5', likes: 132, img: ExaplePhoto },
        { id: 6, title: 'Event 6', organizers: 'Organizer 6', likes: 74, img: ExaplePhoto },
        { id: 7, title: 'Event 7', organizers: 'Organizer 7', likes: 123, img: ExaplePhoto },
        { id: 8, title: 'Event 8', organizers: 'Organizer 8', likes: 122, img: ExaplePhoto },
        { id: 9, title: 'Event 9', organizers: 'Organizer 9', likes: 101, img: ExaplePhoto },
        { id: 10, title: 'Event 10', organizers: 'Organizer 10', likes: 12, img: ExaplePhoto },
        { id: 11, title: 'Event 11', organizers: 'Organizer 11', likes: 312, img: ExaplePhoto },
    ]

    return (
        <div className="p-6 w-[100%] bg-body h-[100%] flex flex-wrap gap-6 justify-center">
            {
                events.map((event) => (
                    <Link to={`/event/${event.id}`}>
                        <div key={event.id} className="w-[300px] bg-dark rounded-[8px] p-3 cursor-pointer shadow-2xl">
                            <img src={event.img} alt={event.title} className="w-[300px] h-[250px] object-cover rounded-[8px]" />
                            <div className="pt-1">
                                <h3 className="font-extrabold text-white text-xl">{event.title}</h3>
                                <p className="font-bold text-light text-lg">{event.organizers}</p>
                                <span className="flex items-center gap-3 text-lg text-light pt-1"><FaHeart className="text-red"/>{event.likes}</span>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default Home
