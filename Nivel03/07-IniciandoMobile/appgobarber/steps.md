Pacotes

1. npx react-native init appgobarber --template react-native-template-typescript (Criando projeto)
2. yarn add styled-components && yarn add @types/styled-components -D
3. yarn add @react-navigation/native
4. yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
5. yarn add @react-navigation/stack
6. yarn react-native link (importando os assets do projeto)
7. yarn add react-native-vector-icons (instalando icones) e incremente um código nos arquivos tanto de IOS quanto Android
8. yarn add -D @types/react-native-vector-icons
9. yarn add react-native-iphone-x-helper

10.

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
