import * as React from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function LeaveIcon(props) {
    return (
        <Svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Circle cx="25" cy="25" r="25" fill="white" />
            <Rect
                x="18"
                y="14"
                width="13"
                height="23"
                rx="4"
                fill="white"
                stroke="#BE0000"
                stroke-width="2"
            />
            <Rect x="30" y="22" width="4" height="6" fill="white" />
            <Path
                d="M42.7071 25.7071C43.0976 25.3166 43.0976 24.6834 42.7071 24.2929L36.3431 17.9289C35.9526 17.5384 35.3195 17.5384 34.9289 17.9289C34.5384 18.3195 34.5384 18.9526 34.9289 19.3431L40.5858 25L34.9289 30.6569C34.5384 31.0474 34.5384 31.6805 34.9289 32.0711C35.3195 32.4616 35.9526 32.4616 36.3431 32.0711L42.7071 25.7071ZM24 26L42 26V24L24 24V26Z"
                fill="#BE0000"
            />
        </Svg>
    );
}

export default LeaveIcon;
