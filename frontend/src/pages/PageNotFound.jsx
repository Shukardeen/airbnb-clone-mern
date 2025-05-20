import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const PageNotFound = () => {
  return (
    <div className='w-full min-h-full flex flex-col justify-center items-center'>

        <DotLottieReact
          src="https://lottie.host/16b52a14-cf9f-48ef-a3f2-8a93682b60b8/6qmYUBbT5T.lottie"
          loop
          autoplay
          className='w-1/2'
        />
        <h1 className='text-3xl font-bold font-jakarta'>Listing not found!</h1>
    </div>
  );
};

export default PageNotFound;