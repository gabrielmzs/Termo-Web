

class Telatermo {

    pnlTermo: HTMLDivElement;
    linhas: HTMLDivElement[];
    letras: HTMLDivElement[];
    pnlTeclado: HTMLDivElement;
    btnEnter: HTMLButtonElement;
    linhaPalpite: number = 1;
    letraLinha: number = 1;
    palavraSecreta: string = '';
    palavras: string[] = [];
    msgFinal: HTMLElement;
    btnVoltar: HTMLButtonElement;
    jogarNovamente: HTMLButtonElement;


    constructor() {
        this.RegistrarElementos();
        this.RegistrarEventos();
        this.VerificarLinhaDoPalpite();
        this.ObterPalavraSecreta();

    }

    VerificarLinhaDoPalpite() {

        const inputs = this.pnlTermo.querySelectorAll("input");
        inputs.forEach(input => {
            input.disabled = true;
        });

    }

    async ObterPalavraSecreta() {
        const caminho = './Palavras.txt'

        const reposta = await fetch(caminho);
        const texto = await reposta.text();
        this.palavras = texto.split("\r\n");

        const indiceAleatorio = Math.floor(Math.random() * this.palavras.length);

        this.palavraSecreta = this.palavras[indiceAleatorio];
    }


    RegistrarElementos(): void {
        this.pnlTermo = document.querySelector('#pnlTermo') as HTMLDivElement;
        this.linhas = Array.from(document.querySelectorAll('.linha'));
        this.letras = Array.from(document.querySelectorAll('.letra'));

        this.pnlTeclado = document.querySelector('#pnlTeclado') as HTMLDivElement;
        this.btnEnter = document.querySelector('#btnEnter') as HTMLButtonElement;
        this.msgFinal = document.querySelector('.msgFinal') as HTMLElement;
        this.btnVoltar = document.querySelector('.btnVoltar') as HTMLButtonElement;
        this.jogarNovamente = document.querySelector('.jogarNovamente') as HTMLButtonElement;
    }



    RegistrarEventos(): void {
        for (let botao of this.pnlTeclado.children) {
            if (botao.textContent != "↤" && botao.textContent != 'Enter')
                botao.addEventListener("click", (sender) => this.darPalpite(sender));

        }

        this.btnEnter.addEventListener('click', () => this.ConfirmarPalpite());
        this.btnVoltar.addEventListener('click', () => this.ExcluirLetra());
        this.jogarNovamente.addEventListener('click', () => this.NovoJogo());

    }

    ExcluirLetra(): any {
        if (this.letraLinha > 1 && this.linhaPalpite <= 5) {

            const linhaDiv = this.linhas[this.linhaPalpite - 1]; // Seleciona a div "linha" correta
            this.letraLinha--;
            const letraDiv = linhaDiv.querySelectorAll('.letra')[this.letraLinha - 1]; // Seleciona a div "letra" correta
            letraDiv.textContent = "";


        }
    }

    ConfirmarPalpite(): any {
        let palavraPalpite: string = this.VerificarPalavraPalpite();

        if (palavraPalpite.length == 5 && this.VerificarPalavraExiste(palavraPalpite)) {

            for (let i = 0; i < 5; i++) {
                let resultado = this.AnalisarPalpite(palavraPalpite[i], i);
                this.DarDicas(palavraPalpite[i], resultado, i);
            }
            this.AnalisarResultado(palavraPalpite);
        }

        else if (palavraPalpite.length < 5) this.msgFinal.textContent = "A palavra está incompleta!";

        else if (!this.VerificarPalavraExiste(palavraPalpite)) this.msgFinal.textContent = "A palavra não existe!";

    }


    AnalisarResultado(palavraPalpite: string) {
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
        this.ObterPalavraSecreta();
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

            const quadradoLetra = letra as HTMLDivElement;
            quadradoLetra.textContent = '';
            quadradoLetra.style.backgroundColor = '#bebebe';
        }

        this.msgFinal.textContent = ""

    }

    VerificarDerrota(): boolean {
        return (this.linhaPalpite > 5);
    }


    VerificarPalavraExiste(palavraPalpite: string): boolean {

        if (this.palavras.includes(palavraPalpite)) return true;
        else return false;

    }

    VerificarVitoria(palavraPalpite: string): boolean {

        if (palavraPalpite[0] == this.palavraSecreta[0] &&
            palavraPalpite[1] == this.palavraSecreta[1] &&
            palavraPalpite[2] == this.palavraSecreta[2] &&
            palavraPalpite[3] == this.palavraSecreta[3] &&
            palavraPalpite[4] == this.palavraSecreta[4])

            return true;

        else return false;
    }

    private SelecionarBotao(letra: string): HTMLButtonElement | null {
        const botoes = Array.from(this.pnlTeclado.querySelectorAll('button'));

        for (const botao of botoes) {
            if (botao.textContent === letra) {
                return botao as HTMLButtonElement;
            }
        }

        return null;
    }

    DarDicas(letra: string, resultado: number, posicao: number) {
        const letrasDaLinha = this.linhas[this.linhaPalpite - 1].querySelectorAll('.letra');

        letrasDaLinha.forEach((letraDiv, index) => {

            const botao = this.SelecionarBotao(letraDiv.textContent as string) as HTMLButtonElement;
            const quadradoLetra = letraDiv as HTMLDivElement;

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

    AnalisarPalpite(palavraPalpite: string, posicao: number): any {

        if (this.palavraSecreta.includes(palavraPalpite) && this.palavraSecreta[posicao] == palavraPalpite) return 2;
        else if (this.palavraSecreta.includes(palavraPalpite) && this.palavraSecreta[posicao] != palavraPalpite) return 1;
        else return 0;
    }

    darPalpite(sender: Event): void {

        const botaoClicado = sender.target as HTMLButtonElement;
        const palpite = botaoClicado.textContent;
        if (botaoClicado.textContent?.length == 1) {

            const palpite = botaoClicado.textContent;

            if (this.linhaPalpite <= 5) { // Garante que não ultrapasse o número de divs "linha"
                const linhaDiv = this.linhas[this.linhaPalpite - 1]; // Seleciona a div "linha" correta
                const letraDiv = linhaDiv.querySelectorAll('.letra')[this.letraLinha - 1]; // Seleciona a div "letra" correta
                letraDiv.textContent = palpite;
                this.letraLinha++; // Avança para a próxima div "letra"
            }
        }

    }

    VerificarPalavraPalpite(): string {

        let palavraPalpite: string = "";

        const letrasDaLinha = this.linhas[this.linhaPalpite - 1].querySelectorAll('.letra');

        letrasDaLinha.forEach(letraDiv => {
            palavraPalpite += letraDiv.textContent;
        });

        return palavraPalpite;

    }

}

const telatermo = new Telatermo();


