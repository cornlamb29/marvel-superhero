import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Typography } from '@mui/material'
import useApi from '@/hooks/Api/useApi'
import { MarvelCharacter, Team } from '@/hooks/Api/types'
import HeroTile from '@/components/HeroTile'
import { Tiles } from '../Builder/styled'
import './style.scss'


const MyTeams = () => {
  const { Characters } = useApi()

  const { data: teams } = useQuery({
    queryKey: ['teams'],
    queryFn: () => Characters.getUserTeams()
  })

  return (
    <article className="my-teams">
      <h1>My Teams</h1>
      <Tiles>
        {teams?.data.map((team: Team) => (
          <HeroTile
            key={team.id}
            title={team.name}
            name=""
          >
            {team.MarvelCharacters.map((character: MarvelCharacter) => (<Box className="image-wrapper">
              <img src={character.thumbnail} alt="" />
              <Typography component="span" className="text-overlay-type" variant="subtitle1">{character.CharacterTeam.type}</Typography>
              <Typography component="span" className="text-overlay-name" variant="subtitle1">{character.name}</Typography>
            </Box>))}
          </HeroTile>
        ))}
      </Tiles>
    </article>
  )
}

export default MyTeams

