import React from 'react';
import {Svg, Circle, Path} from 'react-native-svg';

const UserAdd = () => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Circle cx="12" cy="8" r="4" stroke="#5F33E1" stroke-linecap="round" />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.2759 16C13.8972 15.5613 12.3896 15.4073 10.9067 15.5538C9.26616 15.7157 7.71472 16.2397 6.45048 17.0712C5.18613 17.9028 4.25374 19.0137 3.80174 20.2789C3.70884 20.5389 3.84433 20.825 4.10438 20.9179C4.36442 21.0108 4.65054 20.8754 4.74345 20.6153C5.11048 19.588 5.88515 18.64 7 17.9067C8.11495 17.1734 9.508 16.6967 11.0049 16.5489C11.5548 16.4946 12.1076 16.4858 12.6536 16.521C13.009 16.1974 13.4814 16 14 16L15.2759 16Z"
        fill="#5F33E1"
      />
      <Path d="M18 14L18 22" stroke="#5F33E1" stroke-linecap="round" />
      <Path d="M22 18L14 18" stroke="#5F33E1" stroke-linecap="round" />
    </Svg>
  );
};
export default UserAdd;
