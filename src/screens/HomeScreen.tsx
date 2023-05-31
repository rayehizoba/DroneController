import React from 'react';
import {View, Text, Dimensions, Animated, Vibration} from 'react-native';
import Joystick from '../components/Joystick';
import tw, {useDeviceContext} from 'twrnc';
import usePreviousValue from '../hooks/usePreviousValue';

const ANGLES = [330, 345, 0, 15, 30];

const HomeScreen = () => {
  useDeviceContext(tw);

  const [leftJoystickPosition, setLeftJoystickPosition] = React.useState({
    x: 0,
    y: 0,
  });

  const [rightJoystickPosition, setRightJoystickPosition] = React.useState({
    x: 0,
    y: 0,
  });

  const handleLeftJoystickMove = (dx: number, dy: number) => {
    setLeftJoystickPosition({x: dx, y: dy});
  };

  const handleRightJoystickMove = (dx: number, dy: number) => {
    setRightJoystickPosition({x: dx, y: dy});
  };

  const JOYSTICK_SIZE = 90;

  const {width} = Dimensions.get('screen');

  const [rotationAngle, setRotationAngle] = React.useState(0);
  const prevRotationAngle = usePreviousValue(rotationAngle);

  const [animationValue, setAnimationValue] = React.useState(
    new Animated.Value(0),
  );

  const interpolatedValue = animationValue.interpolate({
    inputRange: [-1, 1],
    outputRange: ['0deg', '20deg'],
  });

  // set rotation angle
  React.useEffect(() => {
    const distanceX = rightJoystickPosition.x - leftJoystickPosition.x;
    const distanceY = rightJoystickPosition.y - leftJoystickPosition.y;
    let angle = 30 * (distanceX / 2) - 30 * (distanceY / 2);
    angle = Math.min(30, Math.max(-30, angle)); // clamp angle between -30 and 30 degrees

    setRotationAngle(angle);
  }, [
    leftJoystickPosition.x,
    leftJoystickPosition.y,
    rightJoystickPosition.x,
    rightJoystickPosition.y,
  ]);

  // set tilt angle
  React.useEffect(() => {
    const distanceY = rightJoystickPosition.y + leftJoystickPosition.y;

    Animated.timing(animationValue, {
      toValue: distanceY / 2,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [animationValue, leftJoystickPosition.y, rightJoystickPosition.y]);

  // angles haptic feedback
  React.useEffect(() => {
    const angle = rotationAngle < 0 ? 360 + rotationAngle : rotationAngle;
    const prevAngle =
      prevRotationAngle < 0 ? 360 + prevRotationAngle : prevRotationAngle;
    if (
      ANGLES.includes(Number(angle?.toFixed(0))) &&
      !ANGLES.includes(Number(prevAngle?.toFixed(0)))
    ) {
      Vibration.vibrate(10);
    }
  }, [prevRotationAngle, rotationAngle]);

  return (
    <View style={tw`flex-1`}>
      <Text
        style={tw`font-light uppercase text-center text-2xl font-semibold text-black/75 dark:text-white/75 py-10`}>
        Ray's Drone
      </Text>

      <View style={tw`flex-1`}/>

      <Animated.View
        style={[
          tw``,
          {marginBottom: (width / 1.4) * -1},
          {
            transform: [],
          },
        ]}>
        {/* Center Tick */}
        <View
          style={[
            tw`w-px mb-8 h-8 bg-black/50 dark:bg-white/50 mx-auto z-5`,
            {transform: [{perspective: 1000}, {rotateX: '35deg'}]},
          ]}
        />

        {/* Dial */}
        <Animated.View
          style={[
            tw`bg-black/3 dark:bg-white/3 w-full rounded-full relative`,
            {
              height: width,
              transform: [
                {rotate: `${rotationAngle}deg`},
                {perspective: 1000},
                {rotateX: interpolatedValue},
                {scale: 1.4},
              ],
            },
          ]}>
          {/* Dial Ticks */}
          {ANGLES.map(each => (
            <View
              key={each}
              style={[
                tw`w-px ml-[-0.5px] h-full absolute left-1/2`,
                {transform: [{rotate: each + 'deg'}]},
              ]}>
              <View
                style={[
                  tw`w-full h-2 mt-8`,
                  each === 0
                    ? tw`bg-red-500/50`
                    : tw`bg-black/50 dark:bg-white/50`,
                ]}
              />
            </View>
          ))}
        </Animated.View>
      </Animated.View>

      <View style={[tw``, {marginTop: 0}]}>
        <View style={tw`flex flex-row mb-20`}>
          {/* Left Joystick */}
          <View style={tw`w-1/2 flex items-center justify-center py-14`}>
            <Joystick
              key="left"
              size={JOYSTICK_SIZE}
              onMove={handleLeftJoystickMove}
              // tooltip={`${leftJoystickPosition.x?.toFixed(
              //   2,
              // )}, ${leftJoystickPosition.y?.toFixed(2)}`}
              axisEnabled={['y']}
            />
          </View>

          {/* Divider */}
          {/*<Animated.View*/}
          {/*  style={[*/}
          {/*    tw`h-full w-px bg-black/5 dark:bg-white/5`,*/}
          {/*    {*/}
          {/*      transform: [*/}
          {/*        {rotate: `${rotationAngle}deg`},*/}
          {/*        {perspective: 1000},*/}
          {/*        {rotateX: interpolatedValue},*/}
          {/*      ],*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*/>*/}

          {/* Right Joystick */}
          <View style={tw`w-1/2 flex items-center justify-center py-10`}>
            <Joystick
              key="right"
              size={JOYSTICK_SIZE}
              onMove={handleRightJoystickMove}
              // tooltip={`${rightJoystickPosition.x?.toFixed(
              //   2,
              // )}, ${rightJoystickPosition.y?.toFixed(2)}`}
              axisEnabled={['x']}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
