# maps-app-pamII

Aplicativo React Native/Expo para exibição de mapas, busca de locais e centralização do mapa via Google Maps.

## Funcionalidades

- Exibe o mapa em uma área segura da tela (SafeAreaView)
- Busca de local por texto (Google Geocoding API)
- Centraliza e marca o local pesquisado no mapa
- Chave da API do Google Maps protegida em arquivo `.env`

## Pré-requisitos

- Node.js e npm instalados
- Expo CLI instalada globalmente (`npm install -g expo-cli`)
- Conta e chave de API do Google Maps (com Geocoding e Maps ativados)

## Instalação

1. Clone o repositório:
   ```sh
   git clone <url-do-repo>
   cd maps-app-pamII
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Crie um arquivo `.env` na raiz do projeto com a seguinte variável:
   ```env
   GOOGLE_MAPS_API_KEY=sua-chave-da-api
   ```
4. Inicie o aplicativo:
   ```sh
   expo start
   ```

## Uso

- Acesse o aplicativo em seu dispositivo ou emulador
- Pesquise um local pelo nome ou endereço
