import React, { useEffect, useState } from 'react';
import { currencyFormatter } from '../../helpers';
import cx from 'classnames';
import './counter.scss';

export const Counter = ({ total, main }) => {

  const [ showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    setShowFireworks(total % 2000 < 400 && total > 0 && main);
  }, [total, main]);


  const classnames = cx('counter', {
    'counter--over-thousand': showFireworks,
    'counter--small': !main
  });

  return (
    <div className={classnames}>
      <h1><span>$</span>{currencyFormatter(total)}</h1>
    </div>
  );
}
