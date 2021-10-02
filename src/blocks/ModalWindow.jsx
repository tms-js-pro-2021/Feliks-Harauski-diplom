import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Context from "../components/Context";
import ModalWindowItem from "../components/ModalWindowItem";
import Icons from "../img/MinHeaderIcon";

const CartContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(51, 51, 51, 0.8);
  z-index: 3;
`;

const Container = styled.div`
  position: fixed;
  height: 580px;
  background: #ffffff;
  z-index: 4;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 7px;
  overflow: overlay;
  display: flex;
  flex-direction: row;
`;

const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-image: url(/images/Store-bg.png);
  width: 210px;
  h5 {
    font-weight: 600;
    font-size: 28px;
    line-height: 140%;
    color: #ffffff;
    text-align: center;
  }
  button {
    /*  ПРАВИТЬ */
    background: none;
    border: none;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      position: relative;
      width: 210px;
      height: 55px;
      background: #333333;
      color: #ffffff;
      font-size: 24px;
      box-shadow: 0px 0px 2px 2px rgba(255, 255, 255, 1) inset;
      text-indent: 10px;
      border: none;
      border-radius: 2px;
      margin-bottom: 60px;
      ::placeholder {
        font-size: 22px;
      }
      :focus::placeholder {
        position: absolute;
        font-size: 15px;
        top: 2px;
        left: 5px;
        color: white;
      }
    }
    span {
      font-weight: 600;
      font-size: 18px;
      line-height: 150%;
      color: #ffffff;
      text-align: center;
    }
    p {
      font-weight: 600;
      font-size: 28px;
      line-height: 150%;
      color: #ffffff;
      text-align: center;
      margin-bottom: 20px;
    }
  }
`;
const Purchase = styled.div`
  padding: 20px;
  width: 620px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  button {
    background: none;
    border: none;
  }
  h5 {
    font-weight: 600;
    font-size: 24px;
    line-height: 140%;
    color: #333333;
    margin-bottom: 20px;
  }
`;
const Head = styled.div`
  margin-left: auto;
  margin-bottom: 10px;
  button {
    width: 90px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: none;
    border: none;
  }
`;

export default function ModalWindow({ ...props }) {
  const modalWindowContext = React.useContext(Context);

  return (
    <CartContainer>
      <Container>
        <Purchase>
          {props.liked ? (
            <button type="button" onClick={props.closedLiked}>
              <Icons name="Delete" width="30" height="30" color="#333333" />
            </button>
          ) : null}
          <h5>{props.liked ? "Вам понравилось" : "Ваши покупки"}</h5>
          <Head>
            <button type="button"
              onClick={
                props.liked
                  ? modalWindowContext.clearLiked
                  : modalWindowContext.clearCart
              }
            >
              <p>Очистить</p>
              <Icons
                name={props.liked ? "Unliked" : "Delete"}
                width="20"
                height="20"
                color="red"
              />
            </button>
          </Head>

          {props.liked
            ? modalWindowContext.likedItems.map((obj, i) => (
                <ModalWindowItem
                  liked
                  removeItem={() => modalWindowContext.removeLikedItem(obj.id)}
                  {...obj}
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                />
              ))
            : modalWindowContext.cartItems.map((obj, i) => (
                <ModalWindowItem
                  removeItem={() => modalWindowContext.removeCartItem(obj.id)}
                  {...obj}
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                />
              ))}
        </Purchase>

        {!props.liked ? (
          <OrderDetails>
            <div>
              <button type="button" onClick={props.closedCart}>
                <Icons name="Delete" width="30" height="30" color="#FFFFFF" />
              </button>
              <h5>Детали заказа</h5>
            </div>
            <div>
              <input type="text" placeholder="Введите промокод" />
              <span>Итого:</span>
              <p>175 000 ₽</p>
              <Button>заказать</Button>
            </div>
          </OrderDetails>
        ) : null}
      </Container>
    </CartContainer>
  );
}
