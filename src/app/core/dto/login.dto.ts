import { UsuarioModel } from '../model/usuario.model';

export class LoginDTO {
    constructor(
        public usuarioModel: UsuarioModel = new UsuarioModel(),
        public token: string = ''
    ) {}
}
