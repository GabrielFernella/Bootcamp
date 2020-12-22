// Essa aqui é uma classe de erro, utilizada para fazer uma tratativa de erros, caso de errado, essa classe irá informar o erro
// Utilizaremos essa classe para tratar erros de requisições das nossas rotas
class AppError {
  public readonly message: string; // apenas leitura

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
