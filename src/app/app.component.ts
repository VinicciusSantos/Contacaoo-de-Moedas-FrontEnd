import { Component, OnInit } from '@angular/core';
import { moedas } from 'moedas';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoedaService } from './moeda.service';

export interface modelMoeda{	
  code: string 
  codein:string
  name:string
  high: string
  low: string
  varBid: string
  pctChange:string
  bid: string
  ask: string
  timestamp:string
  create_date: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  constructor(private fb: UntypedFormBuilder,
    private moedaService: MoedaService
    ) {}

  moedas = moedas;
  seletor = ['formatacao-seletor']
  text = ['formatacao-h3']
  apresentacao = "organição-dos-h4s";
  fonte = "formatacao-h4"
  validateForm!: UntypedFormGroup;

  submitForm(): void {
    // console.log('submit', this.validateForm.value.moedaInicial);
    this.moedaService.getCotacao(this.validateForm.value.moedaInicial, this.validateForm.value.moedaFinal).subscribe(data => {
      console.log(data);
    })
  }
    
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      valor: [null, [Validators.required]],
      moedaInicial: [null, [Validators.required]],
      moedaFinal: [null, [Validators.required]]
    });
  }
}
