import { useEffect } from "react";
import { useDispatch, useSelector } from "../../app/hooks";
import { reqEditVisit } from "../../features/visitStore/api";
import { VisitEditor } from "../../features/visitStore/index";
export default function VisitPage() {
  const { username, ssid } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reqEditVisit(username, ssid));

    return () => {};
  }, []);

  return <VisitEditor />;
}
