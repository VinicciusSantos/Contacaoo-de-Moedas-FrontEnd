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

  changeSelects(){
    const aux = this.validateForm.value.moedaFinal
    this.validateForm.value.moedaFinal = this.validateForm.value.moedaInicial
    this.validateForm.value.moedainicial = aux
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
          this.resultado = this.calcConversao(parseFloat(data[0].high)).toFixed(2);
        });
    }
  }

  trySubmit(){
    // A função vê se tem todos os parâmetros para o submit ser feito automaticamente
    let qtd_total = Object.values(this.validateForm.value).length
    let qtd_preenchidos = Object.values(this.validateForm.value).filter(val => val).length
    if (qtd_total === qtd_preenchidos) this.submitForm()
  }
}
