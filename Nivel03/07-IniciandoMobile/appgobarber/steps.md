Pacotes

1. yarn run android (executar pela primeira vez na VM)
2. yarn start (iniciar projeto)
3. npx react-native init appgobarber --template react-native-template-typescript (Criando projeto)
4. yarn add styled-components && yarn add @types/styled-components -D
5. yarn add @react-navigation/native
6. yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
7. yarn add @react-navigation/stack
8. yarn react-native link (importando os assets do projeto)
9. yarn add react-native-vector-icons (instalando icones) e incremente um código nos arquivos tanto de IOS quanto Android
10. yarn add -D @types/react-native-vector-icons
11. yarn add react-native-iphone-x-helper (instancia algumas propriedades para ios, assim pegamos tamanhos e etc)
12. yarn add @unform/core @unform/mobile
13. yarn add yup && yarn add @types/yup -D
14. yarn add axios
15. yarn add @react-native-community/async-storage ()

Processos

1. Crie a pasta src e app.tsx, e edite o index principal do projeto

### Adicionando Icones

1. Instale os icones rodando o comando: yarn add react-native-vector-icons
2. vá até o caminho do arquivo IOS, e no mesmo campo que contem as fontes, adicione mais uma linha: <string>Feather.ttf<string>
3. já no android, vá até o arquivo "build.gradle" e na última linha add:
   project.ext.vectoricons = [
   iconFontNames: ['Feather.ttf']
   ]
   aply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

### Error

na parte de unform
