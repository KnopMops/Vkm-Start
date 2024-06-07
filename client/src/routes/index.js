import { createBrowserRouter } from 'react-router-dom';
import Register from '../pages/authentication/Register';
import CheckEmail from '../pages/authentication/email/CheckEmail';
import CheckPassword from '../pages/authentication/password/CheckPassword';
import ForgotPassword from '../pages/authentication/password/ForgotPassword';
import Message from '../components/Message';

import AuthLayouts from '../layout';
import Home from '../pages/Home';

import App from '../App';

const router = createBrowserRouter([
    {
        path : '/',
        element : <App />,
        children : [
            {
                path : '/auth/register',
                element : <AuthLayouts><Register /></AuthLayouts>
            },
            {
                path : '/auth/email',
                element : <AuthLayouts><CheckEmail /></AuthLayouts>
            },
            {
                path : '/auth/password',
                element : <AuthLayouts><CheckPassword /></AuthLayouts>
            },
            {
                path : '/auth/forgot-password',
                element : <AuthLayouts><ForgotPassword /></AuthLayouts>
            },
            {
                path : '',
                element : <Home />,
                children : [
                    {
                        path : ':user',
                        element : <Message />
                    }
                ]
            }
        ]
    }
]);

export default router;