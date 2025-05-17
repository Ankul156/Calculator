export const calculateResult = (
  first: number, 
  second: number, 
  operator: string
): number => {
  switch (operator) {
    case '+':
      return first + second;
    case '-':
      return first - second;
    case '*':
      return first * second;
    case '/':
      return second !== 0 ? first / second : Infinity;
    default:
      return second;
  }
};