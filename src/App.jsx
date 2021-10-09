import axios from 'axios';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
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
textarea {
	appearance: none;
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
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  // const [price, setPrice] = React.useState(0);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const itemResponse = await axios.get(
          'https://61451ca338339400175fc52d.mockapi.io/items'
        );
        setItems(itemResponse.data);
        // setIsLoading(false);
      } catch {
        // eslint-disable-next-line no-alert
        alert('Ошибка сервера');
      }
    }
    fetchData();
    setCartItems(JSON.parse(window.localStorage.getItem('cartItems') || []));
    setFavoriteItems(
      JSON.parse(window.localStorage.getItem('favoriteItems') || [])
    );


console.log(JSON.parse(window.localStorage.getItem('favoriteItems')));

  }, []);

  React.useEffect(() => {
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  React.useEffect(() => {
    window.localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  const reverseCartItems = item => {
    if (cartItems.find(obj => obj.id === item.id)) {
      setCartItems(prev => prev.filter(obj => obj.id !== item.id));

      // setPrice(prev => prev - Number(item.price));
    } else {
      setCartItems(prev => [...prev, item]);

      // setPrice(prev => prev + Number(item.price));
    }
  };

  const reverseFavoriteItems = item => {
    if (favoriteItems.find(obj => obj.id === item.id)) {
      setFavoriteItems(prev => prev.filter(obj => obj.id !== item.id));
    } else {
      setFavoriteItems(prev => [...prev, item]);
    }
  };

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
            items,
            // isLoading,
            cartItems,
            favoriteItems,
            search,
            // price,
            reverseCartItems,
            reverseFavoriteItems,
            clearLiked,
            clearCart,
            changingInput,
            clearInput,
            quickSearch,
          }}
        >
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
