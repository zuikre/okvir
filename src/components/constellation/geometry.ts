/**
 * Constellation & DAG Graph Geometry Engine
 * Provides ray-box perimeter intersection, adaptive cubic Bézier tangency,
 * and stable coordinate transformations for Okvir's visual knowledge graphs.
 */

export interface Point2D {
  x: number;
  y: number;
}

export interface Box2D {
  cx: number;
  cy: number;
  width: number;
  height: number;
}

/**
 * Calculates the exact intersection point where a ray from box center (cx, cy)
 * towards an external target point (tx, ty) intersects the box's perimeter.
 */
export function getBoxPerimeterIntersection(box: Box2D, target: Point2D): Point2D {
  const dx = target.x - box.cx;
  const dy = target.y - box.cy;

  if (Math.abs(dx) < 1e-6 && Math.abs(dy) < 1e-6) {
    return { x: box.cx, y: box.cy };
  }

  const halfW = box.width / 2;
  const halfH = box.height / 2;

  // Determine which face (horizontal or vertical) the ray intersects first
  const scaleX = halfW / Math.abs(dx || 1e-6);
  const scaleY = halfH / Math.abs(dy || 1e-6);

  const scale = Math.min(scaleX, scaleY);

  return {
    x: box.cx + dx * scale,
    y: box.cy + dy * scale,
  };
}

/**
 * Generates an adaptive, smooth cubic Bézier spline path string between two nodes.
 * Automatically aligns control points based on topological relative positions.
 */
export function generateCurvedEdgePath(
  fromBox: Box2D,
  toBox: Box2D,
  preferVertical: boolean = true
): {
  pathD: string;
  startPoint: Point2D;
  endPoint: Point2D;
  ctrl1: Point2D;
  ctrl2: Point2D;
} {
  const deltaX = toBox.cx - fromBox.cx;
  const deltaY = toBox.cy - fromBox.cy;

  let startPoint: Point2D;
  let endPoint: Point2D;
  let ctrl1: Point2D;
  let ctrl2: Point2D;

  if (preferVertical && deltaY > 30) {
    // Standard downward flow: exit bottom of source, enter top of destination
    startPoint = { x: fromBox.cx, y: fromBox.cy + fromBox.height / 2 };
    endPoint = { x: toBox.cx, y: toBox.cy - toBox.height / 2 };

    const dy = endPoint.y - startPoint.y;
    const curvature = Math.max(30, dy * 0.45);

    ctrl1 = { x: startPoint.x, y: startPoint.y + curvature };
    ctrl2 = { x: endPoint.x, y: endPoint.y - curvature };
  } else if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal dominant: exit lateral edge, enter lateral edge
    if (deltaX > 0) {
      startPoint = { x: fromBox.cx + fromBox.width / 2, y: fromBox.cy };
      endPoint = { x: toBox.cx - toBox.width / 2, y: toBox.cy };
    } else {
      startPoint = { x: fromBox.cx - fromBox.width / 2, y: fromBox.cy };
      endPoint = { x: toBox.cx + toBox.width / 2, y: toBox.cy };
    }

    const dx = endPoint.x - startPoint.x;
    const curvature = Math.abs(dx) * 0.5;

    ctrl1 = { x: startPoint.x + (deltaX > 0 ? curvature : -curvature), y: startPoint.y };
    ctrl2 = { x: endPoint.x - (deltaX > 0 ? curvature : -curvature), y: endPoint.y };
  } else {
    // General ray-box perimeter dock
    startPoint = getBoxPerimeterIntersection(fromBox, { x: toBox.cx, y: toBox.cy });
    endPoint = getBoxPerimeterIntersection(toBox, { x: fromBox.cx, y: fromBox.cy });

    const mx = (startPoint.x + endPoint.x) / 2;
    const my = (startPoint.y + endPoint.y) / 2;

    ctrl1 = { x: (startPoint.x + mx) / 2, y: startPoint.y + (endPoint.y - startPoint.y) * 0.25 };
    ctrl2 = { x: (endPoint.x + mx) / 2, y: endPoint.y - (endPoint.y - startPoint.y) * 0.25 };
  }

  const pathD = `M ${startPoint.x.toFixed(1)} ${startPoint.y.toFixed(1)} C ${ctrl1.x.toFixed(1)} ${ctrl1.y.toFixed(1)}, ${ctrl2.x.toFixed(1)} ${ctrl2.y.toFixed(1)}, ${endPoint.x.toFixed(1)} ${endPoint.y.toFixed(1)}`;

  return { pathD, startPoint, endPoint, ctrl1, ctrl2 };
}
