import React from 'react';
import { History } from 'lucide-react';

interface DisplayProps {
  value: string;
  expression: string;
  toggleHistory: () => void;
  historyCount: number;
}

const Display: React.FC<DisplayProps> = ({ value, expression, toggleHistory, historyCount }) => {
  // Format the displayed value to show commas for thousands
  const formatValue = (val: string) => {
    if (val.includes('.')) {
      const [intPart, decPart] = val.split('.');
      return `${Number(intPart).toLocaleString()}.${decPart}`;
    }
    return Number(val).toLocaleString();
  };

  return (
    <div className="bg-gray-900 p-6 h-[100px] relative">
      {historyCount > 0 && (
        <button 
          onClick={toggleHistory}
          className="absolute top-5 left-3 text-gray-400 hover:text-white transition-colors duration-200"
          aria-label="View calculation history"
        >
          <History size={25} />
        </button>
      )}
      
      <div className="text-right">
        {expression && (
          <div className="text-gray-400 text-sm h-5 mb-1 overflow-hidden whitespace-nowrap">
            {expression}
          </div>
        )}
        <div className="text-white text-4xl font-light tracking-wider overflow-x-auto whitespace-nowrap scrollbar-hide">
          {formatValue(value)}
        </div>
      </div>
    </div>
  );
};

export default Display;