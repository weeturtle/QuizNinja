import Vector from '../Vector';

// The initial speed of the ball
const MAGNITUTE = window.innerHeight * 0.00445;

// Utility function to generate an initial velocity for an arc
const generateArc = (givenAngle?: number): Vector => {
  // Generate a random number between 15 and 75
  const angle = givenAngle || Math.floor(Math.random() * 40) + 30;

  // Convert the angle to radians
  const angleInRadians = (angle * Math.PI) / 180;

  // Calculate the x and y components of the vector
  const x = Math.cos(angleInRadians) * MAGNITUTE;
  const y = -Math.sin(angleInRadians) * MAGNITUTE;

  // Return the vector with the calculated components
  return new Vector(x, y);
};

export default generateArc;