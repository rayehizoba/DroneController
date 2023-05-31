const useGestureHandler = () => {
  const translationY = useValue(0);
  const velocityY = useValue(0);
  const state = useValue(State.UNDETERMINED);

  const gestureHandler = onGestureEvent({
    state,
    translationY,
    velocityY,
  });

  return {
    gestureHandler,
    translationY,
    velocityY,
    state,
  };
};

export default useGestureHandler;
