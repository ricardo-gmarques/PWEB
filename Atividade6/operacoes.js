var numero1;
var numero2;

numero1 = parseFloat(prompt("Digite o primeiro número"));
numero2 = parseFloat(prompt("Digite o segundo número"));

var soma = numero1 + numero2;
var subtracao = numero1 - numero2;
var produto = numero1 * numero2;
var divisao = numero1 / numero2
var resto = numero1 % numero2;

alert(`Soma=${soma} \nSubtração=${subtracao} \nProduto=${produto} \nDivisão=${divisao.toFixed(2)} \nResto=${resto}`);