export class UsuarioModel {
    constructor(
        public nome: string = '',
        public email: string = '',
        public usuario: string = '',
        public senha: string = '',
        public isUsuarioGoogle?: boolean,
        public id?: string
    ) {}
}
