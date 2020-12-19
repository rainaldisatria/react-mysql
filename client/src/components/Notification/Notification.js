import React from 'react';
import { ToastContainer, toast, Slide, Zoom, Flip, Bounce, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

export const sendNotification = (message, type, duration, position='top-center') => {
    toast.dismiss();

    const config = {
        autoClose: duration * 1000,
        position: position,
        toastId: '123',
    }

    switch (type) {
        case 'error':
            toast.error(message, config)
            break;
        case 'success':
            toast.success(message, config)
            break;
        case 'info':
            toast.info(message, config)
            break;
    } 
}

const myZoom = cssTransition({
    enter: 'zoomIn',
    exit: 'zoomOut',
    duration: [500, 150],
    collapse: false,
});

export const Notification = () => {
    return (
        <ToastContainer
            style={{ textAlign: 'center' }}
            position="top-center"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={myZoom}
        />
    )
}

export default sendNotification;