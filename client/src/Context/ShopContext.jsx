import { createContext } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const ShopContextProvider = () => {

  const contextValue = {all_product};

  return(
    <ShopContext.Provider value = {contextValue}>
      {PaymentResponse.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;