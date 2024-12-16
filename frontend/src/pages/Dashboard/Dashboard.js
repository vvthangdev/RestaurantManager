import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import classes from './dashboard.module.css';
import { Link } from 'react-router-dom';
import HeaderFoodsAdminPage from '../../components/HeaderFoodsAdmin/HeaderAdmin';
import HeaderAdmin from '../../components/HeaderFoodsAdmin/HeaderAdmin';

export default function Dashboard() {
  const { admin } = useAuth();

  return (
    <>
        <HeaderAdmin/>
        <div className={classes.container}>
        <div className={classes.menu}>
        {allItems
          .filter(item => admin.isAdmin || !item.forAdmin)
          .map(item => (
            <Link
              key={item.title}
              to={item.url}
              style={{
                backgroundColor: item.bgColor,
                color: item.color,
              }}
            >
              <img src={item.imageUrl} alt={item.title} />
              <h2>{item.title}</h2>
            </Link>
          ))}
      </div>
    </div>
    </>
  );
}

const allItems = [
  {
    title: 'Đặt bàn',
    imageUrl: '/icons/orders.svg',
    url: '/admin/ordersmanagement',
    bgColor: '#ec407a',
    color: 'white',
  },
  {
    title: 'Tài khoản',
    imageUrl: '/icons/accounts.svg',
    url: '/admin/accounts',
    forAdmin: true,
    bgColor: '#1565c0',
    color: 'white',
  },
  {
    title: 'Bàn',
    imageUrl: '/icons/tables.svg',
    url: '/admin/tablemanagement',
    // forAdmin: true,
    bgColor: '#00bfa5',
    color: 'white',
  },
  {
    title: 'Món ăn',
    imageUrl: '/icons/foods.svg',
    url: '/admin/foods',
    // forAdmin: true,
    bgColor: '#e040fb',
    color: 'white',
  },
  {
    title: 'Liên hệ',
    imageUrl: '/icons/contacts.svg',
    url: '/admin/contactsmanagement',
    // forAdmin: true,
    bgColor: '#fbbe40',
    color: 'white',
  },
];