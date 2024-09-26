function selecionarOpcao(jogada) {


    if (jogada === "pedra") {

        alert("Você escolheu " + jogada + "!");
        var computador = Math.floor((Math.random() * 3));
        if (computador === 0) { 
            alert("O computador escolheu pedra. Empate!");
        } else if (computador === 1) { 
            alert("O computador escolheu papel. Você perdeu!");
        } else { 
            alert("O computador escolheu tesoura. Você ganhou!");
        }


    } else if (jogada === "papel") {
        alert("Você escolheu " + jogada + "!");
        var computador = Math.floor(Math.random() * 3);
        if (computador === 0) { 
            alert("O computador escolheu pedra. Você ganhou!");
        } else if (computador === 1) { 
            alert("O computador escolheu papel. Empate!");
        } else { 
            alert("O computador escolheu tesoura. Você perdeu!");
        }
    } else if (jogada === "tesoura") {
        alert("Você escolheu " + jogada + "!");
        var computador = Math.floor(Math.random() * 3);
        if (computador === 0) { 
            alert("O computador escolheu pedra. Você perdeu!");
        } else if (computador === 1) { 
            alert("O computador escolheu papel. Você ganhou!");
        } else { 
            alert("O computador escolheu tesoura. Empate!");
        }
    } else {
        alert("Escolha inválida. Tente novamente.");
    }
}
