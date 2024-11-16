"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const axios_1 = __importDefault(require("axios"));
const crypto_js_1 = __importDefault(require("crypto-js"));
// Load API keys from environment variables
const publicKey = process.env.MARVEL_PUBLIC_KEY;
const privateKey = process.env.MARVEL_PRIVATE_KEY;
/**
 * Generate Marvel API hash
 * @returns {Object} - Timestamp and hash
 */
const generateMarvelApiHash = () => {
    const timestamp = new Date().getTime();
    const hash = crypto_js_1.default.MD5(timestamp + privateKey + publicKey).toString(crypto_js_1.default.enc.Hex);
    return { timestamp, hash };
};
/**
 * Fetch Marvel characters from the API
 * @param {number} offset - Offset for pagination
 * @param {number} limit - Number of characters to fetch
 * @returns {Promise<Array>} - Array of characters
 */
const fetchMarvelCharacters = async (offset = 0, limit = 20) => {
    const { timestamp, hash } = generateMarvelApiHash();
    const url = `https://gateway.marvel.com:443/v1/public/characters`;
    try {
        const response = await axios_1.default.get(url, {
            params: {
                ts: timestamp,
                apikey: publicKey,
                hash: hash,
                offset: offset,
                limit: limit
            }
        });
        return response.data.data.results.map((character) => ({
            id: character.id,
            name: character.name,
            description: character.description || null,
            modified: character.modified ? new Date(character.modified) : null,
            thumbnail: character.thumbnail ? `${character.thumbnail.path}.${character.thumbnail.extension}` : null,
            comics: JSON.stringify(character.comics),
            series: JSON.stringify(character.series),
            stories: JSON.stringify(character.stories),
            events: JSON.stringify(character.events),
            urls: JSON.stringify(character.urls),
            resource_uri: character.resourceURI
        }));
    }
    catch (error) {
        console.error('Error fetching Marvel characters:', error);
        return [];
    }
};
exports.default = fetchMarvelCharacters;
