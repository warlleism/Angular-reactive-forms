import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required]],
      sobrenome: [null, [Validators.required]],
      descricao: [null, Validators.required],

      dadosPessoais: this.formBuilder.group({
        email: [null, [Validators.email, Validators.required]],
        cpf: [null, Validators.required],
        rg: [null, Validators.required],
        nascimento: [null, Validators.required],
        radioFeminino: [null],
        radioMasculino: [null],
        radioNaoBinario: [null],
      }),

      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
    });
  }

  onSubmit() {}

  verificaValidTouched(campo: any) {
    return (
      this.formulario.get(campo).invalid && this.formulario.get(campo).touched
    );
  }

  aplicaCssErro(campo: any) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
    };
  }
}
