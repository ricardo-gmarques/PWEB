function maior() {
   
    var num1 = parseFloat(document.getElementById("numero1").value); 
    var num2 = parseFloat(document.getElementById("numero2").value);
    var num3 = parseFloat(document.getElementById("numero3").value);

    
    if (num1 > num2 && num1 > num3) {
        document.getElementById('resposta').innerText = 'O maior número é ' + num1;
    } else if (num2 > num3) {
        document.getElementById('resposta').innerText = 'O maior número é ' + num2;
    } else {
        document.getElementById('resposta').innerText = 'O maior número é ' + num3;
    }  
}


function ordenacao() {
    
    var num1 = parseFloat(document.getElementById("numero1").value); 
    var num2 = parseFloat(document.getElementById("numero2").value);
    var num3 = parseFloat(document.getElementById("numero3").value);

  
    var aux = num1;

    if (num1 > num2) {
        aux = num2;
        num2 = num1;
        num1 = aux;
    }

    if (num3 < num1) {
        aux = num3;
        num3 = num1;
        num1 = aux;
    }

    if (num3 < num2) {
        aux = num3;
        num3 = num2;
        num2 = aux;
    }

    
    document.getElementById('resposta').innerText = 'Ordem Crescente: ' + num1 + ' - ' + num2 + ' - ' + num3;
}


function verificaPalindromo() {
    var str = document.getElementById("stringInput").value.toUpperCase();
    var strInvertida = str.split('').reverse().join('');

    if (str === strInvertida) {
        document.getElementById('resposta').innerText = '"' + str + '" é um palíndromo.';
    } else {
        document.getElementById('resposta').innerText = '"' + str + '" não é um palíndromo.';
    }
}


function verificaTriangulo() {
    var lado1 = parseFloat(document.getElementById("lado1").value);
    var lado2 = parseFloat(document.getElementById("lado2").value);
    var lado3 = parseFloat(document.getElementById("lado3").value);

   
    if (lado1 + lado2 > lado3 && lado1 + lado3 > lado2 && lado2 + lado3 > lado1) {
        var tipo;

        if (lado1 === lado2 && lado2 === lado3) {
            tipo = 'equilátero';
        } else if (lado1 === lado2 || lado1 === lado3 || lado2 === lado3) {
            tipo = 'isósceles';
        } else {
            tipo = 'escaleno';
        }

        document.getElementById('resposta').innerText = 'Os lados formam um triângulo ' + tipo + '.';
    } else {
        document.getElementById('resposta').innerText = 'Os lados não formam um triângulo.';
    }
}
