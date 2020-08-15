# Pacotes instalados
  1. yarn init -y
  2. yarn add react react-dom (react framework and react-dom integração do react com a arvore de elementos  )
  3. yarn add @babel/core @babel/preset-env @babel/preset-react @babel/cli webpack webpack-cli
  4. yarn add babel-loader
  5. yarn add webpack-dev-server -D (para atualizar enquanto enxergar as alterações  )
  6. yarn add style-loader css-loader (para o webpack ler arquivos css)
  7. yarn add file-loader (para poder manipular aquivos)
  8. yarn add axios (para se comunicar com o back-end)

# Passos
  1. Instale as dependência e monte a estrutura da sua aplicação
  2. yarn babel src/index.js --out-file public/bundle.js (vai transpilar seu código para uma forma mais legível para o navegador e salvar na pasta public)
  3. yarn webpack --mode development
  4. yarn webpack-dev-server --mode development