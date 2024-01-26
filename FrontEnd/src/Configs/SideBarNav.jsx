import { FaUserCircle, FaAd, FaServicestack, FaCar, FaTrademark, FaCogs, FaEnvelopeOpenText, FaUserCheck, FaBusinessTime, FaCalculator } from 'react-icons/fa';

const sidebarNav = [
    {
        link: '/admin/dashboard/users',
        section: 'users',
        icon: <FaUserCircle className='icons'/>,
        text: 'Users'
    },
    {
        link: '/admin/dashboard/annonces',
        section: 'annonces',
        icon: <FaAd className='icons'/>,
        text: 'Annonces'
    },
    {
        link: '/admin/dashboard/services',
        section: 'services',
        icon: <FaServicestack className='icons'/>,
        text: 'Services'
    },
    {
        link: '/admin/dashboard/voitures',
        section: 'voitures',
        icon: <FaCar className='icons'/>,
        text: 'Voitures'
    },
    {
        link: '/admin/dashboard/marques',
        section: 'marques',
        icon: <FaTrademark className='icons'/>,
        text: 'Marques'
    },
    {
        link: '/admin/dashboard/modeles',
        section: 'modeles',
        icon: <FaCogs className='icons'/>,
        text: 'Modèles'
    },
    {
        link: '/admin/dashboard/options',
        section: 'options',
        icon: <FaCalculator className='icons'/>,
        text: 'Options'
    },
    {
        link: '/admin/dashboard/messages',
        section: 'messages',
        icon: <FaEnvelopeOpenText className='icons'/>,
        text: 'Messages'
    },
    {
        link: '/admin/dashboard/avis-clients',
        section: 'avis-clients',
        icon: <FaUserCheck className='icons'/>,
        text: 'Avis'
    },
    {
        link: '/admin/dashboard/horaires-garage',
        section: 'horaires-garage',
        icon: <FaBusinessTime className='icons'/>,
        text: 'Horaires'
    },
];

export default sidebarNav;
