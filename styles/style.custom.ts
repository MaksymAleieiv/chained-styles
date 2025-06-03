export const StyleCustom = {
  Hidden: {
    overflow: 'hidden',
  },
  Rotate: (degrees: number) => ({
    transform: `rotate(${degrees}deg)`,
  }),
  AbsoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  AbsoluteCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  RoundRadius: {
    borderRadius: '50%',
  },
};
