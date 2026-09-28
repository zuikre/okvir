import React from 'react';
import type { Point2D } from './geometry';

export interface ConnectorEdge {
  id: string;
  fromId: string;
  toId: string;
  pathD: string;
  isHighlighted: boolean;
  isOriginMastered: boolean;
  isDestMastered: boolean;
  isDestAvailable: boolean;
  isSourceHovered?: boolean;
}

interface ConstellationConnectorsProps {
  edges: ConnectorEdge[];
}

export const ConstellationConnectors: React.FC<ConstellationConnectorsProps> = ({ edges }) => {
  return (
    <>
      <defs>
        {/* Stable Arrowhead Markers with userSpaceOnUse so stroke width changes never distort or flash */}
        <marker
          id="dag-arrow-neutral"
          markerUnits="userSpaceOnUse"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M 1 2 L 8 5 L 1 8 z" fill="#52525b" />
        </marker>

        <marker
          id="dag-arrow-source-active"
          markerUnits="userSpaceOnUse"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto"
        >
          <path d="M 1 2 L 8 5 L 1 8 z" fill="#38bdf8" />
        </marker>

        <marker
          id="dag-arrow-prereq-active"
          markerUnits="userSpaceOnUse"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto"
        >
          <path d="M 1 2 L 8 5 L 1 8 z" fill="#f59e0b" />
        </marker>

        <marker
          id="dag-arrow-mastered-edge"
          markerUnits="userSpaceOnUse"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto"
        >
          <path d="M 1 2 L 8 5 L 1 8 z" fill="#10b981" />
        </marker>

        <filter id="edge-glow-blue" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
      </defs>

      {edges.map((edge) => {
        const {
          id,
          pathD,
          isHighlighted,
          isOriginMastered,
          isDestMastered,
          isDestAvailable,
          isSourceHovered,
        } = edge;

        const isFlowing = isOriginMastered && isDestAvailable;
        const isCompleted = isOriginMastered && isDestMastered;

        // Base stroke color
        const strokeColor = isHighlighted
          ? isSourceHovered
            ? '#38bdf8'
            : '#f59e0b'
          : isCompleted
          ? '#10b981'
          : isFlowing
          ? '#38bdf8'
          : isOriginMastered
          ? 'rgba(16, 185, 129, 0.45)'
          : 'var(--border-subtle)';

        // Arrow marker reference
        const markerUrl = isHighlighted
          ? isSourceHovered
            ? 'url(#dag-arrow-source-active)'
            : 'url(#dag-arrow-prereq-active)'
          : isCompleted
          ? 'url(#dag-arrow-mastered-edge)'
          : isFlowing
          ? 'url(#dag-arrow-source-active)'
          : 'url(#dag-arrow-neutral)';

        return (
          <g key={id}>
            {/* 1. Structural dark casing to eliminate crossing artifacts */}
            <path
              d={pathD}
              fill="none"
              stroke="var(--bg-surface)"
              strokeWidth={isHighlighted ? 7 : 5}
              strokeLinecap="round"
            />

            {/* 2. Soft ambient aura for highlighted or flowing paths */}
            {(isHighlighted || isFlowing) && (
              <path
                d={pathD}
                fill="none"
                stroke={isHighlighted ? (isSourceHovered ? '#38bdf8' : '#f59e0b') : '#38bdf8'}
                strokeWidth={isHighlighted ? 8 : 6}
                strokeLinecap="round"
                opacity={0.25}
                filter="url(#edge-glow-blue)"
              />
            )}

            {/* 3. STATIC BASE EDGE with stable markerEnd (NO strokeDasharray animation here to prevent WebKit arrow jitter/flashing bug!) */}
            <path
              d={pathD}
              fill="none"
              stroke={strokeColor}
              strokeWidth={isHighlighted ? 2.5 : isFlowing ? 2 : 1.5}
              strokeLinecap="round"
              markerEnd={markerUrl}
              opacity={isHighlighted ? 1.0 : isCompleted ? 0.85 : isFlowing ? 0.75 : 0.35}
            />

            {/* 4. SEPARATE OVERLAY FOR TRAVELING PHOTONS (Decoupled from markerEnd) */}
            {(isFlowing || isHighlighted) && (
              <path
                d={pathD}
                fill="none"
                stroke={isHighlighted ? '#ffffff' : '#38bdf8'}
                strokeWidth={1.5}
                strokeDasharray="5 15"
                strokeLinecap="round"
                className="river-flow"
                opacity={0.8}
                pointerEvents="none"
              />
            )}
          </g>
        );
      })}
    </>
  );
};
