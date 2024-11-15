import { Midia } from "./Midia"

export class FichaPaciente {
  idFicha: number = 0
  nome: string = ""
  dataNasc: string = ""
  sexo: string = ""
  cep: string = ""
  endereco: string = ""
  numeroComplemento: string = ""
  cidade: string = ""
  estado: string = ""
  ocupacao: string = ""
  diagnosticoClinico: string = ""
  queixaPrincipal: string = ""
  hmpHma: string = ""
  medicacoes: string = ""
  examesComplementares: string = ""
  examesFisicos: string = ""
  condutaClinica: string = ""
  diagnostico: string = ""
  uuid:  string = ""
  linkFoto: string = "/assets/avatar.png"
  ativo: number = 0
  midias: Midia[] = [];
}
