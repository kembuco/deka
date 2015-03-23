import React from "react";
import Router, {Route, DefaultRoute} from "react-router";

import Application from "./components/Application";
import GameBoard from "./components/GameBoard";

var routes = (
    <Route name="home" path="/" handler={Application}>
        <DefaultRoute handler={GameBoard} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
});