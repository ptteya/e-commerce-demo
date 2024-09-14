import { useState } from "react";

export const usePopup = (timeout = 3000) => {
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');

    const triggerPopup = (newMessage) => {
        setMessage(newMessage);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, timeout);
    }

    return {
        showPopup,
        message,
        triggerPopup
    };
};