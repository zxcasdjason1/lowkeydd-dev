import { useState } from "react";
import { Link } from "react-router-dom";
import * as ai from "react-icons/ai";
import styled from "./index.module.css";

function Navbar() {
  const [isEnable, setIsEnable] = useState(false);

  const showMenu = () => {
    setIsEnable(!isEnable);
  };

  return (
    <div className={styled.nav}>
      <div className={styled.navbar}>
        <Link to="#" className={styled.toogle}>
          <ai.AiOutlineMenu onClick={showMenu} />
        </Link>
      </div>
      <div className={styled.logo}>LowkeyDD</div>
      <nav className={isEnable ? `${styled.menu} ${styled.active}` : `${styled.menu}`} >
        <ul onClick={showMenu}> 
          <li className={styled.navbar}>
            <Link to="#" className={styled.toogle}>
              <ai.AiOutlineClose onClick={showMenu} />
            </Link>
          </li>
          {SiderbarArray.map((item) => {
            return <MenuItem key={`MenuItem_${item.title}`} {...item} />;
          })}
        </ul>
      </nav>
    </div>
  );
}

function MenuItem(props: MenuItemProps) {
  const { title, path, icon } = props;
  return (
    <li className={styled.menuItem}>
      <Link to={path} className={styled.menuItemLink}>
        {icon}
        <p>{title}</p>
      </Link>
    </li>
  );
}

export default Navbar;

type MenuItemProps = {
  title: string;
  path: string;
  icon: any;
};

const SiderbarArray: MenuItemProps[] = [
  {
    title: "瀏覽",
    path: "/channels/",
    icon: <ai.AiOutlineHeart />,
  },
  {
    title: "影院",
    path: "/theater/",
    icon: <ai.AiOutlineVideoCamera />,
  },
  {
    title: "收藏",
    path: "/visit/",
    icon: <ai.AiOutlineBook />,
  },
  {
    title: "會員",
    path: "/login/",
    icon: <ai.AiOutlineUser />,
  },
];
