import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Icons from "../img/MinHeaderIcon";
import Context from "./Context";
import Row from "./Row";

const Links = styled.a`
  display: flex;
  align-items: center;
  font-family: Josefin Sans;
  color: white;
  line-height: 21px;
  font-size: 14px;
`;

const HeaderLinks = styled(Row)`
  justify-content: space-between;
`;

const LeftLink = styled(Row)`
  a:not(:last-child) {
    margin-right: 40px;
  }
`;

const LinkSearch = styled(Links)`
  margin-right: 40px;
  position: relative;
  span {
    margin-left: 16px;
  }
  div {
    position: absolute;
    width: 315px;
    display: flex;
    padding: 7px;
    background: #ffffff;
    bottom: -20px;
    border-radius: 5px;
    color: #333333;
    input {
      width: inherit;
      border: none;
      background: transparent;
      border-radius: 0;
      outline: none;
      margin-left: 10px;
    }
    button{
      height: 16px;
    }
  }
`;

const LinkEnter = styled(Links)`
  margin-right: 30px;
  span {
    margin-right: 10px;
  }
`;

const LinkLike = styled(Links)`
  margin-right: 20px;
`;

export default function LinkRow({ ...props }) {
  const linkRowContext = React.useContext(Context)

  const [searchWindow, setSearchWindow] = React.useState(false);

  const searchWindowOpen = () => {
    setSearchWindow(true);
  };

  const searchWindowClose = (event) => {
    event.stopPropagation()
    setSearchWindow(false);
    linkRowContext.clearInput();
  };

  const logout = () => {
    window.sessionStorage.token = '';
    window.sessionStorage.tokenExpires = '';
    window.location.reload();
  }
  

  return (
    <HeaderLinks>
      <LeftLink>
        <Links href="#">Контрагентам</Links>
        <Links
        href="#">Дизайнерам</Links>
        {linkRowContext.loginStatus ? 
        <Links onClick={props.openAddingCard} href="#">ADD</Links>
      :
      <Links href="#">Вакансии</Links>
      
      }
      </LeftLink>
      <Link name="logo" to="/">
        <Icons name="OJJO" width="216" height="54" color="white" />
      </Link>
      <Row>
        <LinkSearch onClick={searchWindowOpen} href="#">
          <Icons name="Search" width="18" height="18" color="white" />
          <span>Поиск</span>
          {searchWindow && (
            <div>
              <Icons name="Search" width="18" height="18" color="#333333" />
              <input onChange={linkRowContext.changingInput} type="text" />
              <button type="button" onClick={searchWindowClose}>
                <Icons name="Delete" width="18" height="18" color="#333333" />
              </button>
            </div>
          )}
        </LinkSearch>
          {linkRowContext.loginStatus ? 
          <LinkEnter onClick={logout} href="#">
          <span>Выход</span>
          <Icons name="Account" width="16" height="16" color="white" />
        </LinkEnter>
          
          :
          
          <LinkEnter onClick={props.openLogin} href="#">
          <span>Вход/Регистрация</span>
          <Icons name="Account" width="16" height="16" color="white" />
        </LinkEnter>
          }




        <LinkLike onClick={props.openLiked} href="#">
          <Icons name="Liked" width="16" height="16" color="white" />
        </LinkLike>
        <Links onClick={props.openCart} href="#">
          <Icons name="Cart" width="16" height="16" color="white" />
        </Links>
      </Row>
    </HeaderLinks>
  );
}
