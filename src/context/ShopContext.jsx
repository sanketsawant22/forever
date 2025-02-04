import { useState } from "react";
import { createContext } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const deliveryfee = 10;

  const [search, setsearch] = useState("");
  const [showSearch, setshowSearch] = useState(false);

  const value = {
    products,
    currency,
    deliveryfee,
    search,
    setsearch,
    showSearch,
    setshowSearch,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
