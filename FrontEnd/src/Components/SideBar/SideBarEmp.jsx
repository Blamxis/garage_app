import { useEffect, useState } from 'react';
import './sidebar.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/Images/logo.svg';
import sidebarNav from '../../Configs/SideBarNavEmp';
import { FaSignOutAlt, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../../Context/AuthContext';

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const location = useLocation();
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNav.findIndex(item => item.section === curPath);

        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    const closeSidebar = () => {
        document.querySelector('.main__content').style.transform = 'scale(1) translateX(0)';
        setTimeout(() => {
            document.body.classList.remove('sidebar-open');
            document.querySelector('.main__content').style = '';
        }, 500);
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <img src={logo} alt="Logo" />
                <div className="sidebar-close" onClick={closeSidebar}>
                    <FaTimes className='icons' />
                </div>
            </div>
            <div className="sidebar__menu">
                <Link to="/" className="sidebar__menu__item" onClick={closeSidebar}>
                    <div className="sidebar__menu__item__icon">
                    <FaArrowLeft className='icons' />
                    </div>
                    <div className="sidebar__menu__item__txt">
                        Retour
                    </div>
                </Link>
                {
                    sidebarNav.map((nav, index) => (
                        <Link to={nav.link} key={`nav-${index}`} className={`sidebar__menu__item ${activeIndex === index && 'active'}`} onClick={closeSidebar}>
                            <div className="sidebar__menu__item__icon">
                                {nav.icon}
                            </div>
                            <div className="sidebar__menu__item__txt">
                                {nav.text}
                            </div>
                        </Link>
                    ))
                }
                <div className="sidebar__menu__item" onClick={handleLogout}>
                    <div className="sidebar__menu__item__icon">
                        <FaSignOutAlt className='icons' />
                    </div>
                    <div className="sidebar__menu__item__txt">
                        Déconnexion
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;


