export class UsuarioModel {
    constructor(
        public nome: string = '',
        public senha?: string,
        public isUsuarioGoogle?: boolean
    ) {}
}
