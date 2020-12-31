import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import { AuthContext } from "../../context/auth";

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      setActiveItem("home");
    } else {
      setActiveItem(pathname.substr(1));
    }
  }, [pathname]);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name={user.username}
        active
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item name="logout" active onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
};

export default MenuBar;
