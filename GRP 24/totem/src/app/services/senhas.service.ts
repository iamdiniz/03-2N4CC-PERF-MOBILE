import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SenhasService {

  private inputNovaSenha: string = '';
  private senhasGeral: number = 0;
  private senhasPrior: number = 0;
  private senhasExame: number = 0;
  private senhasTotal: number = 0;
  private tmSP: number = 15; // TM inicial para senha SP (em minutos)
  private tmSG: number = 5;  // TM inicial para senha SG (em minutos)
  private senhasAtendidasGeral: number = 0;
  private senhasAtendidasPrior: number = 0;
  private senhasAtendidasExame: number = 0;
  private relatorioDetalhado: any[] = [];
  private tmVariation: number = 0; // Variável para TM aleatório

  public senhasArray: { [key: string]: string[] } = {
    'SG': [],
    'SP': [],
    'SE': [],
  };
  public senhasSelecionadas: string[] = [];

  private senhasChamadas: string[] = [];

  getSenhasChamadas(): string[] {
    return this.senhasChamadas;
  }

  // Método para adicionar uma senha chamada à lista
  adicionarSenhaChamada(senha: string) {
    this.senhasChamadas.push(senha);
    if (this.senhasChamadas.length > 5) {
      // Se houver mais de 5 senhas na lista, remova a mais antiga
      this.senhasChamadas.shift();
    }
  }
  public senhasAtendidasArray: string[] = [];
  getRelatorioDiario(): any {
    const relatorioDiario = {
      // Defina as informações do relatório diário aqui
      // Por exemplo:
      quantSenhasEmitidas: this.getSenhasTotal(),
      quantSenhasAtendidas: this.senhasSelecionadas.length,
      quantSenhasGeral: this.getSenhasSG(),
      quantSenhasPrioritarias: this.getSenhasSP(),
      quantSenhasExame: this.getSenhasSE(),
      // Outras informações que desejar
    };

    return relatorioDiario;
  }


  getInputNovaSenha(): string {
    return this.inputNovaSenha;
  }
  getSenhasSG(): number {
    return this.senhasArray['SG'].length;
  }

  getSenhasSP(): number {
    return this.senhasArray['SP'].length;
  }

  getSenhasSE(): number {
    return this.senhasArray['SE'].length;
  }

  getSenhasTotal(): number {
    return this.senhasTotal;
  }

  getSenhasArray(): { [key: string]: string[] } {
    return this.senhasArray;
  }

  criarNumeroSenha(tipoSenha: string, tm: number): string {
    const numAno = new Date().getFullYear().toString().substring(2, 4);
    const numMes = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const numDia = new Date().getDate().toString().padStart(2, '0');

    if (!tm) {
      tm = 0;
    }

    // Lógica para criar o número da senha com base no modelo descrito
    const sequencia = (this.senhasArray[tipoSenha].length + 1).toString().padStart(2, '0');
    const numSenha = `${numAno}${numMes}${numDia}-${tipoSenha}${sequencia}`;

    return numSenha;
  }

  private calcularVariacaoAleatoria(): number {
    return Math.floor(Math.random() * 11) - 5; // Gera um valor entre -5 e 5 minutos
  }

  novaSenha(tipoSenha: string = '') {
    if (tipoSenha === 'SG') {
      this.somaGeral();
      this.tmSG += this.calcularVariacaoAleatoria();
      this.inputNovaSenha = this.criarNumeroSenha(tipoSenha, this.tmSG);
    } else if (tipoSenha === 'SP') {
      this.somaPrior();
      this.tmSP += this.calcularVariacaoAleatoria();
      this.inputNovaSenha = this.criarNumeroSenha(tipoSenha, this.tmSP);
      this.senhasArray['SP'].push(this.inputNovaSenha);
    } else if (tipoSenha === 'SE') {
      this.somaExame();
      this.inputNovaSenha = this.criarNumeroSenha(tipoSenha, 0); // Sem TM para senha SE
      this.senhasArray['SE'].push(this.inputNovaSenha);
    }
  }

  getRelatorioTM(): number {
    const tmMin = 5;
    const tmMax = 15;
    const tm = Math.floor(Math.random() * (tmMax - tmMin + 1)) + tmMin;

    return tm;
  }

  getRelatorioDetalhado(): any[] {
    const relatorioDetalhado: any[] = [];

    // Lógica para criar o relatório detalhado
    for (const tipoSenha in this.senhasArray) {
      if (this.senhasArray.hasOwnProperty(tipoSenha)) {
        const senhas = this.senhasArray[tipoSenha];
        for (const numSenha of senhas) {
          // Aqui você pode preencher as informações específicas de cada senha, como tipo, data, hora de emissão, etc.
          // Certifique-se de adicionar essas informações a cada entrada no relatórioDetalhado.
          const detalhesSenha = {
            tipo: tipoSenha,
            dataEmissao: new Date().toLocaleDateString(), // Exemplo: data de emissão formatada
            horaEmissao: new Date().toLocaleTimeString(), // Exemplo: hora de emissão formatada
            // Adicione mais informações aqui, se necessário
          };
          relatorioDetalhado.push(detalhesSenha);
        }
      }
    }

    return relatorioDetalhado;
  }


  getTMSenhaSP(): number {
    return this.tmSP;
  }

  getTMSenhaSG(): number {
    return this.tmSG;
  }

  private somaGeral() {
    this.senhasGeral++;
    this.senhasTotal++;
  }

  private somaPrior() {
    this.senhasPrior++;
    this.senhasTotal++;
  }

  private somaExame() {
    this.senhasExame++;
    this.senhasTotal++;
  }


  // SenhasService
// ...

  // SenhasService
// ...

  getNextSenhaChamada(tipoSenha: string): string | undefined {
   const senhaChamada = this.senhasArray[tipoSenha].shift();
   if (senhaChamada) {
      this.adicionarSenhaChamada(senhaChamada);
   }
   return senhaChamada;
  }



}
