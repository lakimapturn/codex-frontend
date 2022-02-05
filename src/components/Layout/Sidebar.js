/*eslint-disable*/
import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Nav } from "reactstrap";

import PerfectScrollbar from "perfect-scrollbar";

import logo from "../../assets/img/logo.png";
import { useDispatch } from "react-redux";
import { logoutUser } from "store/actions/userActions";
import { useHistory } from "react-router-dom";

var ps;

function Sidebar(props) {
  const sidebar = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  const logout = async () => {
    await dispatch(logoutUser());
    await history.push("/authenticate");
  };

  return (
    <div className="sidebar" data-color="yellow">
      <div className="logo">
        <a className="simple-text logo-mini">
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </a>
        <a className="simple-text logo-normal">PAWS</a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            if (prop.redirect) return null;
            return (
              <li
                className={
                  activeRoute(prop.layout + prop.path) +
                  (prop.pro ? " active active-pro" : "")
                }
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  <div style={{ display: "flex" }}>
                    {prop.icon}
                    <p style={{ paddingLeft: 15 }}>{prop.name}</p>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </Nav>
        <div style={{ textAlign: "center" }}>
          <Button
            color="danger"
            style={{ width: "90%", alignItems: "center" }}
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
