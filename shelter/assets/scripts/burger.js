const burger = document.body.querySelector('.burger-wrapper');
const menu = document.body.querySelector('.nav-menu__list');
const header = document.body.querySelector('.header');
const shadow = document.body.querySelector('.shadow');
const footerShadow = document.body.querySelector('.footer-shadow')
const footerLink = document.body.querySelectorAll('.footer-link');
const petsLink = document.body.querySelector('#pets-link');
const navMenu = document.body.querySelector('.nav-menu');


function burgerManage() {
    const state = {
        burgerOn: false,
    }
    const sliderIn = () => {
        burger.classList.toggle('active');
        menu.classList.toggle('visibility');
        header.classList.toggle('over-burger');
        shadow.classList.toggle('hidden');
        if (!state.burgerOn) {
            document.documentElement.style.overflowY = 'hidden';
        } else {
            document.documentElement.style.overflowY = 'initial';
        }
        state.burgerOn = !state.burgerOn;
    }

    footerLink.forEach((item) => {
        item.addEventListener('click', () => {
            sliderIn();
        })
    })
    burger.addEventListener('click', () => {
        sliderIn()
    });
    shadow.addEventListener('click', () => {
        if (state.burgerOn) {
            sliderIn()
        }
    });
    navMenu.addEventListener('click', (event) => {
        event.stopPropagation();
    })
}

const mediaQuery = window.matchMedia('(max-width: 767px)')

function handleMobileChange(e) {
    if (e.matches) {
        burgerManage();
    }
}

mediaQuery.addListener(handleMobileChange);
handleMobileChange(mediaQuery);