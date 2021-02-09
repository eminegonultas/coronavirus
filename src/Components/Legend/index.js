import React, { useEffect, useState } from "react";
import cm from "./legend.module.css";

import { useHistory } from "react-router-dom";

const Legend = ({ items }) => {
  let history = useHistory();

  return (
    <div className={cm.body}>
      <div className={cm.legendTitle}>{items[0].title}</div>
      <table>
        <tr>
          <td
            className={cm.colorbox}
            style={{ backgroundColor: items[0].color }}
          ></td>
          <td>{items[0].range}</td>
        </tr>
        <tr>
          <td
            className={cm.colorbox}
            style={{ backgroundColor: items[1].color }}
          ></td>
          <td>{items[1].range}</td>
        </tr>
        <tr>
          <td
            className={cm.colorbox}
            style={{ backgroundColor: items[2].color }}
          ></td>
          <td>{items[2].range}</td>
        </tr>
        <tr>
          <td
            className={cm.colorbox}
            style={{ backgroundColor: items[3].color }}
          ></td>
          <td>{items[3].range}</td>
        </tr>
        <tr>
          <td
            className={cm.colorbox}
            style={{ backgroundColor: items[4].color }}
          ></td>
          <td>{items[4].range}</td>
        </tr>
      </table>
      {items[0] && items[0].title && items[0].title !== "Vaccine" ? (
        <div className={cm.subtitle}>*Per One Million</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Legend;
