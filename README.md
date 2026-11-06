# Corrida Particular

Simulador do valor de corridas particulares. Escolha o embarque e o destino, veja a rota no mapa e o total pelo valor do km.

**Abrir o app:** https://manelmarket.github.io/corrida-particular/

No Chrome do Android, toque em **Instalar** (ou no menu ⋮ › **Instalar app**) para abrir direto da tela inicial.

## Como a conta é feita

`km da rota × valor do km + bandeirada`, com corrida mínima e arredondamento opcionais (botão de ajustes ao lado do valor do km).

## De onde vêm os dados

- Mapa de ruas e satélite: Esri. Mapa reserva: OpenStreetMap.
- Rotas: OSRM, com dados do OpenStreetMap.
- Busca de endereço: Photon e Nominatim, com dados do OpenStreetMap.

## Arquivos

- `index.html`: o app inteiro (com a biblioteca Leaflet embutida).
- `manifest.webmanifest`, `icon-*.png`: instalação na tela inicial.
- `sw.js`: guarda o app para abrir mesmo sem internet.
