import Confetti from 'react-confetti'

interface IConfetti {
    run: boolean;
}

const SuccessConfetti = (props: IConfetti) => {
    const { run } = props;

  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      run={run}
    />
  )
}

export default SuccessConfetti;