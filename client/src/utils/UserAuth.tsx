import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { auth } from '../api';
import UserContext from './userContext';

const UserAuth: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
  const navigate = useNavigate();

  const [isAlert, setIsAlert] = useState<{
    isOpen: boolean;
    title: string;
    type: string;
  }>({
    isOpen: false,
    title: '',
    type: '',
  });

  const {
    data: user,
    refetch,
    isSuccess,
    isFetching,
  } = useQuery({
    queryFn: () => auth(),
    queryKey: ['authorization'],
    retry: false,
    onError: () => navigate('/signup'),
  });

  const userLogout = (): void => {
    localStorage.removeItem('token');
    refetch();
    navigate('/signup');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        refetch,
        userLogout,
        isSuccess,
        isFetching,
        setIsAlert,
        isAlert,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserAuth;
