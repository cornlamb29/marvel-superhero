import React from 'react'
import { usePosition } from '@/store/positions'
import HeroTile from '@/components/HeroTile'
import { Position } from '@/store/positions/types'
import Navbar from '@/components/Navbar'
import { Tiles } from './styled'



/**
 * Builder page
 * @returns {React.ReactElement}
 */
const Builder = (): React.ReactElement => {
  const [selectedPosition, setSelectedPosition] = usePosition()

  return (<>
  <article>
    <h1>SuperHero Team Builder</h1>

    <Tiles>
      {Object.values(Position).map(position => (
        <HeroTile
          key={position}
          title={position}
          name="???"
          onClick={() => setSelectedPosition(position)}
          className={selectedPosition === position ? 'selected' : ''}
        />
      ))}
    </Tiles>
  </article>
  <Navbar />
</>)
}

export default Builder
