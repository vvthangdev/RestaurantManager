import React, { Children } from 'react';
import { useAuth } from '../../hooks/useAuth';
import NotFound from '../NotFound/NotFound';
import AuthRoute from '../AuthRoute/AuthRoute';

const AdminRoute = ({children}) => {
    const {user} = useAuth();
    return user.isAdmin ? (
        children
    ) : (
        <NotFound
            linkRoute="/dashboard"
            linkText="Go to Dashboard"
            message="You don't have access to this page"
        />
    )
    
}
/*
AuthRoute ({children : AdminRoute}): true -> AdminRoute(children) : true -> children
                                                        : false -> NotFound
                                    : false -> Login

*/
const AdminRouteExport = ({children}) =>
    (
        <AuthRoute>
            <AdminRoute>{children}</AdminRoute>
        </AuthRoute>
    );
export default AdminRouteExport