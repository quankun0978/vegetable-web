import { memo } from "react";

import PropTypes from "prop-types";
import { Table as TableAnt } from "antd";

import "./table.scss";

const Table = ({ data, ...props }) => {
  return <TableAnt dataSource={data} className="table-custom" {...props} />;
};

Table.propTypes = {
  data: PropTypes.array,
};

Table.defaultProps = {
  array: [],
};

export default memo(Table);
