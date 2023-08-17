import React, { useEffect, useState } from "react";
import "./Cart.css";
import Heading from '../../components/Heading/Heading';
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";
import { Grid, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

function Cart() {
    const cart = JSON.parse(sessionStorage.getItem("boaters-bay-cart"));
    const [sum, updateSum] = useState(0);

    /* sessionStorage.setItem("boaters-bay-cart", JSON.stringify({})); */

    useEffect(() => {
        var amount = 0;
        if (!cart) {
            return;
        }

        for (var i = 0; i < Object.keys(cart).length; i++) {
            var productId = Object.keys(cart)[i];
            amount += cart[productId].price * cart[productId].quantity;
        }
        updateSum(amount);
    }, [])

    return (
        <div>
            <Heading choice="cart" />
            <Grid container>
                <Grid item xs={12} md={7}>
                <p className="pageTitle">MY CART</p>
                {cart &&
                <>
                <Table id="cart-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {Object.keys(cart).map((productId) => {
                        return <TableRow key={productId}>
                            <TableCell>{productId}</TableCell>
                            <TableCell>{cart[productId].name}</TableCell>
                            <TableCell>{cart[productId].quantity}</TableCell>
                            <TableCell>{cart[productId].price * cart[productId].quantity}</TableCell>
                        </TableRow>
                    })}
                    </TableBody>
                </Table>
                <p className="cart-total-sum"><b>Total: </b>SGD {sum}</p>
                </>
                }
                </Grid>
                <Grid item xs={12} md={5}>
                    <p className="pageTitle">DETAILS</p>
                    <p className="cart-details-label">Name</p>
                    <input className="cart-details-input" />
                    <p className="cart-details-label">Email</p>
                    <input className="cart-details-input" />
                    <p className="cart-details-label">Contact Number</p>
                    <input className="cart-details-input" />
                    <p className="cart-details-label">Address</p>
                    <input className="cart-details-input" />
                    <button className="cart-checkout-button">Check Out</button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cart;