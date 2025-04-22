// This component is create for fallback rendering.

import LoaderAnim from '../components/LoaderAnim';

const FallBack = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <LoaderAnim/>
    </div>
  )
}

export default FallBack;