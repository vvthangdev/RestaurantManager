import React, { useEffect, useReducer } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getAll } from '../../services/orderService';
import classes from './order.module.css';
import Title from '../../components/Title/Title';
import Datetime from '../../components/Datetime/Datetime';
import Price from '../../components/Price/Price';

const initialState ={}
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type){
    case 'ORDER_LOADED':
      return {...state, orders: payload};
    default:
      return state;
  }
}

export default function Order() {
  const [{allStatus, orders  }, dispatch] = useReducer ( reducer, initialState);
  const { filter } = useParams();

  useEffect(() =>{
    getAll(filter).then(orders => {dispatch({type: 'ORDER_LOADED', payload: orders});})

  }, [filter]);

  

  return (<div className={classes.containers}>
    <Title title="ORDER" margin="1.5rem 0 0.2rem" fontSize="1.9rem" />
    {
      orders && orders.map(order =>(
        <div key={order.id} className={classes.order_summary}>
          <div className={classes.header}>
            <span>
              {order.id}
            </span>
            <span>
              <Datetime date={order.createAt} />
            </span>
            <span>{order.status}</span>
          </div>
          <div className={classes.items}>
            {order.items.map(item =>
              <Link key={item.food.id} to={`/food/${item.food.id}`}>
                <img src={item.food.imageUrl} alt={item.food.name} />
              </Link>
            )}
          </div>
          <div>
            <span className={classes.price}>
              <Price price={order.TotalPrice} />
            </span>
          </div>

        
        </div>
      )
      )
    }

  </div>)
}
