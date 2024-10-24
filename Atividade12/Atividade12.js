//Exercicio 1:
var base = prompt("Insira o valor da base (m)");
var altura = prompt("Insira o valor da altura (m)");

function Retangulo(x, y) {
    this.base = x;
    this.altura = y;
    this.calculaArea = function () {
        return this.base * this.altura;
    }
}

var retangulo = new Retangulo(base, altura);
alert(`Área do retângulo: ${retangulo.calculaArea()} m²`);


//Exercicio 2:
class Conta {
    constructor() {
        this._nomeCorrentista;
        this._banco;
        this._numeroConta;
        this._saldo;
    }

    set nomeCorrentista(value) {
        this._nomeCorrentista = value;
    }
    get nomeCorrentista() {
        return this._nomeCorrentista;
    }

    set banco(value) {
        this._banco = value;
    }
    get banco() {
        return this._banco;
    }

    set numeroConta(value) {
        this._numeroConta = value;
    }
    get numeroConta() {
        return this._numeroConta;
    }

    set saldo(value) {
        this._saldo = parseFloat(value); 
    }
    get saldo() {
        return this._saldo;
    }
}

class Corrente extends Conta {
    constructor() {
        super();
        this._saldoEspecial;
    }

    set saldoEspecial(value) {
        this._saldoEspecial = parseFloat(value); 
    }
    get saldoEspecial() {
        return this._saldoEspecial;
    }
}

class Poupanca extends Conta {
    constructor() {
        super();
        this._juros;
        this._dataVencimento;
    }

    set juros(value) {
        this._juros = value;
    }
    get juros() {
        return this._juros;
    }

    set dataVencimento(value) {
        this._dataVencimento = value;
    }
    get dataVencimento() {
        return this._dataVencimento;
    }
}


var nomeCorrente = prompt("Insira o seu nome: ");
var bancoCorrente = prompt("Insira qual o seu banco: ");
var numContaCorrente = prompt("Insira o número da sua conta corrente: ");
var saldoCorrente = prompt("Insira o seu saldo: ");
var saldoEspecial = prompt("Insira o seu saldo especial: ");

var objContaCorrente = new Corrente();
objContaCorrente.nomeCorrentista = nomeCorrente;
objContaCorrente.banco = bancoCorrente;
objContaCorrente.numeroConta = numContaCorrente;
objContaCorrente.saldo = saldoCorrente;
objContaCorrente.saldoEspecial = saldoEspecial;

alert(`Conta Corrente
    \nNome: ${objContaCorrente.nomeCorrentista} 
    \nBanco: ${objContaCorrente.banco}
    \nNúmero da Conta: ${objContaCorrente.numeroConta}
    \nSaldo: ${objContaCorrente.saldo}
    \nSaldo Especial: ${objContaCorrente.saldoEspecial}`);


var nomePoupanca = prompt("Insira o seu nome: ");
var bancoPoupanca = prompt("Insira qual o seu banco: ");
var numContaPoupanca = prompt("Insira o número da sua conta poupança: ");
var saldoPoupanca = prompt("Insira o seu saldo: ");
var juros = prompt("Insira os juros: ");
var dataVencimento = prompt("Insira a data de vencimento: ");

var objContaPoupanca = new Poupanca();
objContaPoupanca.nomeCorrentista = nomePoupanca;
objContaPoupanca.banco = bancoPoupanca;
objContaPoupanca.numeroConta = numContaPoupanca;
objContaPoupanca.saldo = saldoPoupanca;
objContaPoupanca.juros = juros;
objContaPoupanca.dataVencimento = dataVencimento;

alert(`Conta Poupança
    \nNome: ${objContaPoupanca.nomeCorrentista} 
    \nBanco: ${objContaPoupanca.banco}
    \nNúmero da Conta: ${objContaPoupanca.numeroConta}
    \nSaldo: ${objContaPoupanca.saldo}
    \nJuros: ${objContaPoupanca.juros}
    \nData de Vencimento: ${objContaPoupanca.dataVencimento}`);
