import React, { useEffect } from 'react'
import { history } from '../..';
import { useSelector } from '../../app/hooks';


export default function HomePage() {

    const user = useSelector((state) => state.user);

    useEffect(() => {
    const { ssid, username } = user;
    console.log({ ssid });
    if (ssid !== "" && username !== "") {
        history.push({ pathname: "/channels" });
    } else{
        history.push({ pathname: "/login" });
    }
    return () => {};
  }, [user]);

    return (
        <div>
            Home
        </div>
    )
}
