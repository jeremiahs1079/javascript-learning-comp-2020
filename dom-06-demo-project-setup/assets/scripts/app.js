const addModal = document.getElementById('add-modal');
const deleteModal = document.getElementById('delete-modal');
const backDrop = document.getElementById('backdrop');
const movieUL = document.getElementById('movie-list');

const addMovieBtn = document.querySelector('header').querySelector('button');
const cancelBtn = addModal.querySelector('div button');
const addMovieModelBtn = addModal.querySelector('div .modal__actions').lastElementChild;
const inputs = addModal.querySelectorAll('input');

const movieList = [];

const addMovieModelBtnHandler = () => {
    const movie = {
        title: inputs[0].value,
        imageURL: inputs[1].value,
        rating: inputs[2].value,
    }

    addMoveToList(movie);
    toggleMovieModal();
    clearInputs();
};

const cancelBtnHangler = () => {
    clearInputs();
    toggleMovieModal();
};

const clearInputs = () => {
    for(const input of inputs) {
        input.value = '';
    }
}

const addMoveToList = (movie) => {
    movieList.push(movie);
    const newListItem = document.createElement('li');
    newListItem.innerText = `${movie.title}`;
    newListItem.className ='movie-element';
    movieUL.appendChild(newListItem);
};

const backDropClickHandler = () => {
    toggleBackdrop();
    addModal.classList.remove('visible');
};

const toggleBackdrop = () => {
    backDrop.classList.toggle('visible');
};

const toggleMovieModal = () => {
    toggleBackdrop();
    addModal.classList.toggle('visible');
};



addMovieBtn.addEventListener('click', toggleMovieModal);
backDrop.addEventListener('click', backDropClickHandler);
cancelBtn.addEventListener('click', cancelBtnHangler);
addMovieModelBtn.addEventListener('click', addMovieModelBtnHandler);
