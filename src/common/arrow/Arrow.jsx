import PropTypes from "prop-types";

import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

import "./arrow.scss";

export const ArrowRight = ({ onClick, ...rest }) => {
  // onMove means if dragging or swiping in progress.
  const { isBandner } = rest;
  return isBandner ? (
    <button className="arrow-right-bandner" onClick={() => onClick()}>
      <MdOutlineArrowForwardIos
        size={20}
        color="var(--color-gray)"
        className="slider-icon"
      />
    </button>
  ) : (
    <button className="arrow-right" onClick={() => onClick()}>
      <MdOutlineArrowForwardIos
        size={20}
        color="var(--color-black-600)"
        className="slider-icon"
      />
    </button>
  );
};
export const ArrowLeft = ({ onClick, ...rest }) => {
  // onMove means if dragging or swiping in progress.
  const { isBandner } = rest;

  return isBandner ? (
    <button className="arrow-left-bandner" onClick={() => onClick()}>
      <MdOutlineArrowBackIos
        size={20}
        color="var(--color-gray)"
        className="slider-icon"
      />
    </button>
  ) : (
    <button className="arrow-left" onClick={() => onClick()}>
      <MdOutlineArrowBackIos
        size={20}
        color="rgb(0.67,0.67,0.67)"
        className="slider-icon"
      />
    </button>
  );
};
ArrowLeft.propTypes = {
  onClick: PropTypes.func,
};
ArrowRight.propTypes = {
  onClick: PropTypes.func,
};
