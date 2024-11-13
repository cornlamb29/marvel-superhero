const textfieldTheme = {
  styleOverrides: {
    root: {
      minWidth: 200,
      '& label': {
        color: '#fff',
      },
      '& .MuiInputBase-input': {
        color: '#fff',
      }
    },

    '& .MuiOutlinedInput-root': {
      color: '#fff',
      backgroundColor: '#181818',
      borderColor: '#646cff',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#5050ff',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#646cff',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#888',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#646cff',
    }
  }
}

export default textfieldTheme