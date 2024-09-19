function media(){

var nome =  prompt("Nome do Aluno");
var nota1 = parseFloat(prompt("Nome 1 do Aluno"));
var nota2 = parseFloat(prompt("Nome 2 do Aluno"));
var nota3 = parseFloat(prompt("Nome 3 do Aluno"));
var nota4 = parseFloat(prompt("Nome 4 do Aluno"));

var media = (nota1 + nota2 + nota3 + nota4) / 4;



alert ("A média do " + nome + " é: " + media.toFixed(2));

}