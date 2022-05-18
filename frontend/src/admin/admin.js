import React, { useState } from "react";
import axios from "axios";
import { Donations } from '../enums';

import "./admin.scss";

export function Admin() {
  const [currentPage, setCurrentPage] = useState('');


  const handleClick = (amount) => {
    axios
      .post(
        `${window.location.protocol}//${window.location.hostname}:4000/add`,
        {
          amount: amount,
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleReset = () => {
    axios
      .delete(
        `${window.location.protocol}//${window.location.hostname}:4000/reset`
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);

    axios
    .post(
      `${window.location.protocol}//${window.location.hostname}:4000/page`,
      {
        page: page,
      }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <div className="admin">
      <ul className="admin__amounts">
        {Donations.map((item)=> {
          if(item.amount > 0) {
            return (
              <li key={`${item.pageIndex.toString()}`}>
                <button type="button" onClick={() => handleClick(item.amount)}>${item.amount}</button>
              </li>
              );
          } else {
            return null;
          }
        })}
      </ul>
      <ul className="admin__pages">
        <li><button type="button" onClick={() => handlePageClick(0) }>Show counter</button></li>
        {Donations.map((item) => {
          return(
          <li key={`${item.pageIndex.toString()}-${item.amount.toString()}`}>
            <button type="button" onClick={() => handlePageClick(item.pageIndex)}>{item.page} for {item.amount}</button>
          </li>
          );
        })}
      </ul>
      <p>{currentPage}</p>
      <div className="admin__reset-holder">
        <button type="button" onClick={handleReset}>RESET</button>
      </div>
    </div>
  );
}
