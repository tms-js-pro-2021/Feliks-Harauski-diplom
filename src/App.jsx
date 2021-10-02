import axios from "axios";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Context from "./components/Context";
import PageGoods from "./pages/PageGoods";
import PageMain from "./pages/PageMain";

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
  const [likedItems, setLikedItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch]=React.useState('');

  React.useEffect(() => {
    async function fetchData() {
      try {
        const itemResponse = await axios.get(
          "https://61451ca338339400175fc52d.mockapi.io/items"
        );
        const cartResponse = await axios.get(
          "https://61451ca338339400175fc52d.mockapi.io/cart"
        );
        const likedResponse = await axios.get(
          "https://61451ca338339400175fc52d.mockapi.io/liked"
        );
        setItems(itemResponse.data);
        setCartItems(cartResponse.data)
        setLikedItems(likedResponse.data)
        setIsLoading(false);
      } catch {
        // eslint-disable-next-line no-alert
        alert("Ошибка сервера");
      }
    }
    fetchData();
  }, []);

  const toCartItems = (item) => {
    axios.post("https://61451ca338339400175fc52d.mockapi.io/cart", item);
    setCartItems((prev) => [...prev, item]);
  };
  const removeCartItem = (id) => {
    axios.delete(`https://61451ca338339400175fc52d.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }

  const toLikedItems = (item) => {
    axios.post("https://61451ca338339400175fc52d.mockapi.io/liked", item);
    setLikedItems((prev) => [...prev, item]);
  };
  const removeLikedItem = (id) => {
    axios.delete(`https://61451ca338339400175fc52d.mockapi.io/liked/${id}`);
    setLikedItems((prev) => prev.filter(item => item.id !== id));
  }

  const clearLiked = () => {
    setLikedItems([]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const changingInput = (event) => {
      setSearch(event.target.value);
  }

  const clearInput = () => {
    setSearch('');
  }

  const quickSearch = (any) => {
    setSearch(any)
  }

  return (
    <ThemeProvider theme={{ fontFamily: "sans-serif" }}>
      <GlobalStyle />
      <Switch>
        <Context.Provider
          value={{
            items,
            isLoading,
            cartItems,
            likedItems,
            search,
            toCartItems,
            removeCartItem,
            toLikedItems,
            removeLikedItem,
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




