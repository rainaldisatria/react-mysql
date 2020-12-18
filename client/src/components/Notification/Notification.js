import ReactNotification, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

export const sendNotification = (message, type, duration) => {
    store.addNotification({
        message: message,
        type: type,
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: duration * 1000,
            pauseOnHover: true, 
        }
    })
}


export const Notification = () => {
    return <ReactNotification />
}

export default sendNotification;