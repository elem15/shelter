const left = document.querySelector('.arrow-button-left');
const right = document.querySelector('.arrow-button-right');
const sliderBody = document.querySelector('.pets-content-slider-body');
const moveLeft = () => {
    sliderBody.classList.add('transition-left');
    left.setAttribute("disabled", "");
    right.setAttribute("disabled", "");
    left.removeEventListener('click', moveLeft);
    right.removeEventListener('click', moveRight);

}
const moveRight = () => {
    sliderBody.classList.add('transition-right');
    left.setAttribute("disabled", "");
    right.setAttribute("disabled", "");
    right.removeEventListener('click', moveRight);
    left.removeEventListener('click', moveLeft);
}

const generateList = (direction, list) => {
    const possibility = {
        right: [list[0], list[1], list[2]],
        left: [list[6], list[7], list[8]],
    }
    const central = possibility[direction];

    const left = [];
    const right = [];
    let random;
    let i = 0
    while (i < 5) {
        random = Math.floor(Math.random() * 8)
        if (!central.includes(random) && !left.includes(random) && !right.includes(random)) {
            if (left.length < 3) {
                left.push(random);
            } else {
                right.push(random)
            }
            i++
        }
    };
    right[2] = left[1] 

    return [...left, ...central, ...right]; 
}
const generateListTablet = (direction, list) => {
    const possibility = {
        right: [list[2], list[3]],
        left: [list[6], list[7]],
    }
    const central = possibility[direction];

    const left = [];
    const right = [];
    let random;
    let i = 0
    while (i < 6) {
        random = Math.floor(Math.random() * 8)
        if (!central.includes(random) && !left.includes(random) && !right.includes(random)) {
            if (left.length < 4) {
                left.push(random);
            } else {
                right.push(random)
            }
            i++
        }
    };
    right[2] = left[1] 
    return [...left, ...central, ...right]; 
}
const generateListMobile = (direction, list) => {
    const possibility = {
        right: [list[3]],
        left: [list[5]],
    }
    const central = possibility[direction];

    const left = [];
    const right = [];
    let random;
    let i = 0
    while (i < 6) {
        random = Math.floor(Math.random() * 8)
        if (!central.includes(random) && !left.includes(random) && !right.includes(random)) {
            if (left.length < 4) {
                left.push(random);
            } else {
                right.push(random)
            }
            i++
        }
    };
    right[2] = left[1]  
    return [...left, ...central, ...right]; 
}

const mediaQueryTablet = window.matchMedia('(max-width: 1280px)')
const mediaQueryMobile = window.matchMedia('(max-width: 768px)')
const mediaQueryMobileMin = window.matchMedia('(min-width: 768px)')

function handleTabletChange(e) {
    if (e.matches) {
        if (document.documentElement.style.overflowY === 'hidden') {
            sliderIn();
        }
    }
  }
  mediaQueryMobileMin.addListener(handleTabletChange)
  handleTabletChange(mediaQueryTablet)

const replaceCard = (direction) => {
    const list = [];
    for (let i = 0; i < sliderBody.children.length; i++) {
        const count = +sliderBody.children[i].firstElementChild.getAttribute('data-num');
        list.push(count);
    }
    let newList;

    if (mediaQueryMobile.matches) {
        newList = generateListMobile(direction, list);
    }
    else if (mediaQueryTablet.matches) {
        newList = generateListTablet(direction, list);    
    } else {
        newList = generateList(direction, list);
    }      

    for (let i = 0; i < newList.length; i++) {
        const item = data[newList[i]];
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <figure class="card-text" data-num=${newList[i]}>
                <img src=${item.img} alt="${item.name}" width="270" height="270">
                <figcaption>${item.name}</figcaption>
            </figure>
            <button class="button-card button-color button-color-opacity modal-open" data-num=${newList[i]}>Learn more</button>
        `;
        sliderBody.replaceChild(card, sliderBody.children[i])
        
    }
}

left.addEventListener('click', moveLeft);
right.addEventListener('click', moveRight);

sliderBody.addEventListener('animationend', (e) => {
    if (e.animationName === 'move-left' || e.animationName === 'move-left-tablet' || e.animationName === 'move-left-mobile') {
        sliderBody.classList.remove('transition-left');
        left.addEventListener('click', moveLeft);
        right.addEventListener('click', moveRight);
        left.removeAttribute("disabled");
        right.removeAttribute("disabled");
        replaceCard('left');
    } else {
        sliderBody.classList.remove('transition-right');
        right.addEventListener('click', moveRight);
        left.addEventListener('click', moveLeft);
        left.removeAttribute("disabled");
        right.removeAttribute("disabled");
        replaceCard('right');

    }
    const modalOpenButton = document.querySelectorAll('.card');
    const modal = document.querySelector('.modal');
    const modalWrapper = document.querySelector('.modal-wrapper');

    open(modalOpenButton, openModal, modalWrapper, modal);
})
