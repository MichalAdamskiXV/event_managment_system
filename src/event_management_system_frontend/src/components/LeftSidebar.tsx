import { Link, Outlet } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaHotjar } from "react-icons/fa";

const LeftSidebar = () => {

    const sidebarLinks = [
        { id: 1, title: 'Home', path: '/', icon: <FaHome /> },
        { id: 2, title: 'Search', path: '/search', icon: <FaSearch /> },
        { id: 3, title: 'Hot Events', path: '/hotEvents', icon: <FaHotjar /> },
    ];

    return (
        <div className="flex">
            <div className="w-auto h-[100vh] p-3 bg-dark">
                <ul>
                    {
                        sidebarLinks.map(({ icon, id, path, title }) => (
                            <Link key={id} to={path}>
                                <li className="hover:bg-body rounded-[8px] flex items-center text-light font-extrabold text-3xl p-3">
                                    {icon}
                                    <span className="text-lg pl-3">{title}</span>
                                </li>
                            </Link>
                        ))
                    }
                </ul>
            </div>
            <Outlet />
        </div>
    )
}

export default LeftSidebar