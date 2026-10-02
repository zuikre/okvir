import React, { useState, useEffect } from 'react';

export const DynamicArrayGrowthLab: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const [size, setSize] = useState(0);
  const [prevSize, setPrevSize] = useState(0);
  const [flash, setFlash] = useState(false);

  const capacity = (() => {
    let currCap = 0;
    for (let s = 1; s <= size; s++) {
      if (s > currCap) {
        currCap = (s >> 3) + (s < 9 ? 3 : 6) + s;
      }
    }
    return currCap;
  })();

  const prevCapacity = (() => {
    let currCap = 0;
    for (let s = 1; s <= prevSize; s++) {
      if (s > currCap) {
        currCap = (s >> 3) + (s < 9 ? 3 : 6) + s;
      }
    }
    return currCap;
  })();

  useEffect(() => {
    if (capacity > prevCapacity) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 500);
      return () => clearTimeout(t);
    }
  }, [capacity, prevCapacity]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrevSize(size);
    setSize(parseInt(e.target.value));
  };

  const reallocOccurred = capacity > prevCapacity && size > prevSize;

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-lg border border-slate-700 text-slate-200 p-4 font-mono text-sm">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-bold text-amber-400">Dynamic Array Growth (PyListObject)</h3>
        <p className="text-slate-400">Memory Buffer Allocation Strategy</p>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-slate-400 mb-2">
          <span>Elements (Size): {size}</span>
          <span>Allocated Capacity: {capacity}</span>
        </div>
        <input
          type="range"
          min="0"
          max="32"
          value={size}
          onChange={handleSliderChange}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="flex-1 overflow-auto bg-slate-800 rounded border border-slate-600 p-4">
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: Math.max(capacity, 1) }).map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 flex items-center justify-center rounded border ${
                i < size
                  ? 'bg-blue-600 border-blue-400 text-white'
                  : 'bg-slate-700 border-slate-500 text-transparent'
              } ${flash && reallocOccurred ? 'animate-pulse bg-green-500 border-green-300' : ''}`}
            >
              {i < size ? i : ''}
            </div>
          ))}
        </div>

        {reallocOccurred && (
          <div className="mt-4 p-2 bg-amber-900/50 border border-amber-600 text-amber-300 rounded text-center">
            realloc() triggered! Array copied to new buffer (O(N) operation).
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-slate-400">
        <div className="bg-slate-800 p-2 rounded border border-slate-700">
          <strong>Amortized Cost:</strong> O(1)<br />
          Most append() operations just write to pre-allocated empty slots.
        </div>
        <div className="bg-slate-800 p-2 rounded border border-slate-700">
          <strong>Worst-case Cost:</strong> O(N)<br />
          When buffer fills, a new larger buffer is allocated and existing elements are copied.
        </div>
      </div>
    </div>
  );
};
