import Modal from './modal.js';

const modal = Modal();

const modalTitle = document.querySelector('.modal-wrapper h2');
const modalDescription = document.querySelector('.modal-wrapper p');
const modalButton = document.querySelector('.modal-wrapper button');

// Pegando todos os botões que existem com a classe check
const checkButtons = document.querySelectorAll('.actions a.check'); 

// quando clicar em marcar como lido
checkButtons.forEach(button => {
    button.addEventListener('click', handlerClick);
});

// BOTÃO DE EXCLUIR
   const deleteButton = document.querySelectorAll('.actions a.delete');

// quando clicar em excluir
deleteButton.forEach(button => { 
    button.addEventListener('click', (event) => handlerClick(event, false));
 })

function handlerClick(event, check  = true) {
    event.preventDefault();

    const text = check ? 'Marcar como lida' : 'Excluir';
    modalTitle.innerHTML = `${text} esta pergunta`;
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLocaleLowerCase()} esta pergunta`;
    modalButton.innerHTML = `Sim, ${text.toLocaleLowerCase()}`;
    check ? modalButton.classList.remove('red') : modalButton.classList.add('red');
    // Abrir o Modal
    modal.open();  
}
