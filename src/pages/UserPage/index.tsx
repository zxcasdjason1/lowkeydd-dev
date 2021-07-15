import { useEffect } from "react";
import { useDispatch } from "../../app/hooks";
import { setMsg } from "../../features/user/slice";
import { Login, Register } from "../../features/user";

export default function UserPage(props: { pageName: string }) {
  const pageName = props.pageName;
  const dispatch = useDispatch();
  dispatch(setMsg(""));
  return (
    <>
      {(function (): JSX.Element {
        switch (pageName) {
          case "login":
            return <Login />;
          case "register":
            return <Register />;
          default:
            return <Login />;
        }
      })()}
    </>
  );
}
