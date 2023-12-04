import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';
import { AlertController, NavController } from '@ionic/angular';  // Certifique-se de importar NavController
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  ultimasSenhasChamadas: string[] = [];

  constructor(
    private senhasService: SenhasService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      // Verifique se os parâmetros existem e atribua à variável local
      this.ultimasSenhasChamadas = params['ultimasSenhasChamadas'] || [];
    });
  }

  async chamarProximaSenha() {
    // Verifique se a lista de últimas senhas chamadas não está vazia
    if (this.ultimasSenhasChamadas.length > 0) {
      // Use a próxima senha da lista de últimas senhas chamadas
      const tipoSenha = this.ultimasSenhasChamadas.shift();

      // Certifique-se de que tipoSenha é uma string válida antes de chamar
      if (typeof tipoSenha === 'string') {
        const novaSenha = this.senhasService.getNextSenhaChamada(tipoSenha);

        if (novaSenha) {
          const alert = await this.alertController.create({
            header: 'Senha Chamada',
            message: `A próxima senha chamada é: ${novaSenha}`,
            buttons: ['OK']
          });

          await alert.present();
        } else {
          const alert = await this.alertController.create({
            header: 'Sem Senhas',
            message: 'Não há mais senhas disponíveis.',
            buttons: ['OK']
          });

          await alert.present();
        }
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Sem Senhas',
        message: 'Não há mais senhas disponíveis.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }
}
