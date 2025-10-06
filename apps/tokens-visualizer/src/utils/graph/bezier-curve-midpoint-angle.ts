export function bezierCurveMidpointAngle(
  startX: number,
  startY: number,
  startHandleX: number,
  startHandleY: number,
  endHandleX: number,
  endHandleY: number,
  endX: number,
  endY: number,
) {
  // Calculate the tangent at the midpoint of the Bezier curve
  const tangentX =
    (-3 * startX + 9 * startHandleX - 9 * endX + 3 * endHandleX) / 8;
  const tangentY =
    (-3 * startY + 9 * startHandleY - 9 * endY + 3 * endHandleY) / 8;
  // Calculate the angle of the tangent in radians ( adding PI to flip 180 )
  const rad = Math.atan2(tangentY, tangentX) + Math.PI;
  // Return the angle of the tangent in degrees
  return (rad * 180) / Math.PI;
}
