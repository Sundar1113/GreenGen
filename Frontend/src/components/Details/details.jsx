import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import View from "./overView/view.jsx";
import Tabs from "./Tabs/Tab.jsx";
import Related from "./RelateProduct/related.jsx";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./details.css";
import BASE_URL from "../../Server/base_url";

const DetailsPage = () => {
  const location = useLocation();
  const [data, setData] = useState(null); // Initialize data state with null or an empty object/array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/product/details`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            id: location.state.id,
          }),
        });
        if (response.ok) {
          const json = await response.json();
          setData(json.details);
          console.log(json.details);
        } else {
          console.error("Error fetching product details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching product details:", error.message);
      }
    };

    // Call fetchData function when component mounts
    fetchData();
  }, [location.state.id]); // Add location.state.id to the dependency array

  return (
    <section className="detailsPage mb-5">
      <div className="container detailsContainer pt-3 pb-3">
        {data ? (
          <>
            {/* OverView Of the Product */}
            <View data={data} />
            <br />
            {/* Tabs */}
            <Tabs data={data} />
            {/* Related Product */}
            <Related data={data} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
};

export default DetailsPage;
