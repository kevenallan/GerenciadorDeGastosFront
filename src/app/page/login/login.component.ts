import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginDTO } from '../../core/dto/login.dto';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    login: LoginDTO = new LoginDTO();
}
