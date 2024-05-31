import { memo } from "react";

import PropTypes from "prop-types";

import { FloatButton as FloatButtonnAnt, ConfigProvider } from "antd";

import { IoIosArrowUp } from "react-icons/io";
import { floatButton } from "@/config/theme/button";

const Floatbutton = ({ icon, className, ...props }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          FloatButton: floatButton,
        },
      }}
    >
      <FloatButtonnAnt.BackTop
        icon={<IoIosArrowUp si color="#fff" />}
        className={className}
        {...props}
      />
    </ConfigProvider>
  );
};

Floatbutton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.element,
  className: PropTypes.string,
};

Floatbutton.defaultProps = {
  text: "",
  onClick: () => {},
  icon: null,
  className:
    "hover:cursor-pointer fixed bottom-6 right-24  bg-lime-600 w-12 h-12",
};

export default memo(Floatbutton);
