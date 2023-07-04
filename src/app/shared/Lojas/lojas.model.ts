import { Guid } from 'guid-typescript';

export class Loja {
    id: string  = Guid.EMPTY;
    nome: string = '';
    cnpj: string = '';
    endereco: string = '';
    bairro: string = '';
    uf: string = '';
    telefone: string = '';
    email?: string = '';
    dataCadastro: Date = new Date();
}