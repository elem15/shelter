
function openModal(num, modal, modalWrapper) {
    const pet = data[num];
    modalWrapper.innerHTML = `
    <button class="arrow-button button-color button-color-opacity close"><img src="../../assets/icons/Vector.svg" alt=""></button>
    <img class="modal-wrapper-pet" src=${pet.img} alt=${pet.name} width="500" height="500">
    <div class="modal-wrapper-text">
        <h3>${pet.name}</h3>
        <h4 class="subtitle">${pet.breed}</h4>                        
        <p class="text">${pet.description}</p>
        <ul class="list">
            <li><span><b>Age</b>: ${pet.age}</span></li>
            <li><span><b>Inoculations</b>: ${pet.inoculations.join(', ')}</span></li>
            <li><span><b>Diseases</b>: ${pet.diseases.join(', ')}</span></li>
            <li><span><b>Parasites</b>: ${pet.diseases.join(', ')}</span></li>
        </ul>
    </div>
    `
    modal.classList.remove('hidden');
    document.documentElement.style.overflow = 'hidden';
    const closeButton = document.querySelector('.close');

    const closeModal = () => {
        modal.classList.add('hidden');
        document.documentElement.style.overflow = 'initial';
    }
    modal.addEventListener('click', closeModal);
    closeButton.addEventListener('click', closeModal);


    modal.addEventListener('mouseover', () => {
        closeButton.style.backgroundColor = '#FDDCC4'
    })
    modal.addEventListener('mouseout', () => {
        closeButton.style.backgroundColor = 'rgba(255,255,255,0)'
    })
    closeButton.addEventListener('mouseover', () => {
        closeButton.style.backgroundColor = '#FDDCC4'
    })
    closeButton.addEventListener('mouseout', () => {
        closeButton.style.backgroundColor = 'rgba(255,255,255,0)'
    })
    modalWrapper.addEventListener('click', (e) => {
        e.stopPropagation();
    })
    modalWrapper.addEventListener('mouseover', (e) => {
        e.stopPropagation();
    })
    modalWrapper.addEventListener('mouseout', (e) => {
        e.stopPropagation();
    })
}
function open(modalOpenButton, openModal, modalWrapper, modal) {
    for (let i = 0; i < modalOpenButton.length; i++) {
        modalOpenButton[i].addEventListener('click', (e) => {            
            const num = modalOpenButton[i].lastElementChild.getAttribute('data-num')
            openModal (num, modal, modalWrapper);
        })
    }
}