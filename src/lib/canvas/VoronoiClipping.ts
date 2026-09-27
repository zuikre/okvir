// Vector-based Voronoi Tessellation via Sutherland-Hodgman Convex Half-Plane Clipping
// Generates sharp, zero-dependency, 120fps vector polygons for K-Means cluster partitions

export interface Vec2 {
  x: number;
  y: number;
}

// Clips convex polygon against the perpendicular bisector half-plane of (c1, c2)
// Retains the half-space closer to c1
export function clipPolygonHalfPlane(poly: Vec2[], c1: Vec2, c2: Vec2): Vec2[] {
  if (poly.length === 0) return [];
  const out: Vec2[] = [];

  // Midpoint and normal pointing towards c1
  const mx = (c1.x + c2.x) / 2;
  const my = (c1.y + c2.y) / 2;
  const nx = c1.x - c2.x;
  const ny = c1.y - c2.y;

  const isInside = (p: Vec2) => (p.x - mx) * nx + (p.y - my) * ny >= 0;

  for (let i = 0; i < poly.length; i++) {
    const curr = poly[i];
    const prev = poly[(i + poly.length - 1) % poly.length];

    const currIn = isInside(curr);
    const prevIn = isInside(prev);

    if (currIn) {
      if (!prevIn) {
        // Intersection of segment (prev, curr) with line (P - M) . N = 0
        const dx = curr.x - prev.x;
        const dy = curr.y - prev.y;
        const denom = dx * nx + dy * ny;
        if (Math.abs(denom) > 1e-9) {
          const t = ((mx - prev.x) * nx + (my - prev.y) * ny) / denom;
          out.push({ x: prev.x + t * dx, y: prev.y + t * dy });
        }
      }
      out.push(curr);
    } else if (prevIn) {
      const dx = curr.x - prev.x;
      const dy = curr.y - prev.y;
      const denom = dx * nx + dy * ny;
      if (Math.abs(denom) > 1e-9) {
        const t = ((mx - prev.x) * nx + (my - prev.y) * ny) / denom;
        out.push({ x: prev.x + t * dx, y: prev.y + t * dy });
      }
    }
  }
  return out;
}

// Computes all K Voronoi cells bounded within [minX, minY, maxX, maxY]
export function computeVoronoiPolygons(
  centroids: Vec2[],
  bounds: { minX: number; minY: number; maxX: number; maxY: number }
): Vec2[][] {
  const boundingBox: Vec2[] = [
    { x: bounds.minX, y: bounds.minY },
    { x: bounds.maxX, y: bounds.minY },
    { x: bounds.maxX, y: bounds.maxY },
    { x: bounds.minX, y: bounds.maxY },
  ];

  return centroids.map((c, i) => {
    let cell = [...boundingBox];
    for (let j = 0; j < centroids.length; j++) {
      if (i === j) continue;
      cell = clipPolygonHalfPlane(cell, c, centroids[j]);
      if (cell.length === 0) break;
    }
    return cell;
  });
}
