const url = '../../assets/data/data.json';
const slider = document.querySelector('.pets-content-bigslider-body');
let data;

function generateRandomList(length) {
    const list = [];
    while (list.length < length) {
        const num = Math.floor(Math.random() * 8);
        if (!list.includes(num)) list.push(num);
    }
    return list;
}
function generateFullList(res) {
    const length = res === 'mobile' ? 3 : res === 'tablet' ? 6 : 8;
    const count = res === 'mobile' ? 16 : res === 'tablet' ? 8 : 6;
    // let list = [];
    const fullList = [];
    // let count = 0;
    // let arr = [];
    for (let i = 0; i < count; i++) {
       fullList.push(generateRandomList(length));
    }

    return fullList;
}

const loadData = async (fullList, count) => {
    const response = await fetch(url);
    data = await response.json();    
    const list = fullList[count];
    slider.innerHTML = '';
    for (let i = 0; i < list.length; i++) {
        const item = data[list[i]];

        const card = document.createElement('div');
        card.className = 'card';
        let num = list[i];
        card.setAttribute('date-num', num)
        card.innerHTML = `
            <figure class="card-text" data-num=${num}>
                <img src="${item.img}" alt="${item.name}" width="270" height="270">
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

let fullList;

const mediaQueryDesktop = window.matchMedia('(min-width: 1280px)')

function handleDesktopChange(e) {
    if (e.matches) {
        fullList = generateFullList();
        loadData(fullList, 0);
    }
}
mediaQueryDesktop.addListener(handleDesktopChange);
handleDesktopChange(mediaQueryDesktop);

const mediaQueryTablet = window.matchMedia('(min-width: 768px) and (max-width: 1279px)');

function handleTabletChange(e) {
    if (e.matches) {
        fullList = generateFullList('tablet');
        loadData(fullList, 0)
    }
}
mediaQueryTablet.addListener(handleTabletChange);
handleTabletChange(mediaQueryTablet);

const mediaQueryMobile = window.matchMedia('(max-width: 767px)')

function handleMobileChange(e) {
    if (e.matches) {
        fullList = generateFullList('mobile');
        loadData(fullList, 0)
    }
}
mediaQueryMobile.addListener(handleMobileChange);
handleMobileChange(mediaQueryMobile);


const leftBtn = document.querySelector('[data-left]');
const beginBtn = document.querySelector('[data-begin]');
const dataCounter = document.querySelector('[data-counter]')
const rightBtn = document.querySelector('[data-right]');
const endBtn = document.querySelector('[data-end]');

const paginationState = {
    length: fullList.length,
    position: 0,
    finished: 'start',
    moveLeft() {
        if (this.position > 0) {
            this.position -= 1;
            if (this.position < 1) {
                this.finished = 'start';
            } else {
                this.finished = 'not';
            }
        }
    },
    moveStart() {
        this.position = 0;
        this.finished = 'start';
    },
    moveRight() {
        if (this.position < this.length - 1) {
            this.position += 1;
            if (this.position >= this.length - 1) {
                this.finished = 'finish';
            } else {
                this.finished = 'not';
            }
        }
    },
    moveEnd() {
        this.position = this.length - 1;
        this.finished = 'finish';
    },
}


const transitionLeft = () => {
    paginationState.moveLeft();
    dataCounter.textContent = paginationState.position + 1;
    loadData(fullList, paginationState.position);
    rightBtn.removeAttribute('disabled');
    endBtn.removeAttribute('disabled');
    if (paginationState.finished === 'start') {
        leftBtn.setAttribute('disabled', '');
        beginBtn.setAttribute('disabled', '');
    }
}
const transitionBegin = () => {
    paginationState.moveStart();
    dataCounter.textContent = paginationState.position + 1;
    loadData(fullList, paginationState.position);
    rightBtn.removeAttribute('disabled');
    endBtn.removeAttribute('disabled');
    leftBtn.setAttribute('disabled', '');
    beginBtn.setAttribute('disabled', '');
}
const transitionRight = () => {
    paginationState.moveRight();
    dataCounter.textContent = paginationState.position + 1;
    loadData(fullList, paginationState.position);
    leftBtn.removeAttribute('disabled');
    beginBtn.removeAttribute('disabled');
    if (paginationState.finished === 'finish') {
        rightBtn.setAttribute('disabled', '');
        endBtn.setAttribute('disabled', '');
    }
}
const transitionEnd = () => {
    paginationState.moveEnd();
    dataCounter.textContent = paginationState.position + 1;
    loadData(fullList, paginationState.position);
    leftBtn.removeAttribute('disabled');
    beginBtn.removeAttribute('disabled');
    rightBtn.setAttribute('disabled', '');
    endBtn.setAttribute('disabled', '');
}

leftBtn.addEventListener('click', transitionLeft);
beginBtn.addEventListener('click', transitionBegin);
rightBtn.addEventListener('click', transitionRight);
endBtn.addEventListener('click', transitionEnd);
