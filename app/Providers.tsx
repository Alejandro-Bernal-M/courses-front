'use client'
import { Provider } from 'react-redux';
import store from '../redux/store';
import RouteSecurity from '@/utils/SecureRoutes';

interface Props {
  children: React.ReactNode
}

function Providers({children}: Props){
  return (
    <Provider store={store}>
      <RouteSecurity>
        {children}
      </RouteSecurity>
    </Provider>
  )
};

export default Providers;