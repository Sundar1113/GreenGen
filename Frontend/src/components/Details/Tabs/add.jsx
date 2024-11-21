import React from "react";
import "../details.css";

import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

function info(props) {
  const data = props.data;
  const veg =
    "https://upload.wikimedia.org/wikipedia/commons/b/b2/Veg_symbol.svg";
  return (
    <div className="tabContent">
      <div className="table-responsive">
        <table className="table table-bordered">
          <tbody>
            <tr class="stand-up">
              <th>Sold By</th>
              <td>
                <p>{data.owner}</p>
              </td>
            </tr>
            <tr class="folded-wo-wheels">
              <th>Product Name</th>
              <td>
                <p>{data.productName.toUpperCase()}</p>
              </td>
            </tr>
            <tr class="handle-height-ground-to-handle">
              <th>Product Category</th>
              <td>
                <p>{data.cat.toUpperCase()}</p>
              </td>
            </tr>
            <tr class="folded-w-wheels">
              <th>Product Rating</th>
              {data.rating === 0 ? <p>Not Rating Yet</p> : <p>{data.rating}</p>}
            </tr>
            <tr class="door-pass-through">
              <th>Food Type</th>
              <td>
                <div className="veg_img">
                  <img src={veg + "?im=Resize=(100,100)"} alt="" />
                </div>
              </td>
            </tr>
            <tr class="frame">
              <th>Available Stock</th>
              <td>
                {data.CurQuantity >= 2 ? (
                  <p>{data.CurQuantity}KG</p>
                ) : (
                  <p>Out Of Stock</p>
                )}
              </td>
            </tr>
            <tr class="weight-wo-wheels">
              <th>Country Of Origin</th>
              <td>
                <p>India</p>
              </td>
            </tr>
            <tr class="weight-capacity">
              <th>State Of Origin</th>
              <td>
                <p>{data.state}</p>
              </td>
            </tr>
            <tr class="width">
              <th>City Of Origin</th>
              <td>
                <p>{data.city}</p>
              </td>
            </tr>
            {/* <tr class="width">
              <th>Pin Code</th>
              <td>
                <p>{data.pin}</p>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default info;
