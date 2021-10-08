# Amazonia Minada Front End

Esse repositório contém o código fonte do Front End do Amazônia Minada, projeto do Infoamazônia que monitora os requerimentos minerários em unidades de conservação integral e em terras indígenas na Amazônia Legal brasileira. O Dashboard criado exibe dados e estatísticas a respeito dos requerimentos minerários coletados pelo [bot do Amazônia Minada](https://github.com/InfoAmazonia/amazonia-minada), a partir dos dados fornecidos pela Agência Nacional de Mineração (ANM), em termos da área declarada (área total dos requerimentos) e da incidência (quantidade de requerimentos).

## **Como executar**

Para executar o projeto, inicialmente é necessário criar um arquivo `.env` com as configurações que são exemplificadas no arquivo `.env.example`.

Logo após a configuração, você deve executar um comando para instalar as dependências do projeto:

    $ yarn

Agora, para executar em ambiente de desenvolvimento, use o seguinte comando:

    $ yarn install

## **Diretórios do projeto**

O código fonte em ReactJS se encontra dentro do diretório **_/src_** na raíz do projeto. Cada pasta que se localiza dentro do **/_src_** foi criada para dividir o projeto em seções de acordo com o tipo de função que os arquivos ali existentes realizam. A organização dos diretórios foi realizada da seguinte forma:

1. `/assets` possui o conjunto de recursos estáticos da aplicação, como imagens e o **_.css_** padrão utilizado para configurar o nosso projeto.
2. `/components`
3. `/constants`
4. `/contexts`
5. `/hooks`
6. `/i18n`
7. `/pages`
8. `/services`
