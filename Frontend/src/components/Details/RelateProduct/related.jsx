import React from "react";

const Related = (props) => {
  const data = props.data;
  return <div>Related Products</div>;
};

export default Related;

/* <div className="relatedProducts homeProductsRow2  pt-5 pb-4">
            <h2 class="hd mb-0 mt-0">Related products</h2>
            <br className="res-hide" />
            <Slider {...related} className="prodSlider">
              {relatedProducts.length !== 0 &&
                relatedProducts.map((product, index) => {
                  return (
                    <div className="item" key={index}>
                      <Product tag={product.type} item={product} />
                    </div>
                  );
                })}
            </Slider>
          </div> */
