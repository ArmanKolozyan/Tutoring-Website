import { useEffect } from "react";
import { useLocation } from "react-router";

// this code is based on https://www.kindacode.com/article/react-router-dom-scroll-to-top-on-route-change/


/**
 * MOVES THE PAGE TO THE TOP WHEN REDIRECTING TO ANOTHER PAGE
 *  BECAUSE OTHERWISE IT REDIRECTS TO THE MIDDLE OF THE PAGE.
 */
const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

export default ScrollToTop;
