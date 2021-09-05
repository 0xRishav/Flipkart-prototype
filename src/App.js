import logo from "./logo.svg";
import "./App.css";
import jsonProducts from "./products.json";
import { useEffect, useReducer, useState } from "react";

function App() {
  const initialState = {
    brands: [],
    sizes: [],
  };
  const [sortBy, setsortBy] = useState(null);
  const [productFilter, setproductFilter] = useState(false);
  const [products, setproducts] = useState(jsonProducts.products);

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "ADD_BRAND_TO_FILTER":
        return { ...state, brands: [...state.brands, payload] };
      case "REMOVE_BRAND_FROM_FILTER":
        const newBrandArr = state.brands.filter((brand) => brand !== payload);
        return { ...state, brands: [...newBrandArr] };
      case "ADD_SIZE_TO_FILTER":
        return { ...state, sizes: [...state.sizes, payload] };
      case "REMOVE_SIZE_FROM_FILTER":
        const newSizesArr = state.sizes.filter((size) => size !== payload);
        console.log("newSizesArr", newSizesArr);
        return { ...state, sizes: [...newSizesArr] };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getSortedProducts = () => {
    const sortedProducts = [...products];

    console.log(sortedProducts);
    if (sortBy && sortBy === "LOW_TO_HIGH") {
      return sortedProducts.sort((a, b) => a.price - b.price);
    }
    if (sortBy && sortBy === "HIGH_TO_LOW") {
      return sortedProducts.sort((a, b) => b.price - a.price);
    } else {
      return sortedProducts;
    }
  };

  const getFilteredProducts = () => {
    const sortedProducts = getSortedProducts();

    console.log(sortedProducts);
    console.log(productFilter);
    if (state.brands.length !== 0 || state.sizes.length !== 0) {
      if (state.brands.length === 0 && state.sizes.length === 0) {
        return sortedProducts;
      }
      let filteredArray = [];
      for (let i = 0; i < state.brands.length; i++) {
        filteredArray = sortedProducts.filter(
          (product) => product.brand === state.brands[i]
        );
      }
      for (let i = 0; i < state.sizes.length; i++) {
        filteredArray = (
          state.brands.length === 0 ? filteredArray : sortedProducts
        ).filter((product) => product.size === state.sizes[i]);
      }
      return filteredArray;
    } else {
      console.log("Coming to else");
      return sortedProducts;
    }
  };

  const filteredProducts = getFilteredProducts();

  const handleSortClick = (sortBy) => {
    setsortBy(sortBy);
  };

  const handleSizeCheckbox = (e) => {
    let size = e.target.name;
    state.sizes.includes(size)
      ? dispatch({ type: "REMOVE_SIZE_FROM_FILTER", payload: size })
      : dispatch({ type: "ADD_SIZE_TO_FILTER", payload: size });
  };

  console.log("state", state);

  // console.log(filter);

  return (
    <div className="App">
      <h1>Flipkart</h1>
      <div className="flex justify-around align-center">
        <h2>Sort By: </h2>
        <h3
          className="cursor-pointer"
          onClick={() => handleSortClick("LOW_TO_HIGH")}
        >
          Price -- low to high
        </h3>
        <h3
          className="cursor-pointer"
          onClick={() => handleSortClick("HIGH_TO_LOW")}
        >
          Price -- high to low
        </h3>
      </div>
      <h2>Filter By</h2>
      <h3>Brands</h3>
      <input type="checkbox" name="brands-Peter" />
      <input type="checkbox" name="brands-FabIndia" />
      <input type="checkbox" name="brands-Raymond" />
      <h3>Sizes</h3>
      <input type="checkbox" name="S" onChange={handleSizeCheckbox} />
      <input type="checkbox" name="M" onChange={handleSizeCheckbox} />
      <input type="checkbox" name="L" onChange={handleSizeCheckbox} />
      {(productFilter ? filteredProducts : products).map((product) => (
        <div className="border border-blue-500 mt-12">
          <h2>{product.name}</h2>
          <h3>Rs. {product.price}</h3>
          <h3>Size: {product.size}</h3>
          <h3>Category: {product.category}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;
