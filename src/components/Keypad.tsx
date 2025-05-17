import React from 'react';
import Button from './Button';
import { 
  Delete, 
  Percent, 
  Plus, 
  Minus, 
  X, 
  Divide, 
  Equal 
} from 'lucide-react';

interface KeypadProps {
  onDigit: (digit: string) => void;
  onDecimal: () => void;
  onOperator: (operator: string) => void;
  onEquals: () => void;
  onClear: () => void;
  onBackspace: () => void;
  onPercentage: () => void;
  onToggleSign: () => void;
  onMemoryAdd: () => void;
  onMemorySubtract: () => void;
  onMemoryRecall: () => void;
  onMemoryClear: () => void;
  hasMemory: boolean;
}

const Keypad: React.FC<KeypadProps> = ({
  onDigit,
  onDecimal,
  onOperator,
  onEquals,
  onClear,
  onBackspace,
  onPercentage,
  onToggleSign,
  onMemoryAdd,
  onMemorySubtract,
  onMemoryRecall,
  onMemoryClear,
  hasMemory
}) => {
  return (
    <div className="grid grid-cols-4 gap-1 p-2 bg-gray-900">
      {/* First row */}
      <Button
        onClick={onMemoryClear}
        variant="memory"
        className={`${!hasMemory ? 'opacity-50' : ''}`}
      >
        MC
      </Button>
      <Button
        onClick={onMemoryRecall}
        variant="memory"
        className={`${!hasMemory ? 'opacity-50' : ''}`}
      >
        MR
      </Button>
      <Button onClick={onMemoryAdd} variant="memory">
        M+
      </Button>
      <Button onClick={onMemorySubtract} variant="memory">
        M-
      </Button>

      {/* Second row */}
      <Button onClick={onClear} variant="function">
        C
      </Button>
      <Button onClick={onToggleSign} variant="function">
        +/-
      </Button>
      <Button onClick={onPercentage} variant="function">
        <Percent size={18} />
      </Button>
      <Button onClick={() => onOperator('/')} variant="operator">
        <Divide size={18} />
      </Button>

      {/* Third row */}
      <Button onClick={() => onDigit('7')}>7</Button>
      <Button onClick={() => onDigit('8')}>8</Button>
      <Button onClick={() => onDigit('9')}>9</Button>
      <Button onClick={() => onOperator('*')} variant="operator">
        <X size={18} />
      </Button>

      {/* Fourth row */}
      <Button onClick={() => onDigit('4')}>4</Button>
      <Button onClick={() => onDigit('5')}>5</Button>
      <Button onClick={() => onDigit('6')}>6</Button>
      <Button onClick={() => onOperator('-')} variant="operator">
        <Minus size={18} />
      </Button>

      {/* Fifth row */}
      <Button onClick={() => onDigit('1')}>1</Button>
      <Button onClick={() => onDigit('2')}>2</Button>
      <Button onClick={() => onDigit('3')}>3</Button>
      <Button onClick={() => onOperator('+')} variant="operator">
        <Plus size={18} />
      </Button>

      {/* Sixth row */}
      <Button onClick={() => onDigit('0')} className="col-span-1">
        0
      </Button>
      <Button onClick={onDecimal}>.</Button>
      <Button onClick={onBackspace} variant="function">
        <Delete size={18} />
      </Button>
      <Button onClick={onEquals} variant="equals">
        <Equal size={18} />
      </Button>
    </div>
  );
};

export default Keypad;