import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import tw from 'twrnc';

interface JoystickProps {
  onMove: (dx: number, dy: number) => void;
  size: number;
  axisEnabled?: ('x' | 'y')[];
  tooltip: string;
}

const Joystick = ({
  onMove,
  size,
  axisEnabled = ['x', 'y'],
  tooltip,
}: JoystickProps) => {
  const [displacement, setDisplacement] = useState({x: 0, y: 0});

  const onPanGestureEvent = (event: any) => {
    const {translationX, translationY} = event.nativeEvent;
    const halfSize = size / 2;
    let newDisplacement = {x: translationX, y: translationY};
    if (!axisEnabled.includes('x')) {
      newDisplacement.x = 0;
    }
    if (!axisEnabled.includes('y')) {
      newDisplacement.y = 0;
    }
    if (Math.sqrt(newDisplacement.x ** 2 + newDisplacement.y ** 2) > halfSize) {
      const angle = Math.atan2(newDisplacement.y, newDisplacement.x);
      newDisplacement = {
        x: Math.cos(angle) * halfSize,
        y: Math.sin(angle) * halfSize,
      };
    }
    setDisplacement(newDisplacement);
    const valueX = newDisplacement.x / halfSize;
    const valueY = -newDisplacement.y / halfSize; // Multiply by -1 to invert y-axis direction
    onMove(valueX, valueY);
  };

  const onPanHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      setDisplacement({x: 0, y: 0});
      onMove(0, 0);
    }
  };

  const thumbStyle = {
    transform: [{translateX: displacement.x}, {translateY: displacement.y}],
  };

  return (
    <View
      style={[
        tw`flex items-center justify-center`,
        {width: size, height: size},
      ]}>
      <PanGestureHandler
        onGestureEvent={onPanGestureEvent}
        onHandlerStateChange={onPanHandlerStateChange}>
        {/* thumb */}
        <View
          style={[
            tw`w-full h-full rounded-full bg-white/25 dark:bg-black/25 border-2 border-black/15 dark:border-white/15`,
            thumbStyle,
          ]}>
          {tooltip && (
            <Text
              style={tw`absolute bottom-full right-1/2 -mx-10 dark:text-white/50 text-lg`}>
              {tooltip}
            </Text>
          )}
        </View>
      </PanGestureHandler>
    </View>
  );
};

export default Joystick;
