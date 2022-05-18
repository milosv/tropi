import React, { useEffect, useState, useRef } from 'react';
import cx from 'classnames';
import { Counter } from '../components/counter/Counter';

import './presentation.scss';

export const Presentation = () => {

  const [totalAmount, setTotalAmount] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const stream = useRef(null);

  const handleData = (data) => {
    const result = JSON.parse(data);
    setTotalAmount(result.total);
    setPageIndex(result.page);
  }

  useEffect(() => {
    stream.current = new EventSource(`http://${window.location.hostname}:4000/sse`, { withCredentials: true });

    stream.current.onopen = () => {
      console.log('Opened connection 🎉');
    };

    stream.current.onerror = (event) => {
      console.log('Error: ' + JSON.stringify(event));
    };

    stream.current.onmessage = (event) => {
      handleData(event.data);
      console.log('Received Message: ' + event.data);
    };
  }, []);

  const classnames = cx('slide', {
    'slide--counter': pageIndex < 1,
    'slide--1': pageIndex === 1,
    'slide--2': pageIndex === 2,
    'slide--3': pageIndex === 3,
    'slide--4': pageIndex === 4,
    'slide--5': pageIndex === 5,
    'slide--6': pageIndex === 6,
    'slide--7': pageIndex === 7,
    'slide--8': pageIndex === 8,
    'slide--9': pageIndex === 9
  });

  return (
    <div className={classnames}>
      <Counter total={totalAmount} main={pageIndex === 0} />
    </div>
  )
}
