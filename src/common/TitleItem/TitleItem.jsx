import { memo } from "react";

import PropTypes from "prop-types";
import "./title.scss";
const TitleItem = ({ title }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-6 title-item">
        <span className="title-item-child">{title}</span>
      </h3>
    </div>
  );
};

TitleItem.propTypes = {
  title: PropTypes.string,
};

export default memo(TitleItem);
