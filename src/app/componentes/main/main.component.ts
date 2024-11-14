import { Component, OnInit } from '@angular/core';
import { FichaService } from '../../servicos/ficha.service';
import { FichaPaciente } from '../../model/FichaPaciente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

  public fichas: FichaPaciente[] = []
  public keyword: string = "";
  public loading: boolean = false;

  constructor(private service: FichaService, private router: Router){}


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public pesquisar(){
    this.loading = true;
    this.service.buscarFichas(this.keyword).subscribe({
      next:(res: FichaPaciente[]) => {
        this.loading = false;
        this.fichas = res;
      },
      error:(err: any)=>{
        this.loading =false;
        alert("Erro ao buscar ficha");
      }
    })
  }

  public adicionarFicha(): void{
    this.router.navigate(['ficha/NOVA'])
  }
}
