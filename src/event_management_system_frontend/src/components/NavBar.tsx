import { Link, Outlet } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaHotjar } from "react-icons/fa";

const NavBar = () => {

    const sidebarLinks = [
        { id: 1, title: 'Home', path: '/', icon: <FaHome /> },
        { id: 2, title: 'Search', path: '/search', icon: <FaSearch /> },
        { id: 3, title: 'Hot Events', path: '/hotEvents', icon: <FaHotjar /> },
    ];

    return (
        <div>
            <nav className="w-[100%] p-3 bg-dark flex justify-between items-center">
                <ul className="flex gap-6">
                    {
                        sidebarLinks.map(({ icon, id, path, title }) => (
                            <Link key={id} to={path}>
                                <li className="hover:bg-body rounded-[8px] flex items-center text-light font-extrabold text-2xl p-3">
                                    {icon}
                                    <span className="text-base pl-3">{title}</span>
                                </li>
                            </Link>
                        ))
                    }
                </ul>
                <Link to='/createEvent'>
                    <button className="hover:bg-dark bg-body w-[150px] p-2 py-3 text-white rounded-[8px] font-extrabold">Create Event</button>
                </Link>
            </nav>
            <Outlet />
        </div>
    )
}

export default NavBar