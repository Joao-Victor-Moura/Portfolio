/* Abre e fecha menu lateral em modo mobile */

const menuMobile = document.querySelector('.menu-mobile');
const body = document.querySelector('body')

menuMobile.addEventListener('click', () => {
     menuMobile.classList.contains("bi-list")
        ? menuMobile.classList.replace("bi-list","bi-x")
        : menuMobile.classList.replace("bi-x", "bi-list");
    body.classList.toggle("menu-nav-active");
});

/*Fecha o menu quando clicar em algum item e muda o ícone para list */

const navItem = document.querySelectorAll('.nav-item')

navItem.forEach(item => {
    item.addEventListener("click", () => {
        if (body.classList.contains("menu-nav-active")) {
            body.classList.remove("menu-nav-active")
            menuMobile.classList.replace("bi-x", "bi-list");
        }
  })
})

//Animar todos os itens da tela que tiver o atributo data-anime

const item = document.querySelectorAll("[data-anime]"); // pegando todos os atributos data-anime e armazanando na const item

const animeScroll = () => { // função para a animação do scroll
    const windowTop = window.pageYOffset + window.innerHeight * 0.85; //pegando o topo da página e somando uma altura para criar uma margem pra animação começar assim que scrollar
    
    item.forEach((element) => {
        if (windowTop > element.offsetTop){ //element.offsetTop é a altura que esse elemento está do topo, se o topo da minha página for maior que em relação ao meu elemento para o topo...
            element.classList.add("animate"); // ele vai receber essa classe caso a distância da tela para o topo for maior que a distância do elemento pro topo, 
                                                // ou seja, quando chegar no elemnto vai anima-lo
        } else {
            element.classList.remove("animate"); //remove a animação quando subir o scroll.
        }
    }); 
};

animeScroll();

window.addEventListener("scroll", () => { //pegando o scroll da tela e chamando uma função de callback pra animar o scroll sempre que scrollar a tela 
    animeScroll();
})

//Ativar o carregamento do botão enviar do formulário de contato

const btnEnviar = document.querySelector('#btn-enviar')
const btnEnviarLoader = document.querySelector('#btn-enviar-loader')

btnEnviar.addEventListener("click", () => {
    btnEnviarLoader.style.display = "block";
    btnEnviar.style.display  = "none";
})

//Tirar a mensagem de sucesso de envio do email após 5seg

setTimeout(() => {
    document.querySelector('#alerta').style.display = "none";
}, 5000)