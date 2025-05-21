import React from 'react';
import styles from './BCard.module.scss';
import { useDispatch } from 'react-redux';
import { deleteBasketThunk, updateBasketCountThunk } from '../../../../redux/reducers/basketSlice';

const BCard = ({ item }) => {
  const dispatch = useDispatch();

  const deleteFromBasket = (id) => {
    dispatch(deleteBasketThunk(id));
  };

  const increaseCount = () => {
    dispatch(updateBasketCountThunk({ id: item._id, count: item.count + 1 }));
  };

  const decreaseCount = () => {
    if (item.count > 1) {
      dispatch(updateBasketCountThunk({ id: item._id, count: item.count - 1 }));
    } else {
      dispatch(deleteBasketThunk(item._id));
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.img}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={styles.description}>
        <h3>{item.name}</h3>
        <p>${item.price}</p>
        <div>
          <button onClick={decreaseCount}>-</button>
          <span>{item.count}</span>
          <button onClick={increaseCount}>+</button>
        </div>
        <button onClick={() => deleteFromBasket(item._id)}>Delete</button>
      </div>
    </div>
  );
};

export default BCard;
