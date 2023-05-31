import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Line } from 'react-native-svg';

interface DialProps {
  radius: number;
  strokeWidth: number;
}

const Dial: React.FC<DialProps> = ({ radius, strokeWidth }) => {
  const centerX = radius + strokeWidth / 2;
  const centerY = radius + strokeWidth / 2;
  const path = `M${centerX},${centerY} A${radius},${radius} 0 1,1 ${centerX + radius * 2},${centerY}`;

  return (
    <View>
      <Svg width={radius * 2 + strokeWidth} height={radius + strokeWidth}>
        <Path d={path} stroke="black" strokeWidth={strokeWidth} fill="none" />
        <Line x1={centerX} y1={centerY} x2={centerX} y2={strokeWidth / 2} stroke="black" strokeWidth={strokeWidth} />
        <Line x1={centerX + radius} y1={centerY} x2={centerX + radius} y2={strokeWidth / 2} stroke="black" strokeWidth={strokeWidth} />
        <Line x1={centerX + radius / 2} y1={centerY} x2={centerX + radius / 2} y2={strokeWidth} stroke="black" strokeWidth={strokeWidth} />
        <Line x1={centerX + radius * 1.5} y1={centerY} x2={centerX + radius * 1.5} y2={strokeWidth} stroke="black" strokeWidth={strokeWidth} />
      </Svg>
    </View>
  );
};

export default Dial;
