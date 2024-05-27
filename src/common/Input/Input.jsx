import { memo } from "react";

import PropTypes from "prop-types";
import { Input as InpuAnt, ConfigProvider } from "antd";

import { defaultInput } from "@/config/theme/input";

import "./input.scss";

const Input = ({
  isPassword,
  isTextArea,
  isSearch,
  placeholder,
  className,
  ...props
}) => {
  if (isTextArea) {
    return (
      <ConfigProvider
        theme={{
          components: {
            Input: defaultInput,
          },
        }}
      >
        <InpuAnt.TextArea
          style={{ height: 100 }}
          placeholder={placeholder}
          className={className}
          {...props}
        />
      </ConfigProvider>
    );
  }
  if (isPassword) {
    return (
      <ConfigProvider
        theme={{
          components: {
            Input: defaultInput,
          },
        }}
      >
        <InpuAnt.Password
          placeholder={placeholder}
          className={className}
          {...props}
        />
      </ConfigProvider>
    );
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: defaultInput,
        },
      }}
    >
      {isSearch ? (
        <InpuAnt.Search
          placeholder={placeholder}
          className={className}
          {...props}
        />
      ) : (
        <InpuAnt placeholder={placeholder} className={className} {...props} />
      )}
    </ConfigProvider>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  isSearch: PropTypes.bool,
  isTextArea: PropTypes.bool,
  isPassword: PropTypes.bool,
};

Input.defaultProps = {
  placeholder: "",
  onChange: () => {},
  className: "",
  isSearch: false,
};

export default memo(Input);
