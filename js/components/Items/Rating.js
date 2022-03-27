'use strict';

// React create reference
const e = React.createElement;

// Star element instantiator
const star = (key, checked) => e('i', { key: key, className: "fa fa-star" + (checked ? " checked" : ""), "aria-hidden": true });

// ###################
class Rating extends React.Component {
    
    // Star components
    stars = [];

    constructor(props) {
        super(props);

        // Place stars by stars number (props.stars)
        for(let i = 0; i < props.stars; i++) {
            if(props.value) // If there is rating value
                this.stars.push(star(i, props.value > i + 1)); // Place star and check if rating value > (i + 1)
            else
                this.stars.push(star(i)); // Place unchecked star
        }
    }

    // ###################
    render() {
        // If show rating value text as value / number of stars
        if(this.props.showNumber)
            // <div class="rating">
            //     <span class="stars"></span>
            //     <span>{ this.props.value != null ? this.props.value + "/" + this.props.stars : "no ratings" }</span>
            // </div>
            return e('div', { className: 'rating' }, [
                e('span', { key: 0, className: 'stars' }, this.stars),
                e('span', { key: 1 }, this.props.value != null ? this.props.value + "/" + this.props.stars : "no ratings") // Value /number of stars or no rating
            ]);
        else
            // <div class="rating">
            //     <span class="stars"></span>
            // </div>
            return e('div', null, [
                e('span', { key: 0, className: 'stars' }, this.stars)
            ]);
    }

}

// Export module
export default Rating;