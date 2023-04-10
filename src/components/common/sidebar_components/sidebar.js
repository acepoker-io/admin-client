import React, { Fragment, useEffect, useState } from "react";
import UserPanel from "./user-panel";
import { Link } from "react-router-dom";
import { MENUITEMS } from "../../../constants/menu";

// image import
import logo from "../../../assets/images/Final Logo-01.jpg";
import { useContext } from "react";
import AdminContext from "../../context/adminContgext";
import { useRef } from "react";

const Sidebar = () => {
  const displayWidth = window.innerWidth;
  const { sidebar, setSidebar } = useContext(AdminContext);
  const [mainmenu, setMainMenu] = useState(MENUITEMS);
  // const [sidebar, setSidebar] = useState(displayWidth > 991 ? true : false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          displayWidth < 991
        ) {
          setSidebar(true);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useEffect(() => {
    const currentUrl = window.location.pathname;
    mainmenu.map((items) => {
      mainMenu.filter((Items) => {
        if (Items.path === currentUrl) setNavActive(Items);
        if (!Items.children) return false;
        Items.children.filter((subItems) => {
          if (subItems.path === currentUrl) setNavActive(subItems);
          if (!subItems.children) return false;
          subItems.children.filter((subSubItems) => {
            if (subSubItems.path === currentUrl) {
              setNavActive(subSubItems);
              return true;
            } else {
              return false;
            }
          });
          return subItems;
        });
        return Items;
      });
      return items;
    });
    return () => {
      setMainMenu(MENUITEMS);
    };
  });

  const openCloseSidebar = () => {
    if (sidebar) {
      setSidebar(false);
      // document.querySelector(".page-main-header").classList.add("open");
      // document.querySelector(".page-sidebar").classList.add("open");
    } else {
      setSidebar(true);
      // document.querySelector(".page-main-header").classList.remove("open");
      // document.querySelector(".page-sidebar").classList.remove("open");
    }
  };
  const setNavActive = (item) => {
    if (!item.children && displayWidth < 991) {
      openCloseSidebar();
    }

    console.log("setNavActive executed");
    console.log("item ==>", item);
    if (item?.title?.toLowerCase().trim() === "logout") {
      localStorage.clear();
      document.cookie = null;
    }
    MENUITEMS.filter((menuItem) => {
      if (menuItem !== item) menuItem.active = false;
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true;
      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems !== item) {
            submenuItems.active = false;
          }
          if (submenuItems.children) {
            submenuItems.children.map(
              (childItem) => (childItem.active = false)
            );
            if (submenuItems.children.includes(item)) {
              submenuItems.active = true;
              menuItem.active = true;
            }
          }
          return false;
        });
      }
      return false;
    });
    item.active = !item.active;
    setMainMenu(MENUITEMS);
  };

  const mainMenu = mainmenu.map((menuItem, i) => (
    <li className={`${menuItem.active ? "active" : ""}`} key={i}>
      {menuItem.sidebartitle ? (
        <div className='sidebar-title'>{menuItem.sidebartitle}</div>
      ) : (
        ""
      )}
      {menuItem.type === "sub" ? (
        <a
          className='sidebar-header '
          href='#javaScript'
          onClick={() => setNavActive(menuItem)}>
          <div className='links'>
            <menuItem.icon />
            <span>{menuItem.title}</span>
          </div>
          <i className='fa fa-angle-right pull-right'></i>
        </a>
      ) : (
        ""
      )}
      {menuItem.type === "link" ? (
        <Link
          to={`${process.env.PUBLIC_URL}${menuItem.path}`}
          className={`sidebar-header ${menuItem.active ? "active" : ""}`}
          onClick={() => setNavActive(menuItem)}>
          <div className='links'>
            <menuItem.icon />
            <span>{menuItem.title}</span>
          </div>
          {menuItem.children ? (
            <i className='fa fa-angle-right pull-right'></i>
          ) : (
            ""
          )}
        </Link>
      ) : (
        ""
      )}
      {menuItem.children ? (
        <ul
          className={`sidebar-submenu ${menuItem.active ? "menu-open" : ""}`}
          style={
            menuItem.active
              ? { opacity: 1, transition: "opacity 500ms ease-in" }
              : {}
          }>
          {menuItem.children.map((childrenItem, index) => (
            <li
              key={index}
              className={
                childrenItem.children
                  ? childrenItem.active
                    ? "active"
                    : ""
                  : ""
              }>
              {childrenItem.type === "sub" ? (
                <a
                  href='#javaScript'
                  onClick={() => setNavActive(childrenItem)}>
                  <i className='fa fa-circle'></i>
                  {childrenItem.title}{" "}
                  <i className='fa fa-angle-right pull-right'></i>
                </a>
              ) : (
                ""
              )}

              {childrenItem.type === "link" ? (
                <Link
                  to={`${process.env.PUBLIC_URL}${childrenItem.path}`}
                  className={childrenItem.active ? "active" : ""}
                  onClick={() => setNavActive(childrenItem)}>
                  <i className='fa fa-circle'></i>
                  {childrenItem.title}{" "}
                </Link>
              ) : (
                ""
              )}
              {childrenItem.children ? (
                <ul
                  className={`sidebar-submenu ${
                    childrenItem.active ? "menu-open" : "active"
                  }`}>
                  {childrenItem.children.map((childrenSubItem, key) => (
                    <li
                      className={childrenSubItem.active ? "active" : ""}
                      key={key}>
                      {childrenSubItem.type === "link" ? (
                        <Link
                          to={`${process.env.PUBLIC_URL}${childrenSubItem.path}`}
                          className={childrenSubItem.active ? "active" : ""}
                          onClick={() => setNavActive(childrenSubItem)}>
                          <i className='fa fa-circle'></i>
                          {childrenSubItem.title}
                        </Link>
                      ) : (
                        ""
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </li>
  ));

  return (
    <Fragment>
      <div className={`page-sidebar `} ref={wrapperRef}>
        <div className='main-header-left d-none d-lg-block'>
          <div className='logo-wrapper'>
            <Link to={`${process.env.PUBLIC_URL}/dashboard`}>
              <img className='blur-up lazyloaded' src={logo} alt='' />
            </Link>
          </div>
        </div>
        <div className='sidebar'>
          <UserPanel />
          <ul className='sidebar-menu'>{mainMenu}</ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
