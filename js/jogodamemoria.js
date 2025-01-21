const container = document.querySelector(".container");
const botaoReiniciar = document.querySelector("button");
let cartas;
let primeiraCarta = "";
let segundaCarta = "";

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

botaoReiniciar.addEventListener("click", () => location.reload());

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
