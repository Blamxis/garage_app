import { FaAd, FaCar, FaTrademark, FaCogs, FaEnvelopeOpenText, FaUserCheck, FaCalculator } from 'react-icons/fa';

const sidebarNav = [
    {
        link: '/employee/dashboard/annonces',
        section: 'annonces',
        icon: <FaAd className='icons'/>,
        text: 'Annonces'
    },
    {
        link: '/employee/dashboard/voitures',
        section: 'voitures',
        icon: <FaCar className='icons'/>,
        text: 'Voitures'
    },
    {
        link: '/employee/dashboard/marques',
        section: 'marques',
        icon: <FaTrademark className='icons'/>,
        text: 'Marques'
    },
    {
        link: '/employee/dashboard/modeles',
        section: 'modeles',
        icon: <FaCogs className='icons'/>,
        text: 'Modèles'
    },
    {
        link: '/employee/dashboard/options',
        section: 'options',
        icon: <FaCalculator className='icons'/>,
        text: 'Options'
    },
    {
        link: '/employee/dashboard/messages',
        section: 'messages',
        icon: <FaEnvelopeOpenText className='icons'/>,
        text: 'Messages'
    },
    {
        link: '/employee/dashboard/avis-clients',
        section: 'avis-clients',
        icon: <FaUserCheck className='icons'/>,
        text: 'Avis'
    }
];

export default sidebarNav;
