import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  senhasEmitidas: number;
  senhasAtendidas: number;
  senhasGeral: number;
  senhasPrioritarias: number;
  senhasExame: number;
  relatorioDetalhado: any[];
  relatorioTM: number;
  senhasSelecionadas: string[];
  relatorioDiario: any; 
  
  constructor(public senhasService: SenhasService) {
    this.senhasEmitidas = senhasService.getSenhasTotal();
    this.senhasAtendidas = senhasService.senhasSelecionadas.length;
    this.senhasGeral = senhasService.getSenhasSG();
    this.senhasPrioritarias = senhasService.getSenhasSP();
    this.senhasExame = senhasService.getSenhasSE();
    this.relatorioDetalhado = senhasService.getRelatorioDetalhado();
    this.relatorioTM = senhasService.getRelatorioTM();
    this.senhasSelecionadas = senhasService.senhasSelecionadas;

    
    this.gerarRelatorioDiario();
  }

  gerarRelatorioDiario() {
    
    this.relatorioDiario = this.senhasService.getRelatorioDiario();
  }

 
}
