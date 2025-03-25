export const formatTime = (dateString) => {
  const now = new Date()
  const ago = new Date(dateString)
  const secondAgo = (now.getTime() - ago.getTime()) / 1000

  if (secondAgo < 60) {
    return `${Math.floor(secondAgo)}s ago`
  }
  if (secondAgo < 3600) {
    return `${Math.floor(secondAgo / 60)}m ago`
  }
  if (secondAgo <= 86400) {
    return `${Math.floor(secondAgo / 3600)}h ago`
  }
  if (secondAgo > 86400) {
    const day = Math.floor(secondAgo / 86400)
    return day === 1 ? `${day} day ago` : `${day} days ago`
  }
}
