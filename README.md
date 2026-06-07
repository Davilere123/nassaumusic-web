![Logo do NassauMusic Web](src/assets/logoweb.png)
---

Este é um reprodutor de música que funciona totalmente no navegador, feito para o trabalho final da matéria de **Códigos de Alta Performance Web**, ministrada pelo professor Victor.  
Ele é feito utilizando **React JS**, sendo um port do [NassauMusic original feito em React Native](https://github.com/davilere123/nassaumusic "Repositório do NassauMusic original em React Native") para que possa funcionar na Web.

## Principais recursos
- Reproduz músicas, já colocadas no próprio aplicativo, que vem da web, como um streaming;
- Reproduz também músicas locais que o usuário pode adicionar do seu próprio dispositivo;
- Permite ver a atividade de amigos (o app não tem um sistema de amigos em si por falta de banco de dados na nuvem, portanto conta com amigos falsos para mostrar a possibilidade);
- Se adapta tanto a telas grandes, como as de computadores, quanto à telas menores, como de celulares.

## Como baixar e executar
### Abrindo pela Vercel
[É possível acessar o app através da Vercel.](https://nassaumusic-web.vercel.app/ "Deploy do NassauMusic Web na Vercel")  
> **Observação:** O deploy na Vercel não possui efeitos de desfoque por conta de alguma questão da plataforma que não conseguimos resolver ou identificar. Isso pode afetar a experiência do usuário em termos de legibilidade. Portanto, essa versão **não representa a experiência real do app**.

### Executando localmente
1 - Instale o **node.js** com **npm**. Recomenda-se o [site oficial](https://nodejs.org/ "Site oficial do node.js");  
2 - Clone o repositório;  
3 - Abra um terminal dentro da pasta do repositório;  
4 - Instale os pacotes necessários rodando `npm install`;  
5 - Inicie com `npm run dev`;  
6 - O seu terminal deve retornar um link parecido com `localhost://...`. Abra ele no seu navegador de internet (ou, caso o terminal permita, segure **CTRL** e **clique** no link para abrir diretamente).
