export const formDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    mount: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString('en-US', options)
}
