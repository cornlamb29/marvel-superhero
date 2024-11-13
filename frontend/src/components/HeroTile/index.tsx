import React, { PropsWithChildren } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Box, Typography } from '@mui/material'
import { useTeamPositions } from '@/store/teamPositions'
import useApi from '@/hooks/Api/useApi'
import { TileProps } from './types'
import './style.scss'


/**
 * HeroTile Component
 * @param {string} header - Header text
 * @param {string} footer - Footer text
 * @param {string} imageSrc - Image src image path default is select-your-hero.jpg
 * @returns {React.ReactElement}
 */
const HeroTile = ({ title, name, onClick, className, children }: PropsWithChildren<TileProps>): React.ReactElement => {
  const [teamPosition] = useTeamPositions()
  const { Characters } = useApi()
  const characterId = teamPosition[title]

  const { data: character } = useQuery({
    queryKey: ['character', characterId],
    queryFn: async () => {
      if (!characterId) return {}
      const response = await Characters.getById(characterId)
      return response.data ? response.data : {}
    },
    enabled: !!characterId,
    staleTime: 60000 // Cache results for 1 minute
  })

  const handleClick = () => {
    onClick && onClick()
  }

  return (<Box className={ `tile-wrapper ${className}` } onClick={ handleClick }>
    <Box className="tile-header">
      <Typography variant="h6">{ title }</Typography>
    </Box>

    <Box className="tile-content">
      { children || <img src={ character && character.thumbnail ? character.thumbnail : '/images/select-your-hero.jpg' } alt="" className="tile-image" /> }
    </Box>

    <Box className="tile-footer">
      <Typography variant="subtitle1">{ character && character.name ? character.name : name }</Typography>
    </Box>
  </Box>)
}

export default HeroTile
