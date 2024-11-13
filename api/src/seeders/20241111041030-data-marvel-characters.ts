'use strict'
import fetchMarvelCharacters from '../scripts/fetchMarvelCharacters'
import { QueryInterface } from 'sequelize'

/**
 * Insert character data into the marvel_characters table
 * @param {QueryInterface} queryInterface - QueryInterface instance
 */
const updateCharacterData = async (queryInterface: QueryInterface) => {
  let offset = 0
  const limit = 100
  let hasMore = true

  while (hasMore) {
    // Fetch characters from the API
    const characters = await fetchMarvelCharacters(offset, limit)
    if (characters.length === 0) {
      hasMore = false
      break
    }

    // Insert characters into the database
    try {
      await queryInterface.bulkInsert({ tableName: 'marvel_characters', schema: 'marvel_app' }, characters)
      console.log(`Marvel characters batch with offset ${offset} seeded successfully!`)
    } catch (error) {
      console.error('Error seeding Marvel characters:', error)
    }

    offset += limit
  }
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: any) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {})
    */
    await updateCharacterData(queryInterface)
  },

  async down (queryInterface: QueryInterface, Sequelize: any) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {})
     */
    await queryInterface.bulkDelete('marvel_characters', {}, {})
  }
}
