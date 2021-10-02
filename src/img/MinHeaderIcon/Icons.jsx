import React from 'react';
import IconsSVG from './icons.svg';

function Icons({name, color, width, height}) {

  return(
    <svg fill={color} stroke={color} width={width} height={height}>
      <use xlinkHref={`${IconsSVG}#${name}`} />
    </svg>
  )
}

export default Icons;