import React from 'react';
import {Svg, Path} from 'react-native-svg';

const WorkSvg = () => {
  return (
    <Svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M16 5C17.4045 5 18.1067 5 18.6111 5.33706C18.8295 5.48298 19.017 5.67048 19.1629 5.88886C19.5 6.39331 19.5 7.09554 19.5 8.5V18C19.5 19.8856 19.5 20.8284 18.9142 21.4142C18.3284 22 17.3856 22 15.5 22H9.5C7.61438 22 6.67157 22 6.08579 21.4142C5.5 20.8284 5.5 19.8856 5.5 18V8.5C5.5 7.09554 5.5 6.39331 5.83706 5.88886C5.98298 5.67048 6.17048 5.48298 6.38886 5.33706C6.89331 5 7.59554 5 9 5"
        stroke="#0F172A"
      />
      <Path
        d="M9.5 5C9.5 3.89543 10.3954 3 11.5 3H13.5C14.6046 3 15.5 3.89543 15.5 5C15.5 6.10457 14.6046 7 13.5 7H11.5C10.3954 7 9.5 6.10457 9.5 5Z"
        stroke="#0F172A"
      />
      <Path d="M9.5 12L15.5 12" stroke="#0F172A" stroke-linecap="round" />
      <Path d="M9.5 16L13.5 16" stroke="#0F172A" stroke-linecap="round" />
    </Svg>
  );
};

export default WorkSvg;
