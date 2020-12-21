// Essa função é responsável por validar todos os erros que são retornados do nosso shape do nosso Yup

import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string; // Como ele n sabe o valor que pode ser retornado, podemos declarar um
  //array onde cada elemento do objeto será inserido
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
