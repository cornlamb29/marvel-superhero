import 'dotenv/config'
import axios from 'axios'
import CryptoJS from 'crypto-js'

// Load API keys from environment variables
const publicKey = process.env.MARVEL_PUBLIC_KEY as string
const privateKey = process.env.MARVEL_PRIVATE_KEY as string

/**
 * Generate Marvel API hash
 * @returns {Object} - Timestamp and hash
 */
const generateMarvelApiHash = () => {
  const timestamp = new Date().getTime()
  const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString(CryptoJS.enc.Hex)
  return { timestamp, hash }
}

/**
 * Fetch Marvel characters from the API
 * @param {number} offset - Offset for pagination
 * @param {number} limit - Number of characters to fetch
 * @returns {Promise<Array>} - Array of characters
 */
const fetchMarvelCharacters = async (offset = 0, limit = 20) => {
  const { timestamp, hash } = generateMarvelApiHash()
  const url = `https://gateway.marvel.com:443/v1/public/characters`

  try {
    const response = await axios.get(url, {
      params: {
        ts: timestamp,
        apikey: publicKey,
        hash: hash,
        offset: offset,
        limit: limit
      }
    })
    return response.data.data.results.map((character: any) => ({
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
    }))
  } catch (error) {
    console.error('Error fetching Marvel characters:', error)
    return []
  }
}

export default fetchMarvelCharacters
