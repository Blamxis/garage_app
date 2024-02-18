import './TopNav.scss'
import { FaBars } from 'react-icons/fa';

const TopNav = () => {
    const openSidebar = () => {
        document.body.classList.add('sidebar-open')
    }

    return (
        <div className='topnav'>
            <div className="sidebar-toggle" onClick={openSidebar}>
                <FaBars className='icons' />
            </div>
        </div>
    )
}

export default TopNav

