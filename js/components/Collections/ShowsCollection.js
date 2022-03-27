'use strict';

/* 
# imports 
*/
import { loadShowByData } from "/js/main.js";
import ShowItem from '/js/components/Items/ShowItem.js';
import LoadingCard from "../Items/LoadingCard.js";
import { urlContentToDataUri, hoverInBody } from '../../Utils.js';
import { fetchScheduleShows } from "../../managers/DataManager.js";

// React create reference
const e = React.createElement;

// Collection of shows
class ShowsCollection extends React.Component {

    // Fetch controller used to abort last one when fetching new image
    static lastFetchController;

    // Changes body background on image hover
    itemImageFocus(originalUrl) {
        // If loading previus image then cancel and load new one ( mostly to fix slow network problems )
        if(ShowsCollection.lastFetchController != null) ShowsCollection.lastFetchController.abort();
        // Create new fetch controller
        ShowsCollection.lastFetchController = new AbortController();
        // Load the image as data with the current fetch controller
        urlContentToDataUri(originalUrl, ShowsCollection.lastFetchController.signal).then((dataUri) => {
            // On loaded change the body background with brightning effect as linear
            document.body.style.backgroundImage = "linear-gradient(rgba(200, 200, 200, 0.7), rgba(200, 200, 200, 0.7)), url(" + dataUri + ")";
        });
    }

    // A reference to all the show elements
    refElems = [];

    // Handle show selection
    showSelected(compRef, data) {
        // Fade out all the other shows
        this.refElems.forEach(ref => { if(ref != compRef) ref.setState({ fadeOut: true }); });
        // Wait 8s for the fade out animation
        setTimeout(() => {
            // Get the image component node
            const compNode = ReactDOM.findDOMNode(compRef).querySelector("img");
            // Hover image in fixed position
            hoverInBody(compNode);
            // Set transition style
            compNode.style.transition = "all 1s";
            // Add animation class
            setTimeout(() => { compNode.classList.add("floating_image"); }, 1);
            // Remove node after animation
            setTimeout(() => { compNode.parentNode.removeChild(compNode); }, 600);
            // Scroll to top
            scrollTo(0, 0);
            // Go to show page /// main.loadShowByData
            loadShowByData(data);
        }, 800);
    }

    // ###################
    constructor(props) {
        super(props);

        // Bind function to this scope
        this.showSelected = this.showSelected.bind(this);

        // Setup state
        this.state = {
            resultReady: false,
            showsList: null
        };

        // Fetch shows by date /// DataManager.fetchScheduleShows
        fetchScheduleShows(props.date).then((data) => {
            let elems = [];

            // Shows ready promises
            let promises = [];

            // Create show element for each show data
            for(var i in data)
                // Create promise for ShowItem ready
                promises.push(new Promise((resolve, reject) => {
                    elems.push(e(ShowItem, { 
                        key: data[i].id,
                        ref: (el) => {
                            this.refElems.push(el); // Save a reference to the created component
                        }, 
                        click: this.showSelected,
                        data: data[i], 
                        ready: resolve, // Make promise on ready
                        imageFocus: this.itemImageFocus // Handle image hover
                    }));
                }));

            // Place all elements
            this.setState({ showsList: elems });

            // Display only when all shows ready
            Promise.all(promises).then(_ => {
                // Display all with delay by i
                for(let i = 0; i < this.refElems.length; i++)
                    this.refElems[i].triggerDisplay(i);
                // Result ready
                this.setState({ resultReady: true });
                // Callback ready if exists
                if(this.props.ready) this.props.ready();
            });
            
        });
    }

    // ###################
    render() {
        // <div>
        //     <LoadingCard bussy={ !this.state.resultReady } />
        //     <div class="collection">
        //         { this.state.showsList }
        //     </div>
        // </div>
        return e('div', null, [
            e(LoadingCard, { key: 0, bussy: !this.state.resultReady }),
            e('div', { key: 1, className: "collection" }, this.state.showsList)
        ]);
    }
}

// Export module
export default ShowsCollection;