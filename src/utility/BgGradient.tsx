import React from 'react'
import { BgGradient_Props } from '../config/CustomTypes';
import LinearGradient from 'react-native-linear-gradient';



const BgGradient = ({ width, height, colors, isAngle, angle, xAxis, yAxis, radius }: BgGradient_Props): JSX.Element => {
    return (
        <LinearGradient
            useAngle={isAngle ? isAngle : false}
            angle={angle}
            angleCenter={{ x: xAxis ? xAxis : 0, y: yAxis ? yAxis : 0 }}
            colors={[...colors]}
            style={{
                width: width ? width : "100%",
                height: height ? height : "100%",
                position: "absolute",
                zIndex: -1,
                borderRadius: radius,
            }}
        />
    )
};

export default BgGradient;