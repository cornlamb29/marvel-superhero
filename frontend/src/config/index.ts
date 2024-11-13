export const loader = {
  delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
  minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
}

export const messages = {
  app: {
    crash: 'Oooops! Sorry, something went wrong.',
  },
  loader: {
    fail: 'There is something wrong with this component loading process. Try again later.',
  },
  images: {
    failed: 'Something went wrong during image loading',
  },
  404: 'Page not found',
}