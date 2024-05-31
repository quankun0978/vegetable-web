import { memo } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import { PATH } from "@/routes/path";
import "./sider.scss";

const ItemSider = ({
  title,
  item,
  color,
  colorItem,
  isparagraph,
  isImage,
  paragraph,
  isSale,
}) => {
  const navigate = useNavigate();
  const titleStyle = {
    color: color,
    lineHeight: "1.05",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    fontWeight: 700,
  };

  const afterStyle = {
    content: "",
    display: "block",
    width: "30px",
    margin: "0.4em 0 0.8em",
    height: "3px",
    backgroundColor: colorItem, // Sử dụng biến colorTitle từ props
  };
  return (
    <div className="sider pe-2">
      <h3 style={titleStyle} className="sider-title">
        {title}

        <span style={afterStyle}></span>
      </h3>
      {isparagraph ? (
        <p style={{ color: color, padding: "6px 0" }}>{paragraph}</p>
      ) : (
        <ul className="sider-menu">
          {item &&
            item.length > 0 &&
            item.map((ItemSider, index) => {
              return (
                <div key={index}>
                  {isImage ? (
                    <div className="items-center flex gap-2 mb-2 sider-menu-item-image pb-2">
                      <img loading="lazy"
                        style={{ height: "60px", width: "60px" }}
                        src={
                          ItemSider && ItemSider.imgPath && ItemSider.imgPath
                        }
                      />
                      <div className="flex gap-1 flex-col">
                        <p
                          className="sider-name"
                          onClick={() =>
                            navigate(
                              `${PATH.CHI_TIET_SAN_PHAM}/${ItemSider.product_id}`
                            )
                          }
                        >
                          {ItemSider && ItemSider.name && ItemSider.name}
                        </p>
                        {isSale ? (
                          <div>
                            <p className={`product_sale relative sider-price`}>
                              {ItemSider && ItemSider.price && ItemSider.price}đ
                            </p>

                            <p className="font-bold">
                              {ItemSider &&
                                ItemSider.price_sale &&
                                ItemSider.price_sale}
                              đ
                            </p>
                          </div>
                        ) : (
                          <p className="sider-price">
                            {ItemSider && ItemSider.price && ItemSider.price}đ
                          </p>
                        )}
                      </div>
                    </div>
                  ) : !ItemSider.link ? (
                    <li
                      onClick={ItemSider.onClick && ItemSider.onClick}
                      style={{ color: color }}
                      className="sider-menu-item flex gap-2 items-center "
                    >
                      {ItemSider.icon && ItemSider.icon}{" "}
                      {ItemSider && ItemSider.label && ItemSider.label}
                    </li>
                  ) : (
                    <a
                      href={ItemSider.link}
                      style={{ color: color }}
                      className="sider-menu-item flex gap-2 items-center"
                    >
                      {ItemSider.icon && ItemSider.icon}{" "}
                      {ItemSider && ItemSider.label && ItemSider.label}
                    </a>
                  )}
                </div>
              );
            })}
        </ul>
      )}
    </div>
  );
};

ItemSider.propTypes = {
  item: PropTypes.array,
  colorItem: PropTypes.string,
  title: PropTypes.string,
  isImage: PropTypes.bool,
  isparagraph: PropTypes.bool,
  paragraph: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.element,
  isSale: PropTypes.bool,
};

export default memo(ItemSider);
