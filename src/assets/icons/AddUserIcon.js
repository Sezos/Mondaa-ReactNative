import * as React from "react";
import Svg, { Circle, G, Path, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function AddUserIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={50}
            height={50}
            viewBox="0 0 75 75"
            fill="none"
            {...props}
        >
            <Circle cx={37.5} cy={37.5} r={37.5} fill="#fff" />
            <G filter="url(#filter0_d_1_17)">
                <Circle cx={37} cy={26} r={10} fill="#000" />
            </G>
            <G filter="url(#filter1_d_1_17)">
                <Path
                    d="M17 57c0-11.046 8.954-20 20-20s20 8.954 20 20H17z"
                    fill="#000"
                />
            </G>
            <Circle cx={52.5} cy={18.5} r={4.5} fill="#767676" />
            <Path stroke="#fff" d="M49.2857 18.6429L55.7143 18.6429" />
            <Path stroke="#fff" d="M52.3571 15.2857L52.3571 21.7143" />
            <Defs></Defs>
        </Svg>
    );
}

export default AddUserIcon;
