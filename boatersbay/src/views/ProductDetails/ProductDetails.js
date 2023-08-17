import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";
import Heading from "../../components/Heading/Heading";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Grid } from "@mui/material";

function ProductDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.productId;
  const [details, updateDetails] = useState();

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
            <p><b>Product</b></p>
            <p>{details?.name}</p>
            <p><b>Description</b></p>
            <p>{details?.description}</p>
            <p><b>Price</b></p>
            <p>{details?.price}</p>
        </Grid>
    </Grid>
  </div>;
}

export default ProductDetails;
