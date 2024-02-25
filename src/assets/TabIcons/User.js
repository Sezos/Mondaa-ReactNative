import React from 'react';
import {Circle, Path, Svg} from 'react-native-svg';

const UserSvg = () => {
  return (
    <Svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M20.2274 20.4471C19.7716 19.1713 18.7672 18.0439 17.3701 17.2399C15.9729 16.4358 14.2611 16 12.5 16C10.7389 16 9.02706 16.4358 7.62991 17.2399C6.23276 18.0439 5.22839 19.1713 4.77259 20.4471"
        stroke="#0F172A"
        stroke-linecap="round"
      />
      <Circle cx="12.5" cy="8" r="4" stroke="#0F172A" stroke-linecap="round" />
    </Svg>
  );
};

export default UserSvg;
