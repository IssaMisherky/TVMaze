//
// js/Utils
//

'use strict';

// Converts string to html elements array except of scripts
export function safeHtmlDecode(input) {
    // Prevent javascript injection
    input = input.replaceAll(/<script>[\s\S]+<\/script>/g, "");
    // Create div domNode
    var e = document.createElement('div');
    // Place input as html
    e.innerHTML = input;
    // React elements
    let elems = [];
    // Convert each node to a react element
    e.childNodes.forEach(element => {
        const tagName = element.tagName.toLowerCase(); // Lowercase tag name
        elems.push(React.createElement(tagName, { key: elems.length }, element.innerText)); // Create and add the react element
    });
    // Return react elements
    return elems;
}

// Fetch image url to base64
export function urlContentToDataUri(url, signal){
    // Fetch image url with signal to provide controll of the request from outer scope
    return  fetch(url, { signal: signal })
            .then( response => response.blob() ) // Read response as blob data
            .then( blob => new Promise(callback => { // Return a new promise to wait for conversion
                let reader = new FileReader();
                reader.onload = function() { callback(this.result) /* Resolve promise with the base64 result */ };
                reader.readAsDataURL(blob); // Read blob data as url ( base64 )
            })) ;
}

// Formats date to YYYY-mm-dd
export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(); // Seperate month, year and day

    if (month.length < 2) 
        month = '0' + month; // Add 0 if needed
    if (day.length < 2) 
        day = '0' + day; // Add 0 if needed

    return [year, month, day].join('-'); // Join to YYYY-mm-dd
}

/* =================== UI =================== */

// Keep an element hovering in its fixed position
export function hoverInBody(domNode) {
    // Get dimentions
    const pos = domNode.getBoundingClientRect();
    // Fixed position
    domNode.style.position = "fixed";
    // Update dimentions
    domNode.style.top = pos.y + "px";
    domNode.style.left = pos.x + "px";
    domNode.style.width = pos.width + "px";
    domNode.style.height = pos.height + "px";
    // Place in body
    document.body.appendChild(domNode);
}