// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

let introEl = document.querySelector('#intro');
let ulEl = document.querySelector('ul');
let liEl = document.querySelectorAll('li');
ulEl.innerHTML = '';
var romanos = ['zero', 'I', 'II', 'III', 'IV', 'V', 'VI'];

function compararIds(a, b){
    return a.episode_id - b.episode_id;
}

fetch('https://swapi.dev/api/films/') //menu filmes
    .then(resposta => resposta.json())
    .then(dados => {
        let respostas = dados.results;
        respostas.forEach((el) => {
            let novoLi = document.createElement('li');
            ulEl.appendChild(novoLi);
            novoLi.innerHTML = `Episode ${el.episode_id}: ${el.title}`;
            novoLi.id = el.episode_id;

            novoLi.addEventListener('click', function(e){
                introEl.innerHTML = '';
                fetch(`https://swapi.dev/api/films/${e.currentTarget.id}`) //altera intro exibida
                .then(respostaSelecionado => respostaSelecionado.json())
                .then(dadosSelecionado => {
                    let resultadoReq = dadosSelecionado;
                    introEl.innerHTML = `Episode ${resultadoReq.episode_id}\n${resultadoReq.title.toUpperCase()}
                                        \n${resultadoReq.opening_crawl}`;
                });
            });
        });
    });

