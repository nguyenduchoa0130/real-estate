import { shareSelectors } from '@selectors/share.selectors';
import { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface AuthProps {
  children: ReactElement;
}

const Auth: FC<AuthProps> = ({ children }) => {
  const navigate = useNavigate();
  const currentUser = useSelector(shareSelectors.selectCurrentUser);
  if (!currentUser) {
    navigate(-1);
    return null;
  }
  return (
    <>{children}</>
  );
};

export default Auth;