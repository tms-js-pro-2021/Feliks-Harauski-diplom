import React from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import Wrapper from '../components/Wrapper';
import Context from '../components/Context';

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


  return (
    <ProductsContainer>
      <ProductCardContainer>
        {productsContext.items
          .filter(
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
              inFavorite = {productsContext.favoriteItems.find((obj)=> obj.id === item.id )}
              inCart = {productsContext.cartItems.find((obj)=> obj.id === item.id )}
              onLiked={() => productsContext.reverseFavoriteItems(item)}
              onCart={() => productsContext.reverseCartItems(item)}
            />
          ))}
      </ProductCardContainer>
    </ProductsContainer>
  );
}
