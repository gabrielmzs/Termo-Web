
export class JogoTermo {

    private palavras: string[] = [];

    constructor() {
        this.ObterPalavras();
    }

    private async ObterPalavras(): Promise<void> {
        const caminho = './Palavras.txt';

        const resposta = await fetch(caminho);
        const texto = await resposta.text();
        this.palavras = texto.split('\r\n');
    }

    public ObterPalavraSecreta(): string {
        const indiceAleatorio = Math.floor(Math.random() * this.palavras.length);
        return this.palavras[indiceAleatorio];
    }
}