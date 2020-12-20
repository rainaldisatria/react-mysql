import React, { useEffect, useState } from 'react'
import ServerAPI from '../../Axios/ServerAPI';
import { useSelector } from 'react-redux';

const Cart = () => { 
    const username = useSelector(store => store.username);
    const [Carts, setCarts] = useState();

    const fetchCart = () => {
        ServerAPI.fetchCart(username)
            .then(res => { 
                setCarts(res.data);
            })
    }

    useEffect(() => {
        fetchCart();
    }, [username]);

    return (
        <div>
            This is cart
        </div>
    )
}

export default Cart;