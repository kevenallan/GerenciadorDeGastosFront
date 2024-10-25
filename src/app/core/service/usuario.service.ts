import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { UsuarioModel } from '../model/usuario.model';
import { ResponseModel } from '../model/response.model';
import { environment } from '../../environment/environment';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    constructor(private http: HttpClient) {}

    login(usuario: UsuarioModel) {
        return this.http
            .post(`${environment.urlBackEnd}/usuario/login`, usuario)
            .pipe(map((response: ResponseModel) => response.model));
    }

    loginGoogle(usuario: UsuarioModel) {
        return this.http
            .post(`${environment.urlBackEnd}/usuario/login-google`, usuario)
            .pipe(map((response: ResponseModel) => response.model));
    }

    cadastro(usuario: UsuarioModel) {
        return this.http
            .post(`${environment.urlBackEnd}/usuario/cadastrar`, usuario)
            .pipe(map((response: ResponseModel) => response.model));
    }

    async esqueceuASenha(email: string) {
        let params = new HttpParams().set('email', email);
        return await lastValueFrom(
            this.http.get(
                `${environment.urlBackEnd}/usuario/esqueceu-sua-senha`,
                {
                    params,
                }
            )
        );
    }

    async alterarSenha(novaSenha: string, token: string) {
        let params = new HttpParams()
            .append('novaSenha', novaSenha)
            .append('token', token);
        return await lastValueFrom(
            //prettier-ignore
            this.http.put(
                `${environment.urlBackEnd}/usuario/alterar-senha`,
                {},
                { params }
            )
        );
    }

    async dadosUsuario() {
        return await lastValueFrom(
            this.http
                .get(`${environment.urlBackEnd}/usuario/dados-usuario`)
                .pipe(map((response: ResponseModel) => response.model))
        );
    }

    async atualizarUsuario(usuarioAtualizado: UsuarioModel) {
        return await lastValueFrom(
            this.http
                .put(
                    `${environment.urlBackEnd}/usuario/atualizar-usuario`,
                    usuarioAtualizado
                )
                .pipe(map((response: ResponseModel) => response.model))
        );
    }

    async atualizarUsuarioGoogle(usuarioAtualizado: UsuarioModel) {
        return await lastValueFrom(
            this.http
                .put(
                    `${environment.urlBackEnd}/usuario/atualizar-usuario-google`,
                    usuarioAtualizado
                )
                .pipe(map((response: ResponseModel) => response.model))
        );
    }

    async deletar() {
        return await lastValueFrom(
            this.http.delete(`${environment.urlBackEnd}/usuario/deletar`)
        );
    }
}
