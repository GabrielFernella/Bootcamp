// Fazendo uma substituição de tipos, foi necessário add esse user dentro das propriedades de
// Reques do nosso express para qua assim eu possa ter esse valor quando precisar
// quando usarem a essa rota no arquivo, poderemos retornar o id do usuário
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
