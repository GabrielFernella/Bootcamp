# Pacotes e comandos
  1. docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres (Criar um container do postgres)
  2. yarn add typeorm pg (Instalar o ORM e o Postgres)
  3. yarn add uuid
  4. yarn typeorm migration:create -n CreateAppointments (gera o arquivo de migrations na pasta configurada)
  5. yarn typeorm migration:run || yarn typeorm migration:revert (Realiza a migration para o banco de dados ) (o revert é para desfazer as migrations)
  6. yarn add reflect-metadata

# Processos



Parei na aula -
8 - Iniciando o Back-End do App - Parte 2 - Cadastro de Usuários








# Aulas passadas
# Pacotes
 1. yarn init -y
 2. yarn add express
 3. yarn add @types/express -D (quando o typescript n encontrar as propriedades, adicione os pacotes para type no seu projeto, assim como esse)
 4. yarn add typescript -D
 5. yarn tsc --init
 6. yarn add ts-node-dev -D
 7. yarn add eslint -D
 8. yarn eslint --init
 9. yarn add -D @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint-plugin-import@^2.21.2 @typescript-eslint/parser@latest eslint-import-resolver-typescript (plugins para esLint)
 10. yarn add prettier eslint-config-prettier eslint-plugin-prettier -D

# Processos
  1. Depois de instalar as dependencias, crie os arquivos e pastas de configurações
  2. yarn tsc (é utilizado para fazer a build do projeto específicado no arquivo de config do vs code) (vai converter o código)
  3. node dist/server.js
  4. crie o scripts do package.json
  5. gere o arquivo .editorconfig

# Anotações
