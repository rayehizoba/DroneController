import React from 'react';
import {View} from 'react-native';
import {Svg, Path, Line} from 'react-native-svg';

interface Props {
  radius: number;
}

const CircleWithTicks: React.FC<Props> = ({radius}) => {
  const centerX = radius;
  const centerY = radius;
  const tickLength = 10;

  const getTickCoordinates = (angle: number) => {
    const radians = angle * (Math.PI / 180);
    const x1 = centerX + radius * Math.cos(radians);
    const y1 = centerY + radius * Math.sin(radians);
    const x2 = centerX + (radius - tickLength) * Math.cos(radians);
    const y2 = centerY + (radius - tickLength) * Math.sin(radians);
    return {x1, y1, x2, y2};
  };

  return (
    <View>
      <Svg height={radius * 2} width={radius * 2}>
        <Path
          d={`M ${centerX},${
            centerY - radius
          } A ${radius},${radius} 0 1,1 ${centerX},${centerY + radius} Z`}
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
        <Line {...getTickCoordinates(0)} stroke="black" strokeWidth="2" />
        <Line {...getTickCoordinates(30)} stroke="black" strokeWidth="2" />
        <Line {...getTickCoordinates(60)} stroke="black" strokeWidth="2" />
        <Line {...getTickCoordinates(330)} stroke="black" strokeWidth="2" />
        <Line {...getTickCoordinates(300)} stroke="black" strokeWidth="2" />
      </Svg>
    </View>
  );
};

export default CircleWithTicks;
