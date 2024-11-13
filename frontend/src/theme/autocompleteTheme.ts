
const autocompleteTheme = {
  styleOverrides: {
    root: {
      minWidth: 400,
      '& label': {
        color: '#fff',
      },
      '& .MuiAutocomplete-popupIndicator': {
        color: 'white'
      },
    },

    inputRoot: {
      color: '#fff',
      backgroundColor: '#181818',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#fff',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#5050ff',
      },
      '& fieldset span': {
       color: '#fff'
      },
    },
    listbox: {
      backgroundColor: '#000',
      color: '#fff',
    },
    option: {
      '&[aria-selected="true"]': {
        backgroundColor: '#646cff',
      },
      '&:hover': {
        backgroundColor: '#5050ff',
      },
    }
  },
}

export default autocompleteTheme