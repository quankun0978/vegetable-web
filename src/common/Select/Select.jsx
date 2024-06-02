import { memo } from "react";

import PropTypes from "prop-types";
import { Select as SelectAnt, ConfigProvider } from "antd";

import { defaultSelect } from "@/config/theme/select";

const Select = ({ placeholder, onChange, className, ...props }) => {
  return (
    <ConfigProvider
      theme={{
        token: defaultSelect,
        components: {
          Select: defaultSelect,
        },
      }}
    >
      <SelectAnt
        placeholder={placeholder}
        onChange={onChange}
        className={className}
        {...props}
      />
    </ConfigProvider>
  );
};

Select.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

Select.defaultProps = {
  placeholder: "",
  onChange: () => {},
  className: "",
};

export default memo(Select);
