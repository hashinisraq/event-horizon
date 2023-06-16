import { useEffect, useState } from "react";

const useUsers = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('https://event-horizon-8f3s.onrender.com/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [users])

    return [users, setUsers];
}
export default useUsers;