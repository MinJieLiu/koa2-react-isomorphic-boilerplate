import React from 'react';
import large from './large.jpg';
import min from './min.jpg';

export default () => (
  <ul>
    <li>large: <img src={large} alt="" /></li>
    <li>min: <img src={min} alt="" /></li>
  </ul>
);
