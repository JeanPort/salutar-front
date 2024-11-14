import { Component, OnInit } from '@angular/core';
import { FichaPaciente } from '../../model/FichaPaciente';
import { CepService } from '../../servicos/cep.service';
import { DadosCEP } from '../../model/DadosCEP';
import { ActivatedRoute } from '@angular/router';
import { FichaService } from '../../servicos/ficha.service';

@Component({
  selector: 'app-fichapaciente',
  templateUrl: './fichapaciente.component.html',
  styleUrl: './fichapaciente.component.css'
})
export class FichapacienteComponent implements OnInit{

  public ficha: FichaPaciente;
  public loading: boolean = false;
  public idFicha = "";

  constructor(private cepService: CepService, private activateRoute: ActivatedRoute, private service: FichaService){
    this.ficha = new FichaPaciente();
    this.idFicha = this.activateRoute.snapshot.params["id"];
    console.log(this.idFicha)
  }

  ngOnInit(): void {

  }

  public buscarCep(){
    this.loading = true
    let cep = this.ficha.cep.replaceAll("-","").replaceAll(".","");
    console.log(cep)
    this.cepService.buscarCep(cep).subscribe({

      next:(res: DadosCEP) => {
        this.loading = false
        this.ficha.endereco = res.logradouro
        this.ficha.cidade = res.localidade
        this.ficha.estado = res.uf

      },
      error:(err: any) => {
        this.loading = false
        alert("CEP não encontrado")
      }
    })
  }

  public salvarFicha(){
    if(this.idFicha == "NOVA"){
      this.cadastrarNova();
    }
    else{
      this.atualizar();
    }
  }


  public cadastrarNova(){
    this.loading = true
    this.service.cadastrarFicha(this.ficha).subscribe({
      next:(res: FichaPaciente) =>{
        this.loading = false
        this.ficha = res
        alert("Ficha cadastrada com sucesso");
        this.idFicha = this.ficha.idFicha.toString();
      },
      error:(err: any) => {
        this.loading = false
        alert("Erro ao cadastrar ficha")
      }
    });
  }

  public atualizar(){

  }
}
