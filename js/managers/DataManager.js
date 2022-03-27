//
// js/managers/DataManager
//

'use strict';

/* 
# imports 
*/
import { formatDate } from "../Utils.js";

// Returns promise with json show data
export function fetchShowData(id) {
    return fetch("https://api.tvmaze.com/shows/" + id).then(response => response.json());
}

// Returns promise with json shows data in date
export function fetchScheduleShows(date) {
    return fetch("https://api.tvmaze.com/schedule" + (date ? ("?date=" + formatDate(date)) : "")).then(response => response.json());
}