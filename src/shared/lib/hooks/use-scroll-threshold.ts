import { useEffect, useState } from 'react'

export function useScrollThreshold(threshold = 320) {
  const [isPastThreshold, setIsPastThreshold] = useState(false)

  useEffect(() => {
    const updateState = () => {
      setIsPastThreshold(window.scrollY > threshold)
    }

    updateState()
    window.addEventListener('scroll', updateState, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateState)
    }
  }, [threshold])

  return isPastThreshold
}
