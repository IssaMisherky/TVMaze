'use strict';

// React create reference
const e = React.createElement;

// ###################
class LoadingCard extends React.Component {

    // ###################
    render() {
        // <div style={ display: this.props.bussy ? "" : "none" }>
        //     <div class="loading-card">
        //         <i class="fa fa-spinner fa-pulse" style="font-size: 38px;color: black"></i>
        //     </div>
        // </div>
        return e('div', { style: { display: this.props.bussy ? "" : "none" } }, 
            e('div', { className: "loading-card" }, 
                e('i', { 
                        className: "fa fa-spinner fa-pulse", style: {
                            "fontSize": "38px",
                            color: "black"
                        }
                    })
            )
        );
    }

}

// Export module
export default LoadingCard;