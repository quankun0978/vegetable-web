import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { PATH } from "@/routes/path";

const PrivateRoute = ({ component }) => {
  let refresh_token = localStorage.getItem("rf_token");
  let access_token = Cookies.get("a_token");

  if (refresh_token && access_token) {
    return <Navigate to={PATH.TRANG_CHU} replace />;
  }
  return <>{component && component}</>;
};

PrivateRoute.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  component: PropTypes.element,
};

export default PrivateRoute;
