import styled from "./index.module.css";
import * as ai from "react-icons/ai";
import { useState } from "react";
export default function Navibar() {


  const [isActive, setIsActive] = useState(false)
  const showMenu=()=>{
    setIsActive(!isActive)
  }
  return (
    <div className={styled.navbar}>
      <div className={isActive? `${styled.toogle} ${styled.hide}`:`${styled.toogle}`} onClick={showMenu}>
        <ai.AiOutlineMenu />
      </div> 
      <div className={isActive? `${styled.toogle}`:`${styled.toogle} ${styled.hide}`} onClick={showMenu}>
        <ai.AiOutlineClose />
      </div>
      <div className={styled.logo}>LowkeyDD</div>
      <ul className={isActive? `${styled.menu} ${styled.active}`:`${styled.menu}`}>
        <li className={styled.menuitem}>
          <a href="#">Let's dd</a>
        </li>
        <li className={styled.menuitem}>
          <a href="#">影 院 </a>
        </li> 
        <li className={styled.menuitem}>
          <a href="#">會 員 </a>
        </li>
      </ul>
    </div>
  );
}
