import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginDTO } from '../../core/dto/login.dto';
import { ButtonModule } from 'primeng/button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { UsuarioModel } from '../../core/model/usuario.model';
import { AuthService } from '../../core/service/auth.service';
import { AlertService } from '../../core/service/alert.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { UsuarioService } from '../../core/service/usuario.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, ButtonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    usuario: UsuarioModel = new UsuarioModel();
    visible = false;
    emailRecuperarSenha = '';

    constructor(
        private usuarioService: UsuarioService,
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router,
        private auth: Auth
    ) {}

    login() {
        if (
            this.usuario.usuario == undefined ||
            this.usuario.senha == undefined
        ) {
            this.alertService.showWarningAlert(
                'Preencha os campos de Usuário e Senha!'
            );
            return;
        }
        this.usuarioService
            .login(this.usuario)
            .subscribe(async (response: LoginDTO) => {
                if (response) {
                    const usuarioLogado: LoginDTO = response;
                    if (usuarioLogado) {
                        this.authService.setLoginStorage(usuarioLogado);
                        this.router.navigate(['/inicio']);
                    } else {
                        this.alertService.showErrorAlert(
                            'Usuário ou Senha inválido.'
                        );
                    }
                }
            });
    }

    async loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(this.auth, provider);
            const user = result.user;

            if (user) {
                const usuario = new UsuarioModel();
                usuario.email = user.email || '';
                usuario.id = user.uid;
                usuario.nome = user.displayName || '';

                this.usuarioService
                    .loginGoogle(usuario)
                    .subscribe((response: LoginDTO) => {
                        if (response) {
                            const loginDTO: LoginDTO = response;
                            if (loginDTO) {
                                loginDTO.usuarioModel.isUsuarioGoogle = true;
                                const token = loginDTO.token;
                                if (token) {
                                    this.authService.setLoginStorage(loginDTO);
                                    this.router.navigate(['/inicio']);
                                }
                            } else {
                                this.alertService.showErrorAlert(
                                    'Usuário ou Senha inválido.'
                                );
                            }
                        }
                    });
            }
        } catch (error) {
            console.error('Erro ao fazer login com Google: ', error);
        }
    }

    abrirDialogEsquecerSenha() {
        this.emailRecuperarSenha = '';
        this.visible = true;
    }

    async esqueceuASenha() {
        if (this.emailRecuperarSenha !== '') {
            await this.usuarioService.esqueceuASenha(this.emailRecuperarSenha);
        }
        this.visible = false;
    }

    telaCadastro() {
        console.log("aaa");
        
        this.router.navigate(['/cadastrar-usuario']);
    }
}
