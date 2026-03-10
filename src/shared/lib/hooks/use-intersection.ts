import { useEffect, useState } from 'react'

export function useIntersection<T extends Element>(rootMargin = '0px') {
  const [node, setNode] = useState<T | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (!node) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry?.isIntersecting ?? false)
    }, { rootMargin })

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [node, rootMargin])

  return {
    isIntersecting,
    setNode,
  }
}
