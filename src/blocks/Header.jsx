import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LinkRow from "../components/LinkRow";
import Wrapper from "../components/Wrapper";
import Button from "../components/Button";
import Brand from "../components/Brand";
import Center from "../components/Center";
import Line from "../components/Line";
import ModalWindow from "./ModalWindow";
import Context from "../components/Context"

const HeaderContainer = styled.div`
  background: linear-gradient(
      0deg,
      rgba(51, 51, 51, 0.87),
      rgba(51, 51, 51, 0.87)
    ),
    url("images/bgc.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  padding: 25px 0 30px 0;
  h1 {
    margin: 523px 0 50px 0;
    color: #ffffff;
    font-weight: bold;
    font-size: 36px;
    line-height: 49px;
  }
`;

const LineStyle = styled(Line)`
  margin: 80px 0 30px 0;
`;

const MinimalHeaderContainer = styled(Wrapper)`
  background: #333333;
  padding: 27px 0 31px 0;
`;

export default function Header({ minimal }) {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [likedOpened, setLikedOpened] = React.useState(false);

  const openCart = () => setCartOpened(true);
  const openLiked = () => setLikedOpened(true);

  const headerContext = React.useContext(Context)


  return (
    <>
      {cartOpened && <ModalWindow closedCart={() => setCartOpened(false)} />}
      {likedOpened && <ModalWindow liked closedLiked={() => setLikedOpened(false)} />}
      {minimal ? (
        <MinimalHeaderContainer>
          <LinkRow openCart={openCart} openLiked={openLiked} />
        </MinimalHeaderContainer>
      ) : (
        <HeaderContainer>
          <Wrapper>
            <LinkRow openCart={openCart} openLiked={openLiked} />
            <Center>
              <h1>Долго, дорого, богато!</h1>
              <Link to="/products">
                <Button onClick={headerContext.clearInput} large dark>
                  каталог изделий
                </Button>
              </Link>
            </Center>
          </Wrapper>
          <LineStyle />
          <Wrapper>
            <Brand />
          </Wrapper>
        </HeaderContainer>
      )}
    </>
  );
}
