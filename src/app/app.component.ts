import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { MoedaService } from './moeda.service';
import { moedas } from 'moedas';

export interface modelMoeda {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private fb: UntypedFormBuilder,
    private moedaService: MoedaService
  ) {}

  calcConversao(valor: number): number {
    console.log(valor);
    return parseFloat(this.validateForm.value.valor) * valor;
  }

  moedas = moedas;
  seletor = ['formatacao-seletor'];
  text = ['formatacao-h3'];
  apresentacao = 'organição-dos-h4s';
  fonte = 'formatacao-h4';
  validateForm!: UntypedFormGroup;
  data!: modelMoeda;
  resultado!: any;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      valor: [null, [Validators.required]],
      moedaInicial: [null, [Validators.required]],
      moedaFinal: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if( this.validateForm.value.moedaInicial == this.validateForm.value.moedaFinal ) {
      console.log(this.validateForm.value.valor)
      this.resultado = (this.validateForm.value.valor).toFixed(2);
    }

    else {
      this.moedaService
        .getCotacao(
          this.validateForm.value.moedaInicial,
          this.validateForm.value.moedaFinal
        )
        .subscribe((data: any) => {
          this.data = data[0];
          this.resultado = this.calcConversao(parseFloat(data[0].high)).toFixed(
            2
          );
        });
    }

  }
}
