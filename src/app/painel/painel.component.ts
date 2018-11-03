import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Frase } from '../shared/frase.model'
import { FRASES} from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  frases: Array<Frase> = FRASES;
  instrucao: string = 'Traduza a frase';
  resposta: string;
  rodada: number = 0;
  rodadaFrase: Frase;
  progresso: number = 0;
  tentativas: number = 3;
  @Output() encerrarJogo = new EventEmitter();

  constructor() {
    this.atualizaRodada()
  }

  ngOnInit() {
  }

  atualizaResposta(event: Event): void {
    this.resposta = ((<HTMLInputElement>event.target).value)
  }

  verificarResposta(): void {
    if(this.rodadaFrase.frasePtBr == this.resposta)
    {
      this.rodada++;
      this.progresso = this.progresso + (100 / this.frases.length);

      if(this.rodada === 4)
      {
        this.encerrarJogo.emit('vitoria')
      }

      this.atualizaRodada();

    } else {
      this.tentativas--;

      if(this.tentativas === -1)
      {
        this.encerrarJogo.emit('derrota')
      }
    }
  }

  atualizaRodada(): void 
  {
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = '';
  }
}
