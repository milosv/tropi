import React from 'react';
import { currencyFormatter } from '../../helpers';
// import AnimatedNumber from 'animated-number-react';
import cx from 'classnames';
import './counter.scss';

// const formatValue = (value) => value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

export const Counter = ({ total, main }) => {
  const classnames = cx('counter', {
    'counter--over-thousand': total > 9999 && total < 11001,
    'counter--over-two-thousand': total > 1999 && total < 2998,
    'counter--over-three-thousand': total > 2999 && total < 3998,
    'counter--small': !main
  });

  return (
    <div className={classnames}>
      <h1><span>$</span>{currencyFormatter(total)}</h1>
    </div>
  );
}
