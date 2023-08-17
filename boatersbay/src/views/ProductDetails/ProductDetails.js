import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";
import Heading from "../../components/Heading/Heading";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Grid } from "@mui/material";
import QuantityButton from "../../components/QuantityButton/QuantityButton";

function ProductDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.productId;
  const [details, updateDetails] = useState();
  const [quantity, updateQuantity] = useState(0);

  useEffect(() => {
    const query = ref(db, "Products");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      var fulfill = 0;
      for (var i = 0; i < Object.keys(data).length; i++) {
        var cat_details = data[Object.keys(data)[i]];
        for (var j = 0; j < Object.keys(cat_details).length; j++) {
          if (Object.keys(cat_details)[j] === productId) {
            updateDetails(cat_details[Object.keys(cat_details)[j]]);
            fulfill = 1;
            break;
          }
        }
        if (fulfill) {
          break;
        }
        if (i === Object.keys(data).length - 1 && !details) {
          navigate("/");
        }
      }
    });
  }, []);

  return <div>
  <Heading />
  <div className="product-back-icon-container">
    <KeyboardBackspaceIcon className="product-back-icon" onClick={() => navigate("/products")} />
  </div>
    <Grid container className="product-details-container">
        <Grid item lg={6} xs={12}>
            <img src={require("../../img/boat.jpg")} className="product-pic" />
        </Grid>
        <Grid item lg={6} xs={12} className="product-info-container">
            <p><b>Product Name</b></p>
            <p>{details?.name}</p>
            <p><b>Description</b></p>
            <p>{details?.description}</p>
            <p><b>Price</b></p>
            <p>SGD {details?.price}</p>
            {details?.online_purchase ?
            <>
            <QuantityButton quantity={quantity} updateQuantityCallback={updateQuantity} />
            <button className="product-details-add-to-cart-button" onClick={() => {
              var cart = JSON.parse(sessionStorage.getItem("boaters-bay-cart"));
              if (!cart) {
                cart = {};
              }
              const prev_quantity = cart[productId]?.quantity ? cart[productId]?.quantity : 0;
              cart[productId] = {"name": details?.name, "quantity": prev_quantity + quantity, "price": details?.price};
              console.log(cart);
              sessionStorage.setItem("boaters-bay-cart", JSON.stringify(cart));
            }}>Add to Cart</button>
            </>
            : <p>Please contact us via email if you wish to purchase this product.</p>
            }
        </Grid>
    </Grid>
  </div>;
}

export default ProductDetails;
