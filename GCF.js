let factor = parseInt(prompt("Enter the first number: "));
let divisor = parseInt(prompt("Enter the second number: "));

function gcf(factor, divisor) {
  while (divisor !== 0) {
    let temp = divisor;
    divisor = factor % divisor;
    factor = temp;
  }
  return factor;
}

let result = gcf(factor, divisor);
console.log(result);
