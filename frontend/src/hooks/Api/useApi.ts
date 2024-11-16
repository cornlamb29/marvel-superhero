import axios, { AxiosResponse } from 'axios'
import { useMemo } from 'react'
import { MarvelCharacter, TeamPositions, Team } from './types' // Adjust this import based on your character types definition


/**
 * Custom hook for handling API requests for Marvel characters.
 * @returns {Object}
 */
const useApi = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URI

  return useMemo(() => {
    const instance = axios.create({
      baseURL,
      timeout: 15000,
      withCredentials: true,
      headers: {
        'accept-version': '2',
      },
    })

    const responseBody = (response: AxiosResponse) => response.data

    const requests = {
      get: (url: string) =>
        instance.get(url).then(responseBody),
      post: (url: string, body: object) =>
        instance.post(url, body).then(responseBody),
      patch: (url: string, body: object) =>
        instance.patch(url, body).then(responseBody),
      delete: (url: string, body: object) =>
        instance.delete(url, { data: body }).then(responseBody),
    }

    const Characters = {
      getAll: (): Promise<MarvelCharacter[]> => requests.get('characters'),
      getById: (id: number): Promise<MarvelCharacter> => requests.get(`characters/${id}`)
        .then((response: AxiosResponse) => response.data),
      getByName: (name: string): Promise<MarvelCharacter[]> => requests.get(`characters/search/${name}`)
        .then((response: AxiosResponse) => response.data),
      createTeam: (teamName: string, positions: TeamPositions): Promise<void> => 
        requests.post('characters/team', { teamName, positions }),
      getUserTeams: (): Promise<Team[]> => requests.get('characters/teams')
        .then((response: AxiosResponse) => response.data),
    }

    const Users = {
      signup: (email: string, password: string): Promise<void> => requests.post('users/signup', { email, password }),
      login: (email: string, password: string): Promise<void> => requests.post('users/login', { email, password }),
      logout: (): Promise<void> => requests.post('users/logout', {}),
    }

    return {
      Characters,
      Users,
    }
  }, [baseURL])
}

export default useApi
