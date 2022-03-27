'use strict';

/*
# imports
*/
import ShowsCollection from '/js/components/Collections/ShowsCollection.js';
import { formatDate } from '../../Utils.js';

// React create reference
const e = React.createElement;

// Home header component
class HomeHeader extends React.Component {
    render() {
        // <span style="margin-bottom: 2rem; display: block;">
        //     <p>TV Show and web series database.</p>
        //     <p>Create personalised schedules. Episode guide, cast, crew and character information.</p>
        // </span>
        return e('span', { style: {
                'marginBottom': '2rem',
                display: 'block'
            } }, [
            e('p', { key: 0 }, 'TV Show and web series database.'),
            e('p', { key: 1 }, 'Create personalised schedules. Episode guide, cast, crew and character information.')
        ]);
    }
}

// Home body component
class HomeBody extends React.Component {

    // Body components ( contains [ ShowsCollection / section divider ] )
    showsElems = [];

    // This value is used to keep track of the current loaded shows date
    lastLoadedDate = new Date();

    // ###################
    constructor(props) {
        super(props);
        
        // Bind function to this scope
        this.scrollHandling = this.scrollHandling.bind(this);

        // Load first shows collection with current date ( by not passing a date )
        this.showsElems.push(e(ShowsCollection, { key: 0 }));
    }

    // Is loading collection
    isLoading = false;

    // Handle scrolling
    scrollHandling(ev) {
        // Check if reached bottom
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            // Can only load one collection at a time
            if(this.isLoading) return;
            // Set as loading
            this.isLoading = true;
            // Go back one day
            this.lastLoadedDate.setDate(this.lastLoadedDate.getDate() - 1);
            // Place a date divider
            this.showsElems.push(e('div', { key: this.showsElems.length, className: "divider" }, [
                e('span', { key: 0 }),
                e('div', { key: 1 }, formatDate(this.lastLoadedDate)),
                e('span', { key: 2 })
            ]));
            // Place new collection with the new date
            this.showsElems.push(e(ShowsCollection, { key: this.showsElems.length, date: this.lastLoadedDate, 
                ready: () => {
                    this.isLoading = false; // On ready set is loading to false in order to be able to load more
                }
            }));
            // Update render
            this.setState({});
        }
    }

    // Handle component mounted
    componentDidMount() {
        // Start Handling scrolling event
        window.onscroll = this.scrollHandling;
    }

    // Handle component will unmount
    componentWillUnmount() {
        // Remove scroll handling
        window.onscroll = null;
    }

    // ###################
    render() {
        // <div>
        //     <h3>Last Added Shows</h3>
        //     <span>
        //         { this.showsElems }
        //     </span>
        // </div>
        return e('div', null, [
            e('h3', { key: 0 }, 'Last Added Shows'),
            e('span', { key: 1 }, this.showsElems)
        ]);
    }
}

// Export module
export default { HomeBody, HomeHeader };