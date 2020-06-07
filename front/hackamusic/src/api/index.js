import config from "./config.js";
const axios = require("axios").default;

const { apiKey } = config;

const URL_BASE = "https://ws.audioscrobbler.com/";
const URL_GEO =
  "2.0/?method=geo.gettopartists&country=spain&api_key=" +
  apiKey +
  "&format=json&limit=10";
const URL_TOP_TRACKS =
  "2.0/?method=geo.gettoptracks&country=spain&api_key=" +
  apiKey +
  "&format=json&limit=20";
const URL_TOP_TAGS =
  "2.0/?method=chart.gettoptags&api_key=" + apiKey + "&format=json&limit=15";

async function getArtists() {
  try {
    const response = axios.get(`${URL_BASE}${URL_GEO}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getTopTracks() {
  try {
    const response = axios.get(`${URL_BASE}${URL_TOP_TRACKS}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getTopTags() {
  try {
    const response = axios.get(`${URL_BASE}${URL_TOP_TAGS}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default {
  getArtists,
  getTopTracks,
  getTopTags,
};
