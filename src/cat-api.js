import axios from 'axios';
const BASE_URL = 'https://api.thecatapi.com/v1/';
const X_API_KEY =
  'live_6YPBYYsSvY47jIAX3PEFDiQl87jAC2U7uxGbHfe3inIEzc5wnsBxPB8DbD2bLWiS';
axios.defaults.headers.common['x-api-key'] = X_API_KEY;

function fetchBreeds() {
  return fetch(`${BASE_URL}breeds?api_key=${X_API_KEY}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}images/search?breed_ids=${breedId}&api_key=${X_API_KEY}`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
