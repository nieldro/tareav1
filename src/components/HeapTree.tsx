import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type HeapValue = number | string;

interface HeapTreeProps {
  array: HeapValue[];
  highlightIndices?: number[];
  sortedIndices?: number[];
  comparingIndices?: number[];
  maxDepth?: number;
}

export function HeapTree({ array, highlightIndices = [], sortedIndices = [], comparingIndices = [] }: HeapTreeProps) {
  if (array.length === 0) return null;

  const depth = Math.ceil(Math.log2(array.length + 1));
  const positions: { x: number; y: number }[] = [];

  for (let i = 0; i < array.length; i++) {
    const level = Math.floor(Math.log2(i + 1));
    const posInLevel = i - (Math.pow(2, level) - 1);
    const nodesInLevel = Math.pow(2, level);
    const width = 100;
    const x = ((posInLevel + 0.5) / nodesInLevel) * width;
    const y = level * 70 + 30;
    positions.push({ x, y });
  }

  const svgHeight = depth * 70 + 60;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 100 ${svgHeight}`} className="w-full max-w-lg mx-auto" style={{ minWidth: 280 }}>
        {array.map((_, i) => {
          const left = 2 * i + 1;
          const right = 2 * i + 2;
          return (
            <g key={`lines-${i}`}>
              {left < array.length && (
                <line
                  x1={`${positions[i].x}%`}
                  y1={positions[i].y}
                  x2={`${positions[left].x}%`}
                  y2={positions[left].y}
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                />
              )}
              {right < array.length && (
                <line
                  x1={`${positions[i].x}%`}
                  y1={positions[i].y}
                  x2={`${positions[right].x}%`}
                  y2={positions[right].y}
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                />
              )}
            </g>
          );
        })}

        {array.map((val, i) => {
          const label = String(val);
          const textSizeClass = label.length > 2 ? "text-[3.5px]" : "text-[5px]";
          const radius = label.length > 2 ? 14 : 12;

          return (
            <motion.g
              key={`node-${i}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 300 }}
            >
              <circle
                cx={`${positions[i].x}%`}
                cy={positions[i].y}
                r={radius}
                className={cn(
                  "transition-all duration-300",
                  sortedIndices.includes(i)
                    ? "fill-success"
                    : comparingIndices.includes(i)
                      ? "fill-secondary"
                      : highlightIndices.includes(i)
                        ? "fill-accent"
                        : "fill-primary",
                )}
              />
              <text
                x={`${positions[i].x}%`}
                y={positions[i].y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cn("fill-primary-foreground font-bold font-display", textSizeClass)}
              >
                {label}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
