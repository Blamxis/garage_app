import './topnav.scss'
import { FaBars } from 'react-icons/fa'; // Importez l'icône FaBars de react-icons/fa

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

