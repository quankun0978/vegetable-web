import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { PATH } from "@/routes/path";

const PrivateRoute = ({ component, isLogin, isShow }) => {
  let refresh_token = localStorage.getItem("rf_token");
  let access_token = Cookies.get("a_token");

  if (!isLogin && refresh_token && access_token) {
    return <Navigate to={PATH.TRANG_CHU} replace />;
  }
  if (!isShow && isLogin && !refresh_token && !access_token) {
    return <Navigate to={PATH.TRANG_CHU} replace />;
  }
  if (isShow && !refresh_token && !access_token) {
    return (
      <div className="flex justify-center pt-5 py-28">Vui lòng đăng nhập</div>
    );
  }

  return <>{component && component}</>;
};

PrivateRoute.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  component: PropTypes.element,
  isLogin: PropTypes.bool,
  isShow: PropTypes.bool,
};

export default PrivateRoute;
