import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { setupApi } from './api/api';
import ModalWindow from './blocks/ModalWindow';
import Context from './components/Context';
import PageGoods from './pages/PageGoods';
import PageMain from './pages/PageMain';

const GlobalStyle = createGlobalStyle`
html {
	box-sizing: border-box;
}

h1, h2, h3, h4, h5 {
	margin: 0;
}

body {
	padding: 0;
  margin: 0;
}

input[type="text"],
input[type="phone"],
input[type="email"],
input[type="password"],
textarea {
	appearance: none;
  outline: none;
}

textarea:focus {
	outline: none;
}

button {
	cursor: pointer;
	border-width: 0;
	padding: 0;
}

a {
	cursor: pointer;
	text-decoration: none;
}

a:hover {
		text-decoration: none;
	}
	
p{
		margin: 0;
		padding: 0;
	}
`;

export default function App() {

  const {pathname } = useLocation();
  
  // const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  // const [price, setPrice] = React.useState(0);
  const [cartItems, setCartItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [loginStatus, setLoginStatus] = React.useState(false)
  const [items, setItems] = React.useState([]);
  const [addCardOpened, setAddCardOpened] = React.useState(false);
  const [editStatus, setEditStatus] = React.useState(false);
  const [editedState, setEditedState] = React.useState({});





  React.useEffect(() =>{
    const { token } = window.sessionStorage
    const { tokenExpires } = window.sessionStorage
    setLoginStatus(token && tokenExpires > Date.now())
    setupApi(token)
  }, [])

  React.useEffect(() => {
    window.scrollTo(0, 0);
  },[pathname])


  const openAddingCard = () => setAddCardOpened(true);


  const clearLiked = () => {
    setFavoriteItems([]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const changingInput = event => {
    setSearch(event.target.value);
  };

  const clearInput = () => {
    setSearch('');
  };

  const quickSearch = any => {
    setSearch(any);
  };






  return (
    <ThemeProvider theme={{ fontFamily: 'sans-serif' }}>
      <GlobalStyle />
      <Switch>
        <Context.Provider
          value={{
            setEditedState,
            editStatus,
            setEditStatus,
            openAddingCard,
            items,
            setItems,
            loginStatus,
            setLoginStatus,
            // isLoading,

            search,
            // price,
            cartItems,
            favoriteItems,
            setCartItems,
            setFavoriteItems,
            clearLiked,
            clearCart,
            changingInput,
            clearInput,
            quickSearch,
          }}
        >
          {addCardOpened && <ModalWindow  editedValue={editedState} addForm closingAddForm={() => setAddCardOpened(false)} />}
          <Route path="/" exact>
            <PageMain />
          </Route>
          <Route path="/products" exact>
            <PageGoods />
          </Route>
        </Context.Provider>
      </Switch>
    </ThemeProvider>
  );
}
