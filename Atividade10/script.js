function calcularIMC(altura, peso) {
    return (peso / Math.pow(altura, 2)).toFixed(2);
}

function classificarIMC(imc) {
    if (imc < 18.5) {
        return "Magreza";
    } else if (imc >= 18.5 && imc <= 24.9) {
        return "Normal";
    } else if (imc >= 25 && imc <= 29.9) {
        return "Sobrepeso";
    } else if (imc >= 30 && imc <= 39.9) {
        return "Obesidade";
    } else {
        return "Obesidade Grave";
    }
}

function exibirResultado() {
    const altura = parseFloat(document.getElementById("altura").value);
    const peso = parseFloat(document.getElementById("peso").value);

    if (isNaN(altura) || isNaN(peso)) {
        alert("Por favor, insira valores válidos para altura e peso.");
        return;
    }

    const imc = calcularIMC(altura, peso);
    const classificacao = classificarIMC(imc);

    document.getElementById("imc").textContent = imc;
    document.getElementById("classificacao").textContent = classificacao;
}
