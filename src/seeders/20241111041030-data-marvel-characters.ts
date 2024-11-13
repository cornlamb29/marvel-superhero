import { QueryInterface } from 'sequelize';

const updateCharacterData = async (queryInterface: QueryInterface) => {
  console.log('updateCharacterData::characters', characters);
  
  // Map the characters to only include the fields we want to store
  const simplifiedCharacters = characters.map(char => ({
    id: char.id,
    name: char.name,
    description: char.description,
    modified: char.modified,
    thumbnail: char.thumbnail?.path ? `${char.thumbnail.path}.${char.thumbnail.extension}` : null,
    // Store complex objects as JSON strings if needed
    comics_data: JSON.stringify(char.comics),
    series_data: JSON.stringify(char.series),
    stories_data: JSON.stringify(char.stories),
    events_data: JSON.stringify(char.events),
    urls_data: JSON.stringify(char.urls),
    resource_uri: char.resource_uri,
    created_at: new Date(),
    updated_at: new Date()
  }));

  try {
    await queryInterface.bulkInsert('Characters', simplifiedCharacters);
  } catch (error) {
    console.error('Error seeding Marvel characters:', error);
    throw error;
  }
};

// ... rest of the file remains the same ... 