import React from "react";

import Card from "./Card";

let GameBoard = React.createClass({
    getInitialState() {
        return {now: Date.now()};
    },

    render() {
        let deck = [];
        let colors = ["red", "blue", "yellow", "green"];
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let hand = [];
        let key = 0;

        colors.forEach(color => {
            [1, 2].forEach(iteration => {
                numbers.forEach(number => {
                    deck.push({
                        key: ++key,
                        number: number,
                        color: color
                    })
                });

                deck.push({
                    key: ++key,
                    number: "Wild",
                    color: color
                });
            });

            deck.push({
                key: ++key,
                number: "Skip",
                color: "blue"
            });
        });

        for (let i = 0; i < 10; i++) {
            let index = Math.floor(Math.random() * ((deck.length - 1) - 1)) + 0;
            let card = deck[index];

            hand.push(<Card key={card.key} number={card.number} color={card.color} />);

            deck.splice(index, 1);
        }

        hand.sort((left, right) => {
            let response = 0;
            let leftType = typeof left.props.number;
            let rightType = typeof right.props.number;
            let isLeftString = leftType === "string";
            let isRightString = rightType === "string";

            if (leftType === rightType) {
                response = left.props.number > right.props.number;
            } else if (isLeftString) {
                response = 1;
            } else if (isRightString) {
                response = -1;
            }

            return response;
        });

        return (
            <div className="game-board">
                <div className="hand">{hand}</div>
                <button className="button-primary" onClick={this.redeal}>Redeal</button>
            </div>
        )
    },

    redeal() {
        this.setState({now: Date.now()});
    }
});

export default GameBoard;