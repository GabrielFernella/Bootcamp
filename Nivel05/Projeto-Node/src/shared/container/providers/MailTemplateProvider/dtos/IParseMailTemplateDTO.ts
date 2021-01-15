// interface permite que a variavel é um objeto que possa ter qualquer valor string e number
interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  template: string;
  variables: ITemplateVariables;
}
