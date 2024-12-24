import React, { Children } from 'react';
import { useAuth } from '../../hooks/useAuth';
import NotFound from '../NotFound/NotFound';
import AuthRoute from '../AuthRoute/AuthRoute';
import HeaderFoodsAdminPage from '../HeaderFoodsAdmin/HeaderAdmin';
import HeaderAdmin from '../HeaderFoodsAdmin/HeaderAdmin';

const AdminRoute = ({children}) => {
    const {admin} = useAuth();
    return admin ? (
        admin.isAdmin ? children :
        <>
            <HeaderAdmin/>
            <NotFound
                linkRoute="/admin/dashboard"
                linkText="Trở về trang Điều khiển"
                message="Bạn không có quyền truy nhập trang này!"
            />
        </>
    ) : (
        <NotFound
            linkRoute="/menu"
            linkText="Trở về trang Thực đơn"
            message="Bạn không có quyền truy nhập trang này!"
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