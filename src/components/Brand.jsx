import React from "react";
import styled from "styled-components";
import Row from "./Row";

const BrandStyle = styled(Row)`
  justify-content: center;
  a:not(:last-child) {
    border-right: 1px solid #ffffff;
    padding-right: 15px;
  }
  a:not(:first-child) {
    padding-left: 15px;
  }
`;

export default function Brand() {
  return (
    <BrandStyle>
      <a href="/">
        <img src="images/brand.png" alt="" />
      </a>
      <a href="/">
        <img src="images/brand.png" alt="" />
      </a>
      <a href="/">
        <img src="images/brand.png" alt="" />
      </a>
      <a href="/">
        <img src="images/brand.png" alt="" />
      </a>
      <a href="/">
        <img src="images/brand.png" alt="" />
      </a>
      <a href="/">
        <img src="images/brand.png" alt="" />
      </a>
    </BrandStyle>
  );
}
