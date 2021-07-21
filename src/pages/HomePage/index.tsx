import { useEffect } from 'react'
import { history } from '../..';
import { useSelector } from '../../app/hooks';
import { selectUser } from '../../features/user/slice';


export default function HomePage() {
    const user = useSelector(selectUser);

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
