import { memo } from "react";

import PropTypes from "prop-types";

import { Button as ButtonAnt, ConfigProvider } from "antd";
import { defaultButton } from "@/config/theme/button";

import "./button.scss";

const Button = ({ text, onClick, icon, className, ...props }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: defaultButton,
        },
      }}
    >
      <ButtonAnt onClick={onClick} className={className} icon={icon} {...props}>
        {text}
      </ButtonAnt>
    </ConfigProvider>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.element,
  className: PropTypes.string,
};

Button.defaultProps = {
  text: "",
  onClick: () => {},
  icon: null,
  className: "btn-default",
};

export default memo(Button);
