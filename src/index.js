import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selectEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const divEl = document.querySelector('.cat-info');

errorEl.style.display = 'none';

let catsArr = null;

function initSlimSelect() {
  const slimSelect = new SlimSelect({
    select: document.querySelector('.breed-select'),
    settings: {
      showSearch: false,
    },
  });

  return slimSelect;
}

function showSlimSelect() {
  selectEl.style.display = 'flex';
  initSlimSelect();
}

selectEl.style.display = 'none';

fetchBreeds()
  .then(data => {
    catsArr = data;
    data.forEach(el => {
      const oprionEl = document.createElement('option');
      oprionEl.value = el.id;
      oprionEl.textContent = el.name;
      selectEl.append(oprionEl);
    });
    loaderEl.style.display = 'none';
    showSlimSelect();
  })
  .catch(err => {
    console.log(err);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

selectEl.addEventListener('change', event => {
  divEl.innerHTML = '';
  fetchCatByBreed(event.target.value)
    .then(data => {
      const currentCatData = catsArr.find(el => el.id === event.target.value);
      divEl.innerHTML = `
                <img src="${data[0].url}" alt="cats" width= 50% >
                <div>
                    <p class="cat-header">${currentCatData.name}</p>
                    <p>${currentCatData.description}</p>
                    <p><b>Temperament</b> - ${currentCatData.temperament}</p>
                </div>
                `;
    })
    .catch(err => {
      console.warn(err);
      divEl.innerHTML = '';
      loaderEl.style.display = 'none';
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
});
