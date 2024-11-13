export interface MarvelCharacter {
  id: number
  name: string
  description: string
  modified: string
  thumbnail: string
  resource_uri: string
  comics: {
    available: number
    collectionURI: string
    items: Array<{ resourceURI: string; name: string }>
    returned: number
  }
  series: {
    available: number
    collectionURI: string
    items: Array<{ resourceURI: string; name: string }>
    returned: number
  }
  stories: {
    available: number
    collectionURI: string
    items: Array<{ resourceURI: string; name: string; type: string }>
    returned: number
  }
  events: {
    available: number
    collectionURI: string
    items: Array<{ resourceURI: string; name: string }>
    returned: number
  }
  urls: Array<{ type: string; url: string }>
}

enum TeamMemberType {
  LEADER = 'leader',
  ENFORCER = 'enforcer',
  OPERATIVE = 'operative',
  INNOVATOR = 'innovator'
}

export type TeamPositions = {
  [key in TeamMemberType]?: number;
}

export type Team = {
  id: number
  name: string
  MarvelCharacters: MarvelCharacter[]
}
  