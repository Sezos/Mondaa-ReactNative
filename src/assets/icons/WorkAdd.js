import React from 'react';
import {Svg, Path} from 'react-native-svg';

const WorkAddSvg = () => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M19 13V15C19 17.8284 19 19.2426 18.1213 20.1213C17.2426 21 15.8284 21 13 21H11C8.17157 21 6.75736 21 5.87868 20.1213C5 19.2426 5 17.8284 5 15V9C5 6.17157 5 4.75736 5.87868 3.87868C6.75736 3 8.17157 3 11 3H12"
        stroke="#5F33E1"
        stroke-linecap="round"
      />
      <Path d="M18 3L18 9" stroke="#5F33E1" stroke-linecap="round" />
      <Path d="M21 6L15 6" stroke="#5F33E1" stroke-linecap="round" />
      <Path d="M9 13L15 13" stroke="#5F33E1" stroke-linecap="round" />
      <Path d="M9 9L13 9" stroke="#5F33E1" stroke-linecap="round" />
      <Path d="M9 17L13 17" stroke="#5F33E1" stroke-linecap="round" />
    </Svg>
  );
};

export default WorkAddSvg;
