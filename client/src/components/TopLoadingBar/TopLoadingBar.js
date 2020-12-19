import React, { useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';

var ref = null;

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
    ref = useRef(null)
    
    return (
        <>
            <LoadingBar color='#f11946' ref={ref} />
        </>
    )
}

export default TopLoadingBar;
