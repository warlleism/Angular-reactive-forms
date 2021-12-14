import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from '../services/Services.service';


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  formulario: FormGroup;

  generos: any[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private Service: Service
  ) {}

  ngOnInit(): void {

    this.generos = this.Service.getGenero()

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required]],
      sobrenome: [null, [Validators.required]],
      descricao: [null, Validators.required],


      dadosPessoais: this.formBuilder.group({
        email: [null, [Validators.email, Validators.required]],
        cpf: [null, Validators.required],
        rg: [null, Validators.required],
        nascimento: [null, Validators.required],
        genero: [null],
      }),

      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null, Validators.required],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
    });
  }

  onSubmit() {

    if (this.formulario.valid) {
      this.http
        .post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        .subscribe(
          (dados) => {
            alert('Cadastro feito com sucesso!');
          },
          (erro: any) => alert('Cadastro incompleto')
        );
    } else {
      alert('Campos incompletos');
      this.verificaValidacoesForm(this.formulario);
    }

    console.log(this.formulario.value)
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((campo) => {
      const controle = formGroup.get(campo);
      controle.markAsTouched();

      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

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

  populaDadosForm(dados: any) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });
  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.Service.consultaCEP(cep).subscribe((data) => {
        this.populaDadosForm(data);
      });
    }
  }
}
