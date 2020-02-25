import axios from 'axios';

const instanceFilms = axios.create({
  baseURL: 'https://swapi.co/api/films/'
});

export default instanceFilms;