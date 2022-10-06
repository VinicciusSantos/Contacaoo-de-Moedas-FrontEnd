import { Component, OnInit } from '@angular/core';
import { moedas } from 'moedas';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoedaService } from './moeda.service';

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
    console.log(valor)
    return parseFloat(this.validateForm.value.valor) * valor
  }

  moedas = moedas;
  seletor = ['formatacao-seletor'];
  text = ['formatacao-h3'];
  apresentacao = 'organição-dos-h4s';
  fonte = 'formatacao-h4';
  validateForm!: UntypedFormGroup;
  data!: modelMoeda;
  resultado!: any;

  submitForm(): void {
    this.moedaService
      .getCotacao(
        this.validateForm.value.moedaInicial,
        this.validateForm.value.moedaFinal
      )
      .subscribe((data: any) => {
        this.data = data[0];
        this.resultado = this.calcConversao(parseFloat(data[0].high)).toFixed(2)
      });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      valor: [null, [Validators.required]],
      moedaInicial: [null, [Validators.required]],
      moedaFinal: [null, [Validators.required]],
    });
  }
}
