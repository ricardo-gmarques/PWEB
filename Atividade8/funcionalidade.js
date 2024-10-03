let idade,
    somaIdade = 0, 
    contador = 0,
    genero,
    avaliacao,
    idadeMaxima = 0,
    idadeMinima = 150, 
    qtdPessimo = 0,
    percentualBomOtimo = 0,
    qtdMulheres = 0,
    qtdHomens = 0;

function registrarDados() {
    if (contador < 45) {
        if (document.getElementById('campoIdade').value === '') {
            alert("O campo idade deve ser preenchido.");
        } else if (!document.getElementById('Feminino').checked && !document.getElementById('Masculino').checked) {
            alert("Selecione o gênero do entrevistado.");            
        } else if (!document.querySelector('input[name="nota"]:checked')) {
            alert("Por favor, indique sua avaliação sobre o filme.");
        } else {
            capturarIdade();
            capturarGenero();
            capturarOpiniao();
            reiniciar();
            contador++;
            document.getElementById('totalParticipantes').innerText = `Participantes contados: ${contador} de 45`;          
        }
    } else {
        alert("Limite total de respostas alcançado. Clique em 'Ver Resultados' para continuar."); 
    }
}

function capturarIdade() {     
    idade = Number.parseInt(document.getElementById('campoIdade').value);
    somaIdade += idade;

    if (idade > idadeMaxima) {
        idadeMaxima = idade;
    }

    if (idade < idadeMinima) {
        idadeMinima = idade;
    }
}

function capturarGenero() {
    if (document.querySelector('#Feminino').checked) {
        qtdMulheres++; 
    }

    if (document.querySelector('#Masculino').checked) {
        qtdHomens++;
    }
}

function capturarOpiniao() {
    if (document.querySelector('#notaOtimo').checked || document.querySelector('#notaBom').checked) {
        percentualBomOtimo++;
    }

    if (document.querySelector('#notaPessimo').checked) {
        qtdPessimo++;
    }
}

function reiniciar() {
    document.getElementById('campoIdade').value = "";
    document.querySelector('#Feminino').checked = false;
    document.querySelector('#Masculino').checked = false;
    document.querySelector('#notaOtimo').checked = false;
    document.querySelector('#notaBom').checked = false;
    document.querySelector('#notaRegular').checked = false;
    document.querySelector('#notaPessimo').checked = false;
    document.getElementById('resultadoTitulo').innerText = "";
    document.getElementById('resultadoTexto').innerText = "";
}

function exibirResultados() {    
    if (contador === 0) {
        alert("Não existem respostas inseridas!");
    } else {
        const mediaIdade = somaIdade / contador;
        const resultadoTitulo = contador < 45 ? "Resultado parcial" : "Resultado final";
        
        document.getElementById('resultadoTitulo').innerText = resultadoTitulo;
        document.getElementById('resultadoTexto').innerText = `
            Média das idades: ${mediaIdade.toFixed(2)}
            Idade do mais velho: ${idadeMaxima}
            Idade do mais novo: ${idadeMinima}
            Quantidade de avaliações "Péssimo": ${qtdPessimo}
            Percentual de opiniões "Bom ou Ótimo": ${(100 * percentualBomOtimo / contador).toFixed(2)}%
            Quantidade de mulheres: ${qtdMulheres}
            Quantidade de homens: ${qtdHomens}
        `;
    }
}
