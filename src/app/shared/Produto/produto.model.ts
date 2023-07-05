import { Guid } from 'guid-typescript';

export class Produto {
    id: string  = Guid.EMPTY;
    nome: string = '';
    preco: number = 0;
    quantidade: number = 0;
    clienteId: string = Guid.EMPTY;
}