import React, { useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';

export const continuousStart = () => {
    ref.current.continuousStart();
}

export const complete = () => {
    ref.current.complete();
}

export const staticStart = () => {
    ref.current.staticStart();
}

export const TopLoadingBar = () => { 
    const ref = useRef(null)
    
    return (
        <>
            <LoadingBar color='#f11946' ref={ref} />
        </>
    )
}

export default TopLoadingBar;
