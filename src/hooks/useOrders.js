import { useEffect, useState } from "react";

const useOrders = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch('https://event-horizon-8f3s.onrender.com/orders')
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [orders])

    return [orders, setOrders];
}
export default useOrders;