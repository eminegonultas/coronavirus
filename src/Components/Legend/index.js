import React, { useEffect, useState } from "react";
import cm from "./legend.module.css";

import { useHistory } from "react-router-dom";

const Legend = ({ items }) => {
  let history = useHistory();

  return (
    <div className={cm.body}>
      Legend
      <table>
        <tr>
          <td
            className={cm.colorbox}
            style={{ backgroundColor: items[0].color }}
          ></td>
          <td>0-2</td>
        </tr>
        <tr>
          <td
            className={cm.colorbox}
            style={{ backgroundColor: items[1].color }}
          ></td>
          <td>2-4</td>
        </tr>
        <tr>
          <td
            className={cm.colorbox}
            style={{ backgroundColor: items[2].color }}
          ></td>
          <td>4-6</td>
        </tr>
        <tr>
          <td
            className={cm.colorbox}
            style={{ backgroundColor: items[3].color }}
          ></td>
          <td>6-8</td>
        </tr>
        <tr>
          <td
            className={cm.colorbox}
            style={{ backgroundColor: items[4].color }}
          ></td>
          <td>8-10</td>
        </tr>
      </table>
    </div>
  );
};

export default Legend;
