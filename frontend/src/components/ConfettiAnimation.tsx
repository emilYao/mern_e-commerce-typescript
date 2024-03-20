import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const ConfettiAnimation = () => {
    const { width, height } = useWindowSize()
    
  return (
    <Confetti
    recycle={false}
      width={width}
      height={height}
      numberOfPieces={2000}
    />
  )
}

export default ConfettiAnimation
