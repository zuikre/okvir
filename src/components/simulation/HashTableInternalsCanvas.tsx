import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface Entry {
  hash: number;
  key: string;
  value: string;
}

export const HashTableInternalsCanvas: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [indices, setIndices] = useState<number[]>(Array(8).fill(-1));
  const [inputKey, setInputKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [log, setLog] = useState<string[]>([]);

  const tableSize = indices.length;
  const loadFactor = entries.length / tableSize;

  const simpleHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey || loadFactor >= 2/3) return; // Prevent insertion if threshold reached

    const hash = simpleHash(inputKey);
    let idx = hash % tableSize;
    let perturb = hash;
    let probeCount = 0;

    const newIndices = [...indices];
    const newLog = [...log];

    newLog.push(`Inserting '${inputKey}' (hash: ${hash})`);
    
    while (newIndices[idx] !== -1 && entries[newIndices[idx]]?.key !== inputKey) {
      newLog.push(`Collision at index ${idx}. Probing...`);
      idx = (5 * idx + 1 + perturb) % tableSize;
      perturb >>= 5;
      probeCount++;
      if (probeCount > tableSize) break; // Infinite loop safety
    }

    if (newIndices[idx] === -1 || entries[newIndices[idx]]?.key === inputKey) {
      newLog.push(`Mapped to index ${idx}`);
      const entryIdx = entries.length;
      newIndices[idx] = entryIdx;
      setEntries([...entries, { hash, key: inputKey, value: inputValue || 'val' }]);
      setIndices(newIndices);
    }

    setLog(newLog.slice(-5));
    setInputKey('');
    setInputValue('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-lg border border-slate-700 text-slate-200 p-4 font-mono text-sm">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-bold text-amber-400">Hash Table Internals (Compact Dict)</h3>
        <p className="text-slate-400">Indices Table & Compact Entries Array</p>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex-1">
          <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
            <div 
              className={`h-full ${loadFactor >= 0.66 ? 'bg-red-500' : 'bg-green-500'}`} 
              style={{ width: `${Math.min(100, loadFactor * 100)}%` }}
            ></div>
          </div>
          <div className="text-xs text-slate-400 mt-1 flex justify-between">
            <span>Load Factor: {(loadFactor * 100).toFixed(0)}%</span>
            <span>Threshold: 66% (2/3)</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleInsert} className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Key"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          className="flex-1 bg-slate-800 border border-slate-600 rounded p-2 text-slate-200"
          disabled={loadFactor >= 2/3}
        />
        <input
          type="text"
          placeholder="Value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-24 bg-slate-800 border border-slate-600 rounded p-2 text-slate-200"
          disabled={loadFactor >= 2/3}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white disabled:opacity-50"
          disabled={loadFactor >= 2/3}
        >
          Insert
        </button>
        <button
          type="button"
          onClick={() => { setEntries([]); setIndices(Array(8).fill(-1)); setLog([]); }}
          className="bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded text-slate-300"
        >
          <RotateCcw size={16} />
        </button>
      </form>

      <div className="flex-1 grid grid-cols-2 gap-4">
        <div className="border border-slate-600 rounded p-3 bg-slate-800">
          <h4 className="text-cyan-400 border-b border-slate-600 pb-1 mb-2">Indices Table (Sparse)</h4>
          <div className="grid grid-cols-2 gap-2">
            {indices.map((entryIdx, i) => (
              <div key={i} className="flex justify-between p-1 bg-slate-700 border border-slate-600 rounded text-xs">
                <span className="text-slate-400">[{i}]</span>
                <span className={entryIdx === -1 ? 'text-slate-500' : 'text-pink-400'}>
                  {entryIdx === -1 ? '--' : entryIdx}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-slate-600 rounded p-3 bg-slate-800">
          <h4 className="text-purple-400 border-b border-slate-600 pb-1 mb-2">Entries Array (Dense)</h4>
          <div className="space-y-2">
            {entries.length === 0 ? (
              <div className="text-slate-500 text-center py-4">Empty</div>
            ) : (
              entries.map((entry, i) => (
                <div key={i} className="p-2 bg-slate-700 border border-slate-600 rounded text-xs">
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Index: {i}</span>
                    <span>Hash: {entry.hash}</span>
                  </div>
                  <div className="flex justify-between text-amber-300">
                    <span>{entry.key}</span>
                    <span>{entry.value}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 h-24 overflow-y-auto bg-black rounded p-2 text-xs text-green-400 font-mono border border-slate-700">
        {log.map((line, i) => (
          <div key={i}>&gt; {line}</div>
        ))}
        {log.length === 0 && <div className="text-slate-600">Event log ready...</div>}
      </div>
    </div>
  );
};
