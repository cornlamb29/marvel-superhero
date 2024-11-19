import { useState, useRef } from 'react'
import { Box, Stepper, Step, StepLabel, IconButton, Paper } from '@mui/material'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import { TutorialStep } from './types'
import './style.scss'


const steps: TutorialStep[] = [
  { label: 'Select Your Characters', timestamp: 0 },
  { label: 'Create Your Team Name', timestamp: 50 },
  { label: 'Create User Account', timestamp: 70 },
  { label: 'View Your Teams', timestamp: 87 },
]

export default function TutorialVideo() {
  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleStepClick = (index: number) => {
    setActiveStep(index)
    if (videoRef.current) {
      videoRef.current.currentTime = steps[index].timestamp
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <Box sx={{ maxWidth: '800px', margin: '0 auto', p: 3 }} className="tutorial-video">
      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <video
          ref={videoRef}
          style={{ width: '100%', display: 'block' }}
          src="/videos/tutorial.mp4"
          onEnded={() => setIsPlaying(false)}
        />
        
        <Box sx={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <IconButton 
            onClick={() => handleStepClick(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            sx={{ color: 'white' }}
          >
            <SkipPreviousIcon />
          </IconButton>
          
          <IconButton onClick={togglePlay} sx={{ color: 'white' }}>
            {isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon />}
          </IconButton>
          
          <IconButton 
            onClick={() => handleStepClick(Math.min(steps.length - 1, activeStep + 1))}
            disabled={activeStep === steps.length - 1}
            sx={{ color: 'white' }}
          >
            <SkipNextIcon />
          </IconButton>
        </Box>
      </Paper>

      <Box sx={{ mt: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step 
              key={step.label} 
              onClick={() => handleStepClick(index)}
              sx={{ cursor: 'pointer' }}
            >
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  )
}
