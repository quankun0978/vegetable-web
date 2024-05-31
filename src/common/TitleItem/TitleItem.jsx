import { memo } from "react";

import PropTypes from "prop-types";
import "./title.scss";
const TitleItem = ({ title, colorItem, color, isFull }) => {
  const titleStyle = {
    color: color,
    lineHeight: "1.05",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    fontWeight: 700,
    display: "inline-block",
    fontSize:"20px"
  };

  const afterStyle = {
    content: "",
    display: "block",
    width: isFull ? "30px" : "auto",
    margin: "0.4em 0 0.8em",
    height: "3px",
    backgroundColor: colorItem ? colorItem : "gainsboro", // Sử dụng biến colorTitle từ props
  };
  return (
    <h3 style={titleStyle} className="sider-title">
      {title}

      <span style={afterStyle} />
    </h3>
  );
};

TitleItem.propTypes = {
  title: PropTypes.string,
  colorItem: PropTypes.string,
  color: PropTypes.string,
};

export default memo(TitleItem);
