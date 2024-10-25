export class UsuarioModel {
    constructor(
        public nome: string = '',
        public usuario: string = '',
        public senha: string = '',
        public isUsuarioGoogle?: boolean
    ) {}
}
