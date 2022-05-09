const url = '../../assets/data/data.json';
const slider = document.querySelector('.pets-content-slider-body');
let data;

const loadData = async () => {
    const response = await fetch(url);
    data = await response.json();
   
    for (let i = 0; i <= data.length; i++) {
        const item = data[i] ?? data[0];
        const card = document.createElement('div');
        card.className = 'card';
        let num;
        i < data.length ? num = i : num = 0
        card.setAttribute('date-num', num);
        card.innerHTML = `
            <figure class="card-text" data-num=${num}>
                <img src=${item.img} alt="${item.name}" width="270" height="270">
                <figcaption>${item.name}</figcaption>
            </figure>
            <button class="button-card button-color button-color-opacity modal-open" data-num=${num}>Learn more</button>
        `;
        slider.append(card);
    }
    const modalOpenButton = document.querySelectorAll('.card');
    const modal = document.querySelector('.modal');
    const modalWrapper = document.querySelector('.modal-wrapper');

    open(modalOpenButton, openModal, modalWrapper, modal)        
}

loadData()
