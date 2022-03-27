'use strict';

/* 
# imports 
*/
import Rating from "./Rating.js";

// React create reference
const e = React.createElement;

// Show item component
class ShowItem extends React.Component {

    // Start state
    state = { display: false };

    // Image component
    mediumImage;

    // ###################
    constructor(props) {
        super(props);

        // Bind functions to this scope
        this.click = this.click.bind(this);
        this.ready = this.ready.bind(this);

        // Setup image component
        this.mediumImage = e('img', {
            key: 0, src: this.props.data.show.image ? this.props.data.show.image.medium : "/images/empty.jpg", // If no image then show empty one
            onMouseEnter: () => {
                    this.props.imageFocus(this.props.data.show.image.original); // Handle image hover
                },
            onLoad: this.ready, // On image loaded
            onError: this.ready, // In case no image loaded should show place holder and still be ready
            onClick: this.click
        });
    }

    // Trigger display animation with delay
    triggerDisplay(delay) {
        // Take place in view but keep hidden
        this.setState({ display: true, hidden: true });
        // After delay show the view
        setTimeout(() => { this.setState({ hidden: false }); }, delay * 50);
    }

    // Handle ready
    ready() {
        // Make callback if exists
        if(this.props.ready) this.props.ready();
    }

    // Handle Click
    click() {
        // Make callback
        this.props.click(this, this.props.data);
    }

    // ###################
    render() {
        // <div class={ "show" + (this.state.fadeOut ? " fade_out" : "") + (this.state.hidden ? " hidden" : "") } style={ display: this.state.display ? "" : "none" } >
        //     { this.mediumImage }
        //     <Rating stars=5 value={ this.props.data.show.rating.average != null ? this.props.data.show.rating.average / 2 : null } />
        //     <div class="desc">{ this.props.data.name }</div>
        // </div>
        return e('div', { tabindex: 0, className: "show" + (this.state.fadeOut ? " fade_out" : "") + (this.state.hidden ? " hidden" : ""), 
            style: { display: this.state.display ? "" : "none" } }, [ this.mediumImage,
            // Make sure that there is a rating value then divide it by two so it's ratio becomes 0-5 instead of 0-10
            e(Rating, { key: 1, stars: 5, value: this.props.data.show.rating.average != null ? this.props.data.show.rating.average / 2 : null }),
            e('div', { key: 2, className: "desc" }, this.props.data.show.name)
        ]);
    }

}

// Export module
export default ShowItem;