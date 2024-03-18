import './style.css';
import Item from './items.js';
import Project from './project.js';
import DomManipulation from './domManipulation.js';
import {compareAsc, format} from "date-fns";

let dd = format (new Date(2014, 1, 11), "yyyy-MM-dd");
console.log(dd);

const dates = [
  new Date(1995, 6, 2),
  new Date(1987, 1, 11),
  new Date(1989, 6, 10),
];
dates.sort(compareAsc);
console.log(dates);

