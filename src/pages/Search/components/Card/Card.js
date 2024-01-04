import React from "react";
import * as Unicons from "@iconscout/react-unicons";
import "./Card.css";

const Card = ({ product }) => {
  const [isToggle, setIsToggle] = React.useState(false);
  const { id, title, description, price, image_url } = product;

  const descriptionPoints = description.split(";").map(item => item.trim()).slice(0, 9);
  console.log(descriptionPoints);

  function handleToggling() {
    setIsToggle(!isToggle);
  }

  let prop = [];

  for (const key in product) {
    if (["id", "title", "sub_category"].includes(key)) {
      continue;
    }
    if (key) {
      let name = key.split("_").join(" ").replace(key[0], key[0].toUpperCase());
      prop.push([name, product[key]]);
    }

  }
  return (
    <>
      <div className="card-body">
        <div className="card-img">
          <img src={image_url} alt={`Product ${id}`} className="product-image" />
        </div>

        <div className="card-info">


          {/* <div className="score">
          Id : {id} */}
          {/* <span>Vendor: {BRAND_NAME}</span> */}
          {/* {REVENUE && " | "}
        <span
          style={{
            display: REVENUE ? "inline" : "none",
          }}
        >
          Revenue: ₹ {REVENUE}
        </span> */}
          {/* </div> */}
          <div className="card-title">
            {title?.replace(/\[SEP\]/g, "").substring(0, 40).trim()}
          </div>

          <div className="card-description">
            {description?.replace(/[:;]/g, "").substring(0, 100).trim()}
          </div>

          <div className="card-description-hover hovered">
            <div className="product-details-hover">{title?.replace(/\[SEP\]/g, "").substring(0, 100).trim()}</div>
            <div className="product-description-hover">
              <ul>
                {descriptionPoints.map((point, index) => (
                  // Use index as key, but ensure each point is unique
                  <li className="list-item" key={`${point}-${index}`}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>


          <div className="card-price">
            {price ? `$${price}` : "Not Available"}
          </div>

          {/* <div className="other">
          Sub category : {category?.replace(/\[SEP\]/g, "")}
        </div> */}
          {/* <div className="other">Size : {size?.replace(/\[SEP\]/g, "")}</div> */}
          {/* {isToggle &&
          prop.map((item) => {
            return (
              <div>
                {item[0]} : {item[1]?.replace(/\[SEP\]/g, "")}
              </div>
            );
          })}
        {isToggle ? (
          <Unicons.UilAngleUp className="angle" onClick={handleToggling} />
        ) : (
          <Unicons.UilAngleDown className="angle" onClick={handleToggling} />
        )} */}
        </div>

      </div>
    </>
  );
};

export default Card;
