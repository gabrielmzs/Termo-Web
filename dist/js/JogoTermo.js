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
exports.JogoTermo = void 0;
class JogoTermo {
    constructor() {
        this.palavras = [];
        this.ObterPalavras();
    }
    ObterPalavras() {
        return __awaiter(this, void 0, void 0, function* () {
            const caminho = './Palavras.txt';
            const resposta = yield fetch(caminho);
            const texto = yield resposta.text();
            this.palavras = texto.split('\r\n');
        });
    }
    ObterPalavraSecreta() {
        const indiceAleatorio = Math.floor(Math.random() * this.palavras.length);
        return this.palavras[indiceAleatorio];
    }
}
exports.JogoTermo = JogoTermo;
//# sourceMappingURL=JogoTermo.js.map