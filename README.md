# Documentação do Jogo de Memória em JavaScript

## Descrição

Este script implementa um jogo de memória simples, onde o objetivo do jogador é emparelhar cartas com imagens. O jogo é iniciado com um conjunto de cartas embaralhadas, e o jogador deve clicar nas cartas para virá-las e tentar encontrar pares correspondentes.

## Estrutura do Código

### 1. Seleção de Elementos HTML

```javascript
const container = document.querySelector(".container");
const botaoReiniciar = document.querySelector("button");
let cartas;
let primeiraCarta = "";
let segundaCarta = "";
```

-   **container**: Representa o elemento HTML com a classe `.container`, onde as cartas do jogo serão inseridas.
-   **botaoReiniciar**: Representa o botão que, ao ser clicado, recarrega a página, reiniciando o jogo.
-   **cartas**: Variável que irá armazenar todas as cartas do jogo.
-   **primeiraCarta** e **segundaCarta**: Variáveis usadas para armazenar as duas cartas viradas durante a rodada do jogador.

### 2. Definição dos Itens (Cartas)

```javascript
const items = [
    { nome: "caixa-dagua", imagens: "../img/caixa-dagua.png" },
    { nome: "garrafas", imagens: "../img/garrafas.png" },
    { nome: "lata-de-lixo", imagens: "../img/lata-de-lixo.png" },
    { nome: "lata", imagens: "../img/lata.png" },
    { nome: "lavar", imagens: "../img/lavar.png" },
    { nome: "pneu", imagens: "../img/pneu.png" },
    { nome: "telhado", imagens: "../img/telhado.png" },
    { nome: "vaso-de-flor", imagens: "../img/vaso-de-flor.png" },
];
```

-   **items**: Um array de objetos, cada um representando uma carta. Cada objeto contém:
    -   **nome**: Um identificador único para a carta.
    -   **imagens**: O caminho para a imagem a ser exibida na carta.

### 3. Função de Reinício

```javascript
botaoReiniciar.addEventListener("click", () => location.reload());
```

-   Um ouvinte de evento é adicionado ao botão de reinício. Quando clicado, ele recarrega a página, reiniciando o jogo.

### 4. Função `criarCartas()`

```javascript
function criarCartas() {
    let itemsDuplicado = [...items, ...items];
    let tarefas = itemsDuplicado.sort(() => Math.random() - 0.5);

    tarefas.map((tarefa) => {
        container.innerHTML += `
    <div class="carta" data-carta=${tarefa.nome}>
        <div class="atras">?</div>
        <div class="frente">
            <img src=${tarefa.imagens} width="160px" height="160px"/>
        </div>
    </div>
    `;
    });
}
criarCartas();
```

-   **criarCartas()**: Função responsável por criar as cartas do jogo.
    -   **itemsDuplicado**: Cria um novo array duplicando os itens do array original, formando pares de cartas.
    -   **tarefas**: O array é embaralhado usando o método `sort()` com uma função de comparação aleatória.
    -   **map()**: Para cada item no array `tarefas`, uma carta é inserida no `container`. Cada carta tem:
        -   **data-carta**: Um atributo personalizado que armazena o nome da carta.
        -   **atras**: A parte traseira da carta, que inicialmente exibe um "?".
        -   **frente**: A parte frontal da carta, que exibe a imagem do item.
-   A função **criarCartas()** é chamada para gerar as cartas no início do jogo.

### 5. Função `virarCarta()`

```javascript
function virarCarta() {
    cartas = document.querySelectorAll(".carta");

    cartas.forEach((carta) => {
        carta.addEventListener("click", () => {
            if (primeiraCarta == "") {
                carta.classList.add("carta-virada");
                primeiraCarta = carta;
            } else if (segundaCarta == "") {
                carta.classList.add("carta-virada");
                segundaCarta = carta;
                checarCartas(carta);
            }
        });
    });
}
virarCarta();
```

-   **virarCarta()**: Função responsável por adicionar a interatividade de virar as cartas.
    -   Seleciona todas as cartas usando `document.querySelectorAll(".carta")`.
    -   Para cada carta, um ouvinte de evento é adicionado. Quando uma carta é clicada:
        -   Se **primeiraCarta** está vazia, a carta é virada e armazenada na variável **primeiraCarta**.
        -   Se **segundaCarta** está vazia, a carta é virada e armazenada em **segundaCarta**. Em seguida, a função `checarCartas` é chamada para verificar se as duas cartas formam um par.

### 6. Função `checarCartas()`

```javascript
function checarCartas() {
    const primeiraTarefa = primeiraCarta.getAttribute("data-carta");
    const segundaTarefa = segundaCarta.getAttribute("data-carta");

    if (primeiraTarefa == segundaTarefa) {
        primeiraCarta = "";
        segundaCarta = "";
    } else {
        setTimeout(() => {
            primeiraCarta.classList.remove("carta-virada");
            segundaCarta.classList.remove("carta-virada");

            primeiraCarta = "";
            segundaCarta = "";
        }, 600);
    }
}
```

-   **checarCartas()**: Função que verifica se as duas cartas viradas são do mesmo par.
    -   A função recupera o valor do atributo `data-carta` das cartas viradas (**primeiraCarta** e **segundaCarta**).
    -   Se os valores forem iguais, as cartas permanecem viradas e as variáveis **primeiraCarta** e **segundaCarta** são resetadas.
    -   Se os valores forem diferentes, as cartas são viradas novamente após um intervalo de 600 milissegundos, usando `setTimeout()`. As variáveis também são resetadas.

## Fluxo do Jogo

1. O jogo começa com a criação e embaralhamento das cartas.
2. O jogador clica nas cartas para virá-las.
3. Se o par de cartas for encontrado (ou seja, as cartas viradas forem do mesmo tipo), elas permanecem visíveis.
4. Se as cartas não formarem um par, elas são viradas novamente após um pequeno intervalo.
5. O jogador pode reiniciar o jogo clicando no botão de reinício.

## Conclusão

Este código implementa um jogo de memória simples utilizando JavaScript, HTML e CSS. A dinâmica de jogo é baseada em virada de cartas e verificação de pares correspondentes, com a funcionalidade adicional de reiniciar o jogo ao clicar no botão de reinício.
