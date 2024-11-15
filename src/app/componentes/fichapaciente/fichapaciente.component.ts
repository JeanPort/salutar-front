import { Component, OnInit } from '@angular/core';
import { FichaPaciente } from '../../model/FichaPaciente';
import { CepService } from '../../servicos/cep.service';
import { DadosCEP } from '../../model/DadosCEP';
import { ActivatedRoute, Router } from '@angular/router';
import { FichaService } from '../../servicos/ficha.service';
import { UploadService } from '../../servicos/upload.service';
import { PathToFile } from '../../model/PathToFile';
import { Midia } from '../../model/Midia';

@Component({
  selector: 'app-fichapaciente',
  templateUrl: './fichapaciente.component.html',
  styleUrl: './fichapaciente.component.css'
})
export class FichapacienteComponent implements OnInit{

  public ficha: FichaPaciente;
  public loading: boolean = false;
  public idFicha = "";
  public pathToFile: PathToFile = new PathToFile();
  private mode: string = "";
  public midiaDesc: string = "";

  constructor(private cepService: CepService, private activateRoute: ActivatedRoute, private service: FichaService, private router: Router, private uploadService: UploadService){
    this.ficha = new FichaPaciente();
    this.idFicha = this.activateRoute.snapshot.params["id"];
    console.log(this.idFicha)
    if(this.idFicha != "NOVA") {
      this.service.buscarPorId(this.idFicha).subscribe({
        next:(res: FichaPaciente) => {
          this.ficha = res;
        },
        error: (err: any) => {
          alert("Erro ao buscar ficha");
        }
      })
    }
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
    this.loading = true
    this.service.atualizarFicha(this.ficha).subscribe({
      next:(res: FichaPaciente) =>{
        this.loading = false
        this.ficha = res
        alert("Ficha atualizada com sucesso");
        this.idFicha = this.ficha.idFicha.toString();
      },
      error:(err: any) => {
        this.loading = false
        alert("Erro ao cadastrar ficha")
      }
    });
  }

  public voltar(){
    this.router.navigate(['main']);
  }

  public chamarUpload(mode: string):void{
    this.mode = mode
    if(this.mode == "foto"){
      document.getElementById("btnModalUpload")?.click();
    }else{
      document.getElementById("btnModalUploadMidia")?.click();
    }

  }

  public realizarUpload(data: any){
    let file = data.target.files[0];
    let formDate = new FormData();
    formDate.append("arquivo", file, file.name);
    this.loading =true;
    this.uploadService.upload(formDate).subscribe({
      next:(res: PathToFile) =>{
        this.loading =false;
        this.pathToFile = res;
        alert("Upload concluido com sucesso")
        if(this.mode == "foto"){
          this.ficha.linkFoto = "/assets/midia/"+this.pathToFile.path
          console.log("Mostrando link da foto: "+this.ficha.linkFoto)
        }
        else{
          let midia: Midia = new Midia();
          midia.descricao = this.midiaDesc;
          midia.linkMidia = "/assets/midia/"+this.pathToFile.path;
          this.ficha.midias.push(midia);
        }
      },
      error:(err:  any) => {
        alert("Erro ao fazer upload")
      }
    })
  }
}
