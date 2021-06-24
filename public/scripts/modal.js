export default function Modal() {

    // BOTÃO DE MARCAR COMO LIDO
    const modalWrapper = document.querySelector('.modal-wrapper');
    // Pegando o botão de cancelar
    const cancelButton = document.querySelector('.modal-wrapper .cancel');
    cancelButton.addEventListener('click', close);

    function open() {
        modalWrapper.classList.add("active");
    }

    function close() {
        modalWrapper.classList.remove("active");
    }

    return { open, close }
}