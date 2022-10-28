import { useState, useEffect, MutableRefObject } from "react"

const useIntersectionObserver = (handleMore: () => void) => {
  const [targetRef, setTargetRef] = useState<HTMLButtonElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {      
      entries[0].isIntersecting && handleMore()
    })

    targetRef && observer.observe(targetRef)

    return () => {
      targetRef && observer.unobserve(targetRef)
    }
  }, [targetRef])

  return setTargetRef
}

export default useIntersectionObserver