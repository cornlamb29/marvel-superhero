import { Typography } from '@mui/material'
import TutorialVideo from '@/components/TutorialVideo'

export default function TutorialPage() {
  return (
    <article>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
        How to Create Your Team
      </Typography>
      <TutorialVideo />
    </article>
  )
}