import NextNProgressProps from 'nextjs-progressbar'

const ProgressProps = () => {
  return <NextNProgressProps
    color="#29D"
    startPosition={ 0.3 }
    stopDelayMs={ 200 }
    height={ 2 }
    options={{ showSpinner: false }}
  />
}

export default ProgressProps