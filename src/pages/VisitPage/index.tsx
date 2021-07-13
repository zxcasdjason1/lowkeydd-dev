import { useEffect } from "react";
import { useDispatch, useSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/slice";
import { reqEditVisit } from "../../features/visitStore/api";
import { VisitEditor } from "../../features/visitStore/index";
export default function VisitPage() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const { username, ssid } = user;
    dispatch(reqEditVisit(username, ssid, []));
    return () => {};
  }, [dispatch, user]);

  return <VisitEditor />;
}
