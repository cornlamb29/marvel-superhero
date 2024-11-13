import React, { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { 
  TextField,
  Autocomplete,
  CircularProgress,
  Button,
  Box,
  Tooltip
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { usePosition } from '@/store/positions'
import { useTeamPositions } from '@/store/teamPositions'
import { useCurrentUser } from '@/store/auth'
import useApi from '@/hooks/Api/useApi'
import useDebounce from '@/hooks/debouncer'
import { MarvelCharacter } from '@/hooks/Api/types'
import { TeamPositionsState } from '@/store/teamPositions/types'
import { PositionInfo } from '@/store/positions/types'
import { TeamPositions } from '@/hooks/Api/types'
import SignupDialog from './components/SignupDialog'
import './style.scss'


/**
 * Navbar component
 * @returns {React.ReactElement}
 */
const Navbar = (): React.ReactElement => {
  const [selectedPosition] = usePosition()
  const [teamPosition, setTeamPositions] = useTeamPositions()
  const [currentUser] = useCurrentUser()
  const [searchTerm, setSearchTerm] = useState('')
  const [teamName, setTeamName] = useState('')
  const [showSignup, setShowSignup] = useState(false)
  const { Characters } = useApi()
  const characterId = teamPosition[selectedPosition]

  const debouncedSetSearch = useDebounce((value: string) => {
    setSearchTerm(value)
  }, 500)

  const { data: characters, isLoading } = useQuery({
    queryKey: ['characters', searchTerm],
    queryFn: async () => {
      if (!searchTerm) return []
      const response = await Characters.getByName(searchTerm)
      return response ? response : []
    },
    enabled: searchTerm.length > 2, // Only fetch when search term is longer than 2 characters
    staleTime: 60000 // Cache results for 1 minute
  })

  const { data: selectedCharacter } = useQuery({
    queryKey: ['character', characterId],
    queryFn: async () => {
      if (!characterId) return null
      const response = await Characters.getById(Number(characterId))
      return response ?? null
    },
    enabled: !!characterId
  })

  const { mutate: createTeam } = useMutation({
    mutationFn: () => Characters.createTeam(teamName, Object.keys(teamPosition).reduce((acc, key) => {
      const position = key.split(' ')?.pop()?.toLowerCase() || ''
      if (position in acc) {
        const value = teamPosition[key as keyof TeamPositionsState]
        acc[position as keyof TeamPositions] = value ? Number(value) : undefined
      }
      return acc
    }, {} as TeamPositions)),
    onSuccess: () => {
      setTeamName('')
      setTeamPositions({} as TeamPositionsState)
      setSearchTerm('')
    }
  })  

  const handleCharacterSelect = (_: React.SyntheticEvent, character: MarvelCharacter | null) => {
    if (!selectedPosition) return

    setTeamPositions((prev: TeamPositionsState) => ({
      ...prev,
      [selectedPosition]: character ? character.id : null
    }))
  }

  const handleTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value)
  }

  const handleSubmit = () => {
    if (!currentUser) {
      setShowSignup(true)
      return
    }

    createTeam()
  }

  // if we can create form
  const isFormValid = Object.values(teamPosition).every((position) => position !== null) && 
    teamName.trim() !== ''

  return (
    <nav className="fixed-navbar">
      <span className="selected-position-wrapper">
        You are currently selecting: <span className="position-indicator">{selectedPosition}</span>
        <Tooltip
          title={PositionInfo[selectedPosition] || 'No information available'}
          arrow
          placement="top"
          enterDelay={300}
          leaveDelay={200}
        >
          <HelpOutlineIcon
            fontSize="small"
            sx={{ marginLeft: '5px', cursor: 'pointer', transition: 'transform 0.2s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </Tooltip>
      </span>

      <Autocomplete
        id="hero-select"
        options={characters || []}
        getOptionLabel={(option: MarvelCharacter) => option.name}
        filterOptions={(x) => x} // Disable built-in filtering
        onInputChange={(_, value) => debouncedSetSearch(value)}
        onChange={handleCharacterSelect}
        loading={isLoading}
        value={selectedCharacter || null}
        clearIcon={<ClearIcon sx={{ color: 'red' }} />}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a hero..."
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(props, option: MarvelCharacter) => (
          <li {...props} key={option.id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={option.thumbnail}
                alt={option.name}
                style={{ width: 30, height: 30, marginRight: 10, borderRadius: '50%' }}
                onError={(e) => {
                  // Fallback for broken images
                  (e.target as HTMLImageElement).src = '/placeholder-hero.png'
                }}
              />
              <span>{option.name}</span>
            </div>
          </li>
        )}
      />

      <Box className="team-name">
        <TextField
          label="Team Name"
          variant="outlined"
          value={teamName}
          onChange={handleTeamNameChange}
          sx={{ minWidth: 200 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!isFormValid}
          title={
            !Object.values(teamPosition).every((position) => position !== null)
              ? "Please fill all team positions"
              : !teamName.trim()
                ? "Enter a team name"
                : ""
          }
        >
          Create
        </Button>

        <SignupDialog showSignup={showSignup} onClose={() => setShowSignup(false)} onSignup={handleSubmit} />
      </Box>
    </nav>
  )
}

export default Navbar
