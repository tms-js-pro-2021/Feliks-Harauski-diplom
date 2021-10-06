import React from "react";
import styled from "styled-components";
import Icons from "../img/MinHeaderIcon";
// import Context from "./Context";

const CartItemsStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 620px;
  border-bottom: 1px solid #000;
  padding-bottom: 15px;
  :not(:last-child) {
    margin-bottom: 15px;
  }
  div {
    p {
      font-weight: 600;
      font-size: 18px;
    }
    span {
      font-weight: normal;
      font-size: 15px;
    }
  }

  img {
    width: 84px;
    height: 65px;
  }
  span {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.05em;
  }
  button {
    border: none;
    background: none;
    color: red;
    width: 16px;
    height: 16px;
  }
`;

const ItemsControl = styled.div`
  display: flex;
  align-items: center;
  display: "flex";
  input {
    width: 30px;
    height: 20px;
    margin: 0 7px;
    border-radius: 5px;
    border: 1px solid #333333;
    text-align: center;
  }
  button {
    border: none;
    background: none;
    width: 16px;
    height: 16px;
  }
`;

export default function ModalWindowItem({
  src,
  label,
  producer,
  price,
  liked,
  removeItem,
}) {
  console.log(liked);
  const [quantity, setQuantity] = React.useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const inputHandleChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <CartItemsStyle>
      <img src={src} alt={label} />
      <div>
        <p>{producer}</p>
        <span>{label}</span>
      </div>
      {!liked && (
        <ItemsControl>
          <button type="button" onClick={decreaseQuantity}>
            <Icons name="Minus" width="16" height="16" color="#333333" />
          </button>
          <input value={quantity} onChange={inputHandleChange} type="text" />
          <button type="button" onClick={increaseQuantity}>
            <Icons name="Pluse" width="16" height="16" color="#333333" />
          </button>
        </ItemsControl>
      )}
      <span>{price} ₽</span>
      <button type="button" onClick={removeItem}>
        <Icons
          name={liked ? "Unliked" : "Delete"}
          width="18"
          height="18"
          color="red"
        />
      </button>
    </CartItemsStyle>
  );
}
