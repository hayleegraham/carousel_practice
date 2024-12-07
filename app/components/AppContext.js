"use client";
import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  //get cart items from local storage if exists
  const initializeCartItems = () => {
    if (typeof window !== "undefined") {
      const storedCartItems = window.localStorage.getItem("cartItems");
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    }
    return [];
  };

  const [cartItems, setCartItems] = useState(initializeCartItems);
  const [cartQty, setCartQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState(null);
  const [data, setData] = useState();
  const [cartVisible, setCartVisible] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const apiData = await fetch("https://garden.grahamslams.com/api.php");
      const jsonData = await apiData.json();
      //reorder images for pdp display 
      const formatProducts = jsonData.products.items.map((product)=> {
        //put the first image at end of array because second image is primary image for pdp
        product.image.productImages.push(product.image.productImages.shift());
        return product;
      })
      setData(jsonData);
      setProducts(formatProducts);
      console.log("api data:", jsonData)
    };

    fetchData();
  }, []);

  //fires anytime cartItems is changed
  useEffect(() => {
    //calculates current cart qty
    let currQty = 0;
    let currPrice = 0;
    cartItems.forEach((item) => {
      currQty += item.qty;
      currPrice += (item.qty * item.price);
    });
    let formattedPrice = currPrice.toFixed(2);
    setCartQty(currQty);
    setTotalPrice(formattedPrice);
    //add cart items to local storage
    window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  const addProduct = (product, qty) => {
    //find returns first item in array that matches product name
    const existingProduct = cartItems.find(
      (item) => item.name === product.name
    );
    if (existingProduct) {
      //if product is already in cart, only update qty
      const newQty = existingProduct.qty + qty;
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.name === product.name ? { ...item, qty: newQty } : item
        )
      );
    } else {
      //if not already in cart, add item to cart
      product.qty = qty;
      setCartItems((prevCartItems) => [...prevCartItems, product]);
    }
  };

  const removeProduct = (prodName) => {
    setCartItems(prevItems => prevItems.filter(item => item.name !== prodName));

  }

  //when card on homepage is clicked, return data for clicked item
  const getProductByName = (prodName) => {
    const prodData = products.find(
      (item) => item.name === prodName
    )
    console.log("product data from context", prodData);
    return prodData;
  }

  return (
    <AppContext.Provider
      value={{
        addProduct,
        cartItems,
        cartQty,
        data,
        products,
        getProductByName,
        cartVisible,
        setCartVisible,
        totalPrice,
        removeProduct
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
