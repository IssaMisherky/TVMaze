'use strict';

/*
# imports
*/
import { safeHtmlDecode } from '../../Utils.js';
import Rating from '../../components/Items/Rating.js';

// React create reference
const e = React.createElement;

// Show header component
class ShowHeader extends React.Component {

    // ###################
    render() {
        // <span class="show-header">
        //     <img width="240px" src={ this.props.data.show.image ? this.props.data.show.image.original : "/images/empty.jpg" }/>
        //     <div>
        //         <Rating stars=5 value={ this.props.data.show.rating.average != null ? this.props.data.show.rating.average / 2 : null } showNumber=true />
        //         <h1>{ this.props.data.name }</h1>
        //         <div>{ safeHtmlDecode(this.props.data.show.summary) }</div>
        //     </div>
        // </span>
        return e('span', { className: 'show-header' }, [
            e('img', { width: '240px', key: 0, src: this.props.data.show.image ? this.props.data.show.image.original : "/images/empty.jpg" }),
            e('div', { key: 1 }, [
                // Make sure that there is a rating value then divide it by two so it's ratio becomes 0-5 instead of 0-10
                e(Rating, { key: 0, stars: 5, value: this.props.data.show.rating.average != null ? this.props.data.show.rating.average / 2 : null , showNumber: true }),
                e('h1', { key: 1 }, this.props.data.name),
                e('div', { key: 2 }, safeHtmlDecode(this.props.data.show.summary))
            ])
        ]);
    }
    
}

/* ================================================ */
/* ============ Component instantiator ============ */
/* ================================================ */
// Key value row instantiator
function rowKeyValue(key, value, elemKey = 0) {
    // <div class="row">
    //     <div class="row_title">{ key }</div>
    //     <div>{ value }</div>
    // </div>
    return e('div', { key: elemKey, className: "row" }, [
        e('div', { key: 0, className: "row_title" }, key),
        e('div', { key: 1 }, value)
    ]);
}

// Person row instantiator
function rowPerson(name, role, elemKey = 0) {
    // <div class="row actor">
    //     <div class="profile-image">
    //     <div class="list fill_space">
    //         <div class="row_title fill_space">{ name }</div>
    //         <div class="short">{ role }</div>
    //     </div>
    // </div>
    return e('div', { key: elemKey, className: "row actor" }, [
        e('div', { key: 0, className: "profile-image" }),
        e('div', { key: 1, className: "list fill_space" }, [
            e('div', { key: 0, className: "row_title fill_space" }, name),
            e('div', { key: 1, className: "short" }, role)
        ])
    ]);
}
/* ================================================ */
/* ================================================ */
/* ================================================ */

// Show body component
class ShowBody extends React.Component {

    // ###################
    render() {
        // <div class="show_body_box">
        //     <div>
        //         <h2>Show Info</h2>
        //         <div class="rows-list">
        //             {[
        //                 rowKeyValue("Streamed on", this.props.data.show.network ? this.props.data.show.network.name : "unavailable"),
        //                 rowKeyValue("Schedule", this.props.data.show.schedule.days),
        //                 rowKeyValue("Status", this.props.data.show.status),
        //                 rowKeyValue("Genres", this.props.data.show.genres.join(', '))
        //             ]}
        //         </div>
        //     </div>
        //     <div>
        //         <h2>Starring</h2>
        //         <div class="rows-list">
        //             {[
        //             rowPerson("Victoria Alcock", "Carol"),
        //             rowPerson("Hugo Chegwin", "Beats"),
        //             rowPerson("Allan Mustafa", "Grindah"),
        //             rowPerson("Daniel Sylvester Woolford", "Grindah")
        //             ]}
        //         </div>
        //     </div>
        // </div>
        return e('div', { className: 'show_body_box' }, [
            e('div', { key: 0 }, [
                e('h2', { key: 0 }, "Show Info"),
                e('div', { key: 1, className: "rows-list" }, [
                    rowKeyValue("Streamed on", this.props.data.show.network ? this.props.data.show.network.name : "unavailable", 0),
                    rowKeyValue("Schedule", this.props.data.show.schedule.days, 1),
                    rowKeyValue("Status", this.props.data.show.status, 2),
                    rowKeyValue("Genres", this.props.data.show.genres.join(', '), 3)
                ])
            ]),
            e('div', { key: 1 }, [
                e('h2', { key: 0 }, "Starring"),
                e('div', { key: 1, className: "rows-list" }, [
                    rowPerson("Victoria Alcock", "Carol", 0),
                    rowPerson("Hugo Chegwin", "Beats", 1),
                    rowPerson("Allan Mustafa", "Grindah", 2),
                    rowPerson("Daniel Sylvester Woolford", "Grindah", 3)
                ])
            ])
        ]);
    }
}

// Export module
export default { ShowHeader, ShowBody };