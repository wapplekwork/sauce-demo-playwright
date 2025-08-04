// Remove unused variables and use proper naming
function calculate(firstNumber: number, secondNumber: number): number {
  return firstNumber + secondNumber;
}

// Use the function properly
const result = calculate(5, 10);
console.log(result); // Outputs: 15

// Example with proper variable usage
const a = 1;
const b = 2;
const c = calculate(a, b);
console.log(`Sum of ${a} and ${b} is: ${c}`);