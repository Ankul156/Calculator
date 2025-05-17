import React, { useState, useEffect } from 'react';
import Display from './Display';
import Keypad from './Keypad';
import History from './History';
import { calculateResult } from '../utils/calculatorLogic';

const Calculator: React.FC = () => {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState<number>(0);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/\d/.test(e.key)) {
        handleDigit(e.key);
      } else if (['+', '-', '*', '/'].includes(e.key)) {
        handleOperator(e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        handleEquals();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        handleClear();
      } else if (e.key === '.') {
        handleDecimal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentValue, previousValue, operator, waitingForOperand]);

  const handleDigit = (digit: string) => {
    if (waitingForOperand) {
      setCurrentValue(digit);
      setWaitingForOperand(false);
    } else {
      setCurrentValue(currentValue === '0' ? digit : currentValue + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setCurrentValue('0.');
      setWaitingForOperand(false);
    } else if (!currentValue.includes('.')) {
      setCurrentValue(currentValue + '.');
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(currentValue);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operator) {
      const result = calculateResult(parseFloat(previousValue), inputValue, operator);
      setPreviousValue(String(result));
      setCurrentValue(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    if (previousValue === null || operator === null) {
      return;
    }

    const inputValue = parseFloat(currentValue);
    const result = calculateResult(parseFloat(previousValue), inputValue, operator);

    const calculation = `${previousValue} ${operator} ${currentValue} = ${result}`;
    setHistory(prev => [...prev, calculation]);

    setCurrentValue(String(result));
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const handleClear = () => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleBackspace = () => {
    if (waitingForOperand) return;

    setCurrentValue(
      currentValue.length === 1 ? '0' : currentValue.slice(0, -1)
    );
  };

  const handlePercentage = () => {
    const value = parseFloat(currentValue);
    setCurrentValue(String(value / 100));
  };

  const handleToggleSign = () => {
    const value = parseFloat(currentValue);
    setCurrentValue(String(-value));
  };

  const handleMemoryAdd = () => {
    setMemory(memory + parseFloat(currentValue));
  };

  const handleMemorySubtract = () => {
    setMemory(memory - parseFloat(currentValue));
  };

  const handleMemoryRecall = () => {
    setCurrentValue(String(memory));
    setWaitingForOperand(false);
  };

  const handleMemoryClear = () => {
    setMemory(0);
  };

  const handleHistoryItem = (calculation: string) => {
    const result = calculation.split(' = ')[1];
    setCurrentValue(result);
    setShowHistory(false);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="calculator-container relative">
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-3xl border border-gray-700 shadow-2xl overflow-hidden w-full max-w-sm mx-auto transition-all duration-300 ease-in-out transform hover:scale-[1.02]">
        <Display 
          value={currentValue} 
          expression={previousValue && operator ? `${previousValue} ${operator}` : ''} 
          toggleHistory={toggleHistory}
          historyCount={history.length}
        />
        <Keypad 
          onDigit={handleDigit}
          onDecimal={handleDecimal}
          onOperator={handleOperator}
          onEquals={handleEquals}
          onClear={handleClear}
          onBackspace={handleBackspace}
          onPercentage={handlePercentage}
          onToggleSign={handleToggleSign}
          onMemoryAdd={handleMemoryAdd}
          onMemorySubtract={handleMemorySubtract}
          onMemoryRecall={handleMemoryRecall}
          onMemoryClear={handleMemoryClear}
          hasMemory={memory !== 0}
        />
      </div>
      
      {showHistory && history.length > 0 && (
        <History 
          history={history} 
          onSelectItem={handleHistoryItem} 
          onClose={() => setShowHistory(false)} 
        />
      )}
    </div>
  );
};

export default Calculator;