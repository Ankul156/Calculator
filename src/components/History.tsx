import React from 'react';
import { X } from 'lucide-react';

interface HistoryProps {
  history: string[];
  onSelectItem: (item: string) => void;
  onClose: () => void;
}

const History: React.FC<HistoryProps> = ({ history, onSelectItem, onClose }) => {
  return (
    <div className="absolute top-0 right-0 w-full h-full max-w-sm bg-gray-800 bg-opacity-95 backdrop-blur-sm rounded-3xl border border-gray-700 shadow-2xl z-10 overflow-hidden animate-slideIn">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-lg font-medium text-white">Calculation History</h2>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          <X size={20} />
        </button>
      </div>
      <div className="p-2 max-h-[60vh] overflow-y-auto">
        {history.length === 0 ? (
          <p className="text-gray-400 text-center p-4">No history yet</p>
        ) : (
          <ul>
            {history.map((calculation, index) => (
              <li key={index}>
                <button
                  onClick={() => onSelectItem(calculation)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-gray-200"
                >
                  <div className="text-sm text-gray-400">{calculation.split(' = ')[0]}</div>
                  <div className="text-lg font-medium">= {calculation.split(' = ')[1]}</div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default History;