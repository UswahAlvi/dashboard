import PageNameContainer from '../Components/PageNameContainer';
import styles from './SideBar.module.css';

export default function SideBar() {
    const Names = [
        { name: "Dashboard", src: "/icons/dashboard" },
        { name: "Clients", src: "/icons/clients" },
        { name: "Proposals", src: "/icons/proposals" },
        { name: "Projects", src: "/icons/projects" },
        { name: "Team", src: "/icons/team" },
        { name: "Calendar", src: "/icons/calendar" },
        { name: "Report", src: "/icons/report" }
    ];

    return (
        <div className="d-flex flex-column bg-white h-100 pt-5 pe-3 justify-content-between" style={{ position: 'fixed', maxWidth: '200px' }} >
            <div className={`${styles.sidebar} `}>
                {Names.map(({ name, src }) => (
                    <PageNameContainer key={name} name={name} src={src} />
                ))}
            </div>
            <div>
                <div className='d-flex flex-row justify-content-around w-100 p-2'>
                    <img src="/icons/message.png" alt="Message" width='22px' height='21px' />
                    <img src="/icons/notification.png" alt="Notification" width='18px' height='22px' />
                    <img src="/icons/help.png" alt="Help" width='21px' height='21px' />
                </div>
                <div className='d-flex flex-row mt-5 mb-3'>
                    <img className='ms-3 position-relative' src='/icons/image.png' width='30px' height='30px' />
                    <img className='ms-2 position-absolute' src='/icons/image.png' width='30px' height='30px' />
                    <div className='d-flex flex-column ms-3' style={{ fontSize: '1rem' }}>
                        <span className='txt-clr' style={{ fontSize: '1rem' }}>Unknown</span>
                        <span style={{ fontSize: '0.9rem' }}>Unknown@gmail.com</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
