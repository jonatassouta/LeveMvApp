import { Guid } from 'guid-typescript';

export class Loja {
    id: string  = Guid.EMPTY;
    nome: string = '';
    cnpj: number = 0;
    endereco: string = '';
    bairro: string = '';
    cidade: string = '';
    uf: string = '';
    telefone: string = '';
    email?: string = '';
    dataCadastro: Date = new Date();
    leveMvId: string = Guid.EMPTY;
}