import React, { useEffect, useState } from "react";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero/hero";
import Product from "./product/product";
import Top from "./TopBar/top";
import Nav from "./Navbar/nav";
import BASE_URL from "../Server/base_url";

const Home = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  const [top, setTop] = useState([]);
  const [vegetable, setVegetable] = useState([]);
  const [fruit, setFruit] = useState([]);
  const [flours, setFlours] = useState([]);
  const [masala, setMasala] = useState([]);
  const [rice, setRice] = useState([]);
  const [dal, setDal] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/signup");
      return;
    }

    // Fetch data from your backend API
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/product/view`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });
        const json = await response.json();
        let top = json.filter((item) => {
          return item.rating >= 4;
        });
        console.log(top);
        let veg = json.filter((item) => {
          return item.cat === "vegetable";
        });
        let fruit = json.filter((item) => {
          return item.cat === "fruit";
        });
        let masala = json.filter((item) => {
          return item.cat === "masala";
        });
        let rice = json.filter((item) => {
          return item.cat === "rice";
        });
        let dal = json.filter((item) => {
          return item.cat === "dal";
        });
        let flours = json.filter((item) => {
          return item.cat === "flours";
        });
        setTop(top);
        setFruit(fruit);
        setVegetable(veg);
        setMasala(masala);
        setRice(rice);
        setDal(dal);
        setFlours(flours);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    // Call fetchData function when component mounts
    fetchData();
  }, [token]); // Call useEffect when token changes

  const [searchData, setSearchData] = useState([]);

  return (
    <>
      {/* <Navbar /> */}
      <Nav setSearchData={setSearchData} />
      {searchData.length !== 0 && (
        <>
          <Top name={"Search Items"} />
          <Product data={searchData} />
        </>
      )}
      <Hero />

      {top.length > 0 && (
        <>
          <Top name={"Top Products"} />
          <Product data={top} />
        </>
      )}
      {vegetable.length > 0 && (
        <>
          <Top name={"Vegetables"} />
          <Product data={vegetable} />
        </>
      )}
      {fruit.length > 0 && (
        <>
          <Top name={"Fruits"} />
          <Product data={fruit} />
        </>
      )}
      {flours.length > 0 && (
        <>
          <Top name={"Flours"} />
          <Product data={flours} />
        </>
      )}
      {rice.length > 0 && (
        <>
          <Top name={"Rice"} />
          <Product data={rice} />
        </>
      )}
      {dal.length > 0 && (
        <>
          <Top name={"Dal"} />
          <Product data={dal} />
        </>
      )}
      {masala.length > 0 && (
        <>
          <Top name={"Masalas"} />
          <Product data={masala} />
        </>
      )}
    </>
  );
};

export default Home;
