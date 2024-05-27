import { memo } from "react";

import PropTypes from "prop-types";
import { InputNumber as InputnumberAnt, ConfigProvider } from "antd";

import { defaultInput } from "@/config/theme/input";

import "./input.scss";

const InputNumber = ({ className, ...props }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          InputNumber: defaultInput,
        },
      }}
    >
      <InputnumberAnt className={className} {...props} />
    </ConfigProvider>
  );
};

InputNumber.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  isSearch: PropTypes.bool,
  isTextArea: PropTypes.bool,
};

InputNumber.defaultProps = {
  placeholder: "",
  onChange: () => {},
  className: "",
  isSearch: false,
};

export default memo(InputNumber);
