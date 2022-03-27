'use strict';

/*
# imports
*/
import Home from "./pages/Home/home.js";
import Show from "./pages/Show/Show.js";
import { fetchShowData } from "./managers/DataManager.js";

// React create reference
const e = React.createElement;

// Node references
const mainContainer = document.querySelector('main');
const headerContainer = document.querySelector('#header-content');

// Load show page with data
export function loadShowByData(showData) {
    document.body.classList.add("showPage");
    
    setHashWithEventPreventDefault( "show/" + showData.show.id );

    ReactDOM.render(e(Show.ShowHeader, { "data": showData }), headerContainer);
    ReactDOM.render(e(Show.ShowBody, { "data": showData }), mainContainer);
}

// Prepare HomeBody component
const homePage = e(Home.HomeBody);

// Open home page
function openHomePage() {
    ReactDOM.render(e(Home.HomeHeader), headerContainer);
    ReactDOM.render(homePage, mainContainer);
}

// Start loading show data then open page
function openShowPage(id) {
    // Start fetching show data
    fetchShowData(id).then((data) => {
        // Open show page with loaded data
        loadShowByData({ name: data.name, show: data });
    });
}

// Handle page to show by hash
function loadPageByHash() {
    const hashVals = window.location.hash.substring(1).split("/");
    switch(hashVals[0]) {
        case "show":
            if(!isNaN(hashVals[1])) {
                openShowPage(hashVals[1]);
                break;
            }
        default:
            window.location.hash = "home";
            openHomePage();
    }
}

// Load valid page
loadPageByHash();

/* ========================= */
/* ===== Hash handling ===== */
/* ========================= */
// This value is needed to keep track where the change comes from
let currentHash = window.location.hash;
// Updates the currentHash value and then updates the location hash to prevent onhashchange event
function setHashWithEventPreventDefault(newHash) {
    currentHash = newHash;
    window.location.hash = newHash;
}
// Handle on hash change
window.onhashchange = function(e) {
    // Prevent unwanted handling
    if(currentHash != window.location.hash) loadPageByHash();
};
/* ========================= */
/* ========================= */
/* ========================= */