import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicos/login.service';
import { Usuario } from '../../model/Usuario';
import { SalutarToken } from '../../model/SalutarToken';
import { UnsubscriptionError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public usuario: Usuario = new Usuario();
  public loading: boolean = false;


  public constructor(private router: Router, private service:LoginService){}

  public logar() {

    this.loading = true;
    console.log(this.usuario);
    this.service.efetuarLogin(this.usuario).subscribe(
      (res: SalutarToken) =>{
        alert("Login deu certo");
        this.loading =false;
        localStorage.setItem("SalutarTK", res.token);
        this.router.navigate(['main']);
      },
      (err: any) => {
        console.log(this.usuario)
        alert("Login errado");
        this.loading = false;
      }
    )

    //this.router.navigate(['main']);
  }
}



