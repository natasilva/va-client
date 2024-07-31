import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  validateCpfCnpj(control: AbstractControl) {
    const cnpjf = control.value;

    if (
      !cnpjf ||
      cnpjf
        .split(``)
        .reduce(
          (acc: string, val: string, idx: number, array: string[]) =>
            idx == 0 ? acc : acc && val == array[idx - 1],
          true
        )
    )
      return { cpfCnpjInvalid: true }; // inválido

    if (cnpjf.length == 11) {
      /** Validação 1 */
      let soma = 0;

      for (let idx = 0; idx < 9; idx++)
        soma += parseInt(cnpjf[idx]) * (10 - idx);

      let resto = (soma * 10) % 11;

      if (resto >= 10) resto = 0;

      if (resto != parseInt(cnpjf[9])) return { cpfCnpjInvalid: true }; // inválido

      /** Validação 2 */
      soma = 0;

      for (let idx = 0; idx < 10; idx++)
        soma += parseInt(cnpjf[idx]) * (11 - idx);

      resto = (soma * 10) % 11;

      if (resto >= 10) resto = 0;

      if (resto != parseInt(cnpjf[10])) return { cpfCnpjInvalid: true }; // inválido
    } else if (cnpjf.length == 14) {
      // Valida DVs
      let tamanho = cnpjf.length - 2;
      let numeros = cnpjf.substring(0, tamanho);
      let digitos = cnpjf.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;

      for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros[tamanho - i]) * pos--;
        if (pos < 2) pos = 9;
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

      if (resultado != parseInt(digitos[0])) return { cpfCnpjInvalid: true }; // inválido

      tamanho = tamanho + 1;
      numeros = cnpjf.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;

      for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros[tamanho - i]) * pos--;
        if (pos < 2) pos = 9;
      }

      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

      if (resultado != parseInt(digitos[1])) return { cpfCnpjInvalid: true }; // inválido
    } else return { cpfCnpjInvalid: true }; // inválido

    return null;
  }
}
