import React from "react";
import {RouteHandler, Link, Navigation} from "react-router";

let Application = React.createClass({
    mixins: [Navigation],

    render () {
        return (
            <div className="application">
                <h3 className="application-header">deka</h3>

                <RouteHandler className="container" />
            </div>
        );
    }
});

export default Application;