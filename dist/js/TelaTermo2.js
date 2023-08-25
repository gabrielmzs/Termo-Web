"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const JogoTermo_js_1 = require("./JogoTermo.js");
class TelaTermo2 {
    constructor() {
        this.linhaPalpite = 1;
        this.letraLinha = 1;
        this.palavraSecreta = '';
        this.palavras = [];
        this.jogoTermo = new JogoTermo_js_1.JogoTermo();
        this.RegistrarElementos();
        this.RegistrarEventos();
        this.VerificarLinhaDoPalpite();
        this.ObterNovaPalavraSecreta();
    }
    VerificarLinhaDoPalpite() {
        const inputs = this.pnlTermo.querySelectorAll("input");
        inputs.forEach(input => {
            input.disabled = true;
        });
    }
    ObterNovaPalavraSecreta() {
        return __awaiter(this, void 0, void 0, function* () {
            this.palavraSecreta = this.jogoTermo.ObterPalavraSecreta();
        });
    }
    RegistrarElementos() {
        this.pnlTermo = document.querySelector('#pnlTermo');
        this.linhas = Array.from(document.querySelectorAll('.linha'));
        this.letras = Array.from(document.querySelectorAll('.letra'));
        this.pnlTeclado = document.querySelector('#pnlTeclado');
        this.btnEnter = document.querySelector('#btnEnter');
        this.msgFinal = document.querySelector('.msgFinal');
        this.btnVoltar = document.querySelector('.btnVoltar');
        this.jogarNovamente = document.querySelector('.jogarNovamente');
    }
    RegistrarEventos() {
        for (let botao of this.pnlTeclado.children) {
            if (botao.textContent != "↤" && botao.textContent != 'Enter')
                botao.addEventListener("click", (sender) => this.darPalpite(sender));
        }
        this.btnEnter.addEventListener('click', () => this.ConfirmarPalpite());
        this.btnVoltar.addEventListener('click', () => this.ExcluirLetra());
        this.jogarNovamente.addEventListener('click', () => this.NovoJogo());
    }
    ExcluirLetra() {
        if (this.letraLinha > 1 && this.linhaPalpite <= 5) {
            const linhaDiv = this.linhas[this.linhaPalpite - 1]; // Seleciona a div "linha" correta
            this.letraLinha--;
            const letraDiv = linhaDiv.querySelectorAll('.letra')[this.letraLinha - 1]; // Seleciona a div "letra" correta
            letraDiv.textContent = "";
        }
    }
    ConfirmarPalpite() {
        let palavraPalpite = this.VerificarPalavraPalpite();
        if (palavraPalpite.length == 5 && this.VerificarPalavraExiste(palavraPalpite)) {
            for (let i = 0; i < 5; i++) {
                let resultado = this.AnalisarPalpite(palavraPalpite[i], i);
                this.DarDicas(palavraPalpite[i], resultado, i);
            }
            this.AnalisarResultado(palavraPalpite);
        }
        else if (palavraPalpite.length < 5)
            this.msgFinal.textContent = "A palavra está incompleta!";
        else if (!this.VerificarPalavraExiste(palavraPalpite))
            this.msgFinal.textContent = "A palavra não existe!";
    }
    AnalisarResultado(palavraPalpite) {
        if (this.VerificarVitoria(palavraPalpite)) {
            this.msgFinal.textContent = "Você Venceu! Parabéns!";
            this.jogarNovamente.style.visibility = 'visible';
        }
        else {
            this.linhaPalpite++;
            this.letraLinha = 1;
        }
        if (this.VerificarDerrota()) {
            this.msgFinal.textContent = "Você Perdeu! A palavra era " + this.palavraSecreta + ".";
            this.jogarNovamente.style.visibility = 'visible';
        }
    }
    NovoJogo() {
        this.LimparTela();
        this.RedefinirPosicoes();
        this.ObterNovaPalavraSecreta();
    }
    RedefinirPosicoes() {
        this.linhaPalpite = 1;
        this.letraLinha = 1;
    }
    LimparTela() {
        const botoes = Array.from(this.pnlTeclado.querySelectorAll('button'));
        for (const botao of botoes) {
            botao.style.backgroundColor = 'gray';
        }
        const letras = Array.from(this.pnlTermo.querySelectorAll('.letra'));
        for (const letra of letras) {
            const quadradoLetra = letra;
            quadradoLetra.textContent = '';
            quadradoLetra.style.backgroundColor = '#bebebe';
        }
        this.msgFinal.textContent = "";
    }
    VerificarDerrota() {
        return (this.linhaPalpite > 5);
    }
    VerificarPalavraExiste(palavraPalpite) {
        if (this.palavras.includes(palavraPalpite))
            return true;
        else
            return false;
    }
    VerificarVitoria(palavraPalpite) {
        if (palavraPalpite[0] == this.palavraSecreta[0] &&
            palavraPalpite[1] == this.palavraSecreta[1] &&
            palavraPalpite[2] == this.palavraSecreta[2] &&
            palavraPalpite[3] == this.palavraSecreta[3] &&
            palavraPalpite[4] == this.palavraSecreta[4])
            return true;
        else
            return false;
    }
    SelecionarBotao(letra) {
        const botoes = Array.from(this.pnlTeclado.querySelectorAll('button'));
        for (const botao of botoes) {
            if (botao.textContent === letra) {
                return botao;
            }
        }
        return null;
    }
    DarDicas(letra, resultado, posicao) {
        const letrasDaLinha = this.linhas[this.linhaPalpite - 1].querySelectorAll('.letra');
        letrasDaLinha.forEach((letraDiv, index) => {
            const botao = this.SelecionarBotao(letraDiv.textContent);
            const quadradoLetra = letraDiv;
            if (index === posicao) {
                switch (resultado) {
                    case 0:
                        quadradoLetra.style.backgroundColor = "black"; // Preto = não tem a letra na palavra
                        botao.style.backgroundColor = "black";
                        break;
                    case 1:
                        quadradoLetra.style.backgroundColor = "rgb(211, 173, 105)"; // Laranja = Letra na posição errada
                        botao.style.backgroundColor = "rgb(211, 173, 105)";
                        break;
                    case 2:
                        quadradoLetra.style.backgroundColor = "rgb(58, 163, 148)"; // Verde = Letra na posição correta
                        botao.style.backgroundColor = "rgb(58, 163, 148)";
                        break;
                }
            }
        });
    }
    AnalisarPalpite(palavraPalpite, posicao) {
        if (this.palavraSecreta.includes(palavraPalpite) && this.palavraSecreta[posicao] == palavraPalpite)
            return 2;
        else if (this.palavraSecreta.includes(palavraPalpite) && this.palavraSecreta[posicao] != palavraPalpite)
            return 1;
        else
            return 0;
    }
    darPalpite(sender) {
        var _a;
        const botaoClicado = sender.target;
        const palpite = botaoClicado.textContent;
        if (((_a = botaoClicado.textContent) === null || _a === void 0 ? void 0 : _a.length) == 1) {
            const palpite = botaoClicado.textContent;
            if (this.linhaPalpite <= 5) { // Garante que não ultrapasse o número de divs "linha"
                const linhaDiv = this.linhas[this.linhaPalpite - 1]; // Seleciona a div "linha" correta
                const letraDiv = linhaDiv.querySelectorAll('.letra')[this.letraLinha - 1]; // Seleciona a div "letra" correta
                letraDiv.textContent = palpite;
                this.letraLinha++; // Avança para a próxima div "letra"
            }
        }
    }
    VerificarPalavraPalpite() {
        let palavraPalpite = "";
        const letrasDaLinha = this.linhas[this.linhaPalpite - 1].querySelectorAll('.letra');
        letrasDaLinha.forEach(letraDiv => {
            palavraPalpite += letraDiv.textContent;
        });
        return palavraPalpite;
    }
}
exports.default = TelaTermo2;
// index.ts
const telaTermo2 = new TelaTermo2();
//# sourceMappingURL=TelaTermo2.js.map