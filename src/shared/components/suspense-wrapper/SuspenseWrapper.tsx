import { FC, ReactElement, Suspense } from 'react';

interface SuspenseWrapperProps {
  element: ReactElement;
};

const SuspenseWrapper: FC<SuspenseWrapperProps> = ({ element }) => {
  return (
    <>
      <Suspense fallback={<div>Loading.....</div>}>
        {element}
      </Suspense>
    </>
  );
};

export default SuspenseWrapper;