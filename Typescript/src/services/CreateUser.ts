
interface techObject {
  title: string;
  experience: number;
}
//Como definir o tipo de um conjunto de informações 
interface CreateUserData {
  name?: string;
  email: string;
  password: string;
  techs: Array<string | techObject> //string[] -> quando o tipo for único
}


export default function createUser({name = '', email, password} : CreateUserData ){
  const user = {
    name,
    email,
    password
  }

  return user
}