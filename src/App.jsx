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
  const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [price, setPrice] = React.useState(0);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const itemResponse = await axios.get(
          'https://61451ca338339400175fc52d.mockapi.io/items'
        );
        setItems(itemResponse.data);
        setCartItems(itemResponse.data.filter(obj => obj.inCart));
        setFavoriteItems(itemResponse.data.filter(obj => obj.favorite));
        setIsLoading(false);
      } catch {
        // eslint-disable-next-line no-alert
        alert('Ошибка сервера');
      }
    }
    fetchData();
  }, []);

  const reverseCartItems = item => {
    if (cartItems.find(obj => obj.id === item.id)) {
      axios.put(
        `https://61451ca338339400175fc52d.mockapi.io/items/${item.id}`,
        { inCart: false }
      );
      setCartItems(prev => prev.filter(obj => obj.id !== item.id));
      setItems(prev =>
        prev.map(obj => (obj.id === item.id ? { ...obj, inCart: false } : obj))
      );
      setPrice(prev => prev - Number(item.price));
    } else {
      axios.put(
        `https://61451ca338339400175fc52d.mockapi.io/items/${item.id}`,
        { inCart: true }
      );
      setCartItems(prev => [...prev, item]);
      setItems(prev =>
        prev.map(obj => (obj.id === item.id ? { ...obj, inCart: true } : obj))
      );
      setPrice(prev => prev + Number(item.price));
    }
  };

  const reverseFavoriteItems = item => {
    if (favoriteItems.find(obj => obj.id === item.id)) {
      axios.put(
        `https://61451ca338339400175fc52d.mockapi.io/items/${item.id}`,
        { favorite: false }
      );
      setFavoriteItems(prev => prev.filter(obj => obj.id !== item.id));
      setItems(prev =>
        prev.map(obj =>
          obj.id === item.id ? { ...obj, favorite: false } : obj
        )
      );
    } else {
      axios.put(
        `https://61451ca338339400175fc52d.mockapi.io/items/${item.id}`,
        { favorite: true }
      );
      setFavoriteItems(prev => [...prev, item]);
      setItems(prev =>
        prev.map(obj => (obj.id === item.id ? { ...obj, favorite: true } : obj))
      );
    }
  };

  const clearLiked = () => {
    setFavoriteItems([]);
    setItems(prev =>
      prev.map(obj =>
        obj.favorite === true ? { ...obj, favorite: false } : obj
      )
    );
    for (let i = 0; i < favoriteItems.length; i += 1) {
      setTimeout(() => {
        const item = favoriteItems[i];
        axios.put(
          `https://61451ca338339400175fc52d.mockapi.io/items/${item.id}`,
          { favorite: false }
        );
      }, i * 1000);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setItems(prev =>
      prev.map(obj => (obj.inCart === true ? { ...obj, inCart: false } : obj))
    );
    for (let i = 0; i < cartItems.length; i += 1) {
      setTimeout(() => {
        const item = cartItems[i];
        axios.put(
          `https://61451ca338339400175fc52d.mockapi.io/items/${item.id}`,
          { inCart: false }
        );
      }, i * 1000);
    }
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
            isLoading,
            cartItems,
            favoriteItems,
            search,
            price,
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
