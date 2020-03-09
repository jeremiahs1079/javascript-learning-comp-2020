const section = document.querySelector('section');
const button = document.querySelector('button');

// section.className = 'red-bg visible'; 


button.addEventListener('click', () => {
    section.classList.toggle('visible');
    section.classList.toggle('invisible');
})