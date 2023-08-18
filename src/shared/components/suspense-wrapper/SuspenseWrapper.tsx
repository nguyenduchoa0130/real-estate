import { FC, ReactElement, Suspense } from 'react';

type SuspenseWrapperProps = {
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