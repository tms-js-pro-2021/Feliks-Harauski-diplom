import React from "react";
import LinkCard from "../components/LinkCard";
import styled from "styled-components";
import SectionTitle from "../components/SectionTitle";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import Context from "../components/Context";


const GoodsTypeContainer = styled(Wrapper)`
  padding: 100px 0 120px 0;
`;

const LinkField = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  width: 100%;
`;

export default function GoodsType() {

const goodsTypeContext = React.useContext(Context)

  const ProductTypeCardItem = [
    { src: "images/Rings.png", label: "Кольца", search: "Кольцо" },
    { src: "images/Earrings.png", label: "Серьги", search: "Серьги" },
    { src: "images/Pendant.png", label: "Подвески", search: "Подвеска" },
    { src: "images/Cufflinks.png", label: "Запонки", search: "Запонки" },
    { src: "images/Bracelets.png", label: "Браслеты", search: "Браслет" },
    { src: "images/Watch.png", label: "Часы", search: "Часы" },
  ];

  return (
    <GoodsTypeContainer>
      <SectionTitle
        subtitle="К мероприятиям"
        title="Настоящая красота здесь!"
      />

      <LinkField>
        {ProductTypeCardItem.map((item, i) => (
          <Link key={i} to="/products">
            <LinkCard onClick={()=>goodsTypeContext.quickSearch(item.search)} src={item.src} label={item.label} />
          </Link>
        ))}
      </LinkField>
    </GoodsTypeContainer>
  );
}
