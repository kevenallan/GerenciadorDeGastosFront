import { Component } from '@angular/core';
import { MenuComponent } from "../../shared/components/menu/menu.component";

@Component({
  selector: 'app-gerenciador-de-gastos',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './gerenciador-de-gastos.component.html',
  styleUrl: './gerenciador-de-gastos.component.scss'
})
export class GerenciadorDeGastosComponent {

}
