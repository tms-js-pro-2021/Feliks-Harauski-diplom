import React from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import Wrapper from '../components/Wrapper';
import Context from '../components/Context';
import api from '../api/api';


const ProductsContainer = styled(Wrapper)`
  padding: 100px 0 150px 0;
`;

const ProductCardContainer = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 350px);
  row-gap: 20px;
`;

export default function Products() {
  const productsContext = React.useContext(Context);
 

  React.useEffect(() => {
    (async () => {
      try {
        const itemResponse = await api.get(
          '/jewellery/' // ?type=${type}`
        );
        productsContext.setItems(itemResponse.data);
        // setIsLoading(false);
      } catch {
        // eslint-disable-next-line no-alert
        alert('Ошибка сервера');
      }
    })();
    productsContext.setCartItems(
      JSON.parse(window.localStorage.getItem('cartItems') || [])
    );
    productsContext.setFavoriteItems(
      JSON.parse(window.localStorage.getItem('favoriteItems') || [])
    );
  }, []);


  const deleteCard = async (item) => {
    await api.delete(`/jewellery/${item.id}`,
    );
    productsContext.setItems(prev => prev.filter(card => card.id !== item.id))
  }


  // const editCard = () => {



  // }



  React.useEffect(() => {
    window.localStorage.setItem(
      'cartItems',
      JSON.stringify(productsContext.cartItems)
    );
  }, [productsContext.cartItems]);

  React.useEffect(() => {
    window.localStorage.setItem(
      'favoriteItems',
      JSON.stringify(productsContext.favoriteItems)
    );
  }, [productsContext.favoriteItems]);

  const reverseCartItems = item => {
    if (productsContext.cartItems.find(obj => obj.id === item.id)) {
      productsContext.setCartItems(prev =>
        prev.filter(obj => obj.id !== item.id)
      );

      // setPrice(prev => prev - Number(item.price));
    } else {
      productsContext.setCartItems(prev => [...prev, item]);

      // setPrice(prev => prev + Number(item.price));
    }
  };

  const reverseFavoriteItems = item => {
    if (productsContext.favoriteItems.find(obj => obj.id === item.id)) {
      productsContext.setFavoriteItems(prev =>
        prev.filter(obj => obj.id !== item.id)
      );
    } else {
      productsContext.setFavoriteItems(prev => [...prev, item]);
    }
  };

  return (
    <>
      <ProductsContainer>
        <ProductCardContainer>
          {productsContext.items.filter(
              item =>
                item.producer
                  .toLowerCase()
                  .includes(productsContext.search.toLowerCase()) ||
                item.label
                  .toLowerCase()
                  .includes(productsContext.search.toLowerCase())
            )
            .map((item, i) => (
              <ProductCard
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                {...item}
                loading={productsContext.isLoading}
                inFavorite={productsContext.favoriteItems.find(
                  obj => obj.id === item.id
                )}
                inCart={productsContext.cartItems.find(obj => obj.id === item.id)}
                onLiked={() => reverseFavoriteItems(item)}
                onCart={() => reverseCartItems(item)}
                deleteCard = {() => deleteCard(item)}

                editCard={() => {
                  productsContext.openAddingCard();
                  productsContext.setEditStatus(true);
                  productsContext.setEditedState({...item})
                }}


              />
            ))}
        </ProductCardContainer>
      </ProductsContainer>
    </>
  );
}
