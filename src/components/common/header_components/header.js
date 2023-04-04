import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import SearchHeader from "./searchHeader";
// import Notification from "./notification";
import UserMenu from "./user-menu";
// import Language from "./language";
import {
  AlignLeft,
  // Maximize2,
  // Bell,
  // MessageSquare,
  //   MoreHorizontal,
} from "react-feather";

//images
import logo from "../../../assets/images/logo.png";
import { useContext } from "react";
import AdminContext from "../../context/adminContgext";

const Header = () => {
  const { sidebar, setSidebar } = useContext(AdminContext);
  // const [rightSidebar, setRightSidebar] = useState(true);
  //   const [navMenus, setNavMenus] = useState(false);

  //   const toggle = () => {
  //     setNavMenus((prevState) => ({
  //       navMenus: !prevState.navMenus,
  //     }));
  //   };

  // const showRightSidebar = () => {
  // 	if (rightSidebar) {
  // 		setRightSidebar(false);
  // 		document.querySelector(".right-sidebar").classList.add("show");
  // 	} else {
  // 		setRightSidebar(true);
  // 		document.querySelector(".right-sidebar").classList.remove("show");
  // 	}
  // };
  // const goFull = () => {
  // 	if (
  // 		(document.fullScreenElement && document.fullScreenElement !== null) ||
  // 		(!document.mozFullScreen && !document.webkitIsFullScreen)
  // 	) {
  // 		if (document.documentElement.requestFullScreen) {
  // 			document.documentElement.requestFullScreen();
  // 		} else if (document.documentElement.mozRequestFullScreen) {
  // 			document.documentElement.mozRequestFullScreen();
  // 		} else if (document.documentElement.webkitRequestFullScreen) {
  // 			document.documentElement.webkitRequestFullScreen(
  // 				Element.ALLOW_KEYBOARD_INPUT
  // 			);
  // 		}
  // 	} else {
  // 		if (document.cancelFullScreen) {
  // 			document.cancelFullScreen();
  // 		} else if (document.mozCancelFullScreen) {
  // 			document.mozCancelFullScreen();
  // 		} else if (document.webkitCancelFullScreen) {
  // 			document.webkitCancelFullScreen();
  // 		}
  // 	}
  // };

  const openCloseSidebar = () => {
    if (!sidebar) {
      setSidebar(!sidebar);
      //   document.querySelector(".page-main-header").classList.add("open");
      //   document.querySelector(".page-sidebar").classList.add("open");
    } else {
      setSidebar(!sidebar);
      //   document.querySelector(".page-main-header").classList.remove("open");
      //   document.querySelector(".page-sidebar").classList.remove("open");
    }
  };

  return (
    <Fragment>
      {/* open */}
      <div className={`page-main-header `}>
        <div className="main-header-right row">
          <div className="main-header-left d-lg-none">
            <div className="logo-wrapper">
              <Link to="/dashboard">
                <img className="blur-up lazyloaded" src={logo} alt="" />
              </Link>
            </div>
          </div>
          <dnaviv className="mobile-sidebar">
            <div className="media-body text-right switch-sm">
              <label className="switch">
                <span
                  style={{ cursor: "pointer" }}
                  role="presentation"
                  onClick={openCloseSidebar}
                >
                  <AlignLeft />
                </span>
              </label>
            </div>
          </dnaviv>
          <div className="nav-right col">
            <ul className={"nav-menus "}>
              {/* <li>
								<SearchHeader />
							</li> */}
              {/* <li>
								<a onClick={goFull} className="text-dark" href="#javaScript">
									<Maximize2 />
								</a>
							</li> */}
              <UserMenu />
            </ul>
            {/* <div
              className="d-lg-none mobile-toggle pull-right"
              onClick={() => toggle()}
            >
              <MoreHorizontal />
            </div> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
