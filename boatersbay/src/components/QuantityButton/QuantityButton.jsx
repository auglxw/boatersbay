import React from "react";
import "./QuantityButton.css";

function QuantityButton(props) {
    const {quantity, updateQuantityCallback} = props;

    return <div className="quantity-button">
        <button onClick={() => {
            if (quantity > 0) {
                updateQuantityCallback(quantity - 1);
            }
        }
        }>-</button>
        <div className="quantity-button-amount">
            <p>{quantity}</p>
        </div>
        <button onClick={() => updateQuantityCallback(quantity + 1)}>+</button>
    </div>
}

export default QuantityButton;