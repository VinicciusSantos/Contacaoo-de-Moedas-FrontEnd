import { Component } from '@angular/core';
import { moedas } from 'moedas';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private fb: UntypedFormBuilder) {}
  title = 'contacao-de-moedas-frontend';
  moedas = moedas;
  seletor = ['formatacao-seletor']

  validateForm!: UntypedFormGroup;

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }
    
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      valor: [null, [Validators.required]],
      moeda: [null, [Validators.required]]
    });
  }
}
