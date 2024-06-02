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
  onChange: PropTypes.func,
  className: PropTypes.string,
};

InputNumber.defaultProps = {
  className: "",
};

export default memo(InputNumber);
