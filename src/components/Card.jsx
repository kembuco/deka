import React from "react";

let Card = React.createClass({
    getInitialState() {
        return {
            number: this.props.number,
            color: this.props.color
        }
    },

    render() {
        let number = this.state.number;
        let color = this.state.color;
        let className = `card ${color}` + (number === 6 ? " underline" : "");

        return (
            <div className={className}>
                <span className="card-number-top-left card-number-corner">{number}</span>
                <span className="card-number-center">{number}</span>
                <span className="card-number-bottom-right card-number-corner">{number}</span>
            </div>
        )
    }
});

export default Card;