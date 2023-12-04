import { SenhasService } from './../services/senhas.service';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  inputNovaSenha: string = '';
  ultimasSenhasChamadas: string[] = [];


  constructor(
    private senhasService: SenhasService,
    private alertController: AlertController,
    private navCtrl: NavController // Injete o NavController
  ) {}

  async mostrarSenha(tipoSenha: string) {
    this.senhasService.novaSenha(tipoSenha);
    const numAno = new Date().getFullYear().toString().substring(2, 4);
    const numMes = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const numDia = new Date().getDate().toString().padStart(2, '0');
    const numTipo = tipoSenha;
    const sequencia = (this.senhasService.senhasArray[tipoSenha].length + 1).toString().padStart(2, '0');
    const numSenha = `${numAno}${numMes}${numDia}-${numTipo}${sequencia}`;

    switch(tipoSenha) {
      case 'SG': { this.senhasService.senhasArray['SG'].unshift(numSenha)
      break;
    }
      case 'SP': {this.senhasService.senhasArray['SP'].unshift(numSenha)
      break;
    }
      case 'SE': {this.senhasService.senhasArray['SE'].unshift(numSenha)
      break;
    }
    }
    console.log(this.senhasService.senhasArray)

    const senhasSG = this.senhasService.getSenhasSG();
    const senhasSP = this.senhasService.getSenhasSP();
    const senhasSE = this.senhasService.getSenhasSE();


    this.inputNovaSenha = numSenha;
    console.log(senhasSG)


     this.senhasService.adicionarSenhaChamada(numSenha);

     // Obtenha as 5 últimas senhas chamadas
     this.ultimasSenhasChamadas = this.senhasService.getSenhasChamadas();

    const alert = await this.alertController.create({
      header: 'Senha',
      message: `Sua senha: ${numSenha}`,
      buttons: ['OK'],
    });

    await alert.present();

    this.navCtrl.navigateForward('/tabs/tab2', {
      queryParams: {
        senhasSG: senhasSG,
        senhasSP: senhasSP,
        senhasSE: senhasSE,
      },
    });
  }
}
