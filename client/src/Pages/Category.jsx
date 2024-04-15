import React, { useContext } from "react";
import './CSS/Category.css'
import { ShopContext } from "../Context/ShopContext";

const Category = () => {

  const {all_product} = useContext(ShopContext);

  return(
    <div className="category">

    </div>
  )
}

export default Category