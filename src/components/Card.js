import React from "react";
import PropTypes from "prop-types";
import Color from "color";
import CopyBtn from "./CopyBtn";
import ColorBox from "./ColorBox";
import "../stylesheets/Card.css";

/**
 * Card
 *
 * @prop {String} gradientCSS  CSS rule for the app gradient
 * @prop {Color} textColor     The text color that fits the gradient
 * @prop {Object} colors       An object containing "from" and "to" colors
 * @prop {Function} flipColors A function to flip to and from colors
 */
class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = { flipped: false };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.flipColors();
    this.setState({ flipped: !this.state.flipped });
  }

  render() {
    const circleStyle = {
      background: this.props.gradientCSS,
      color: this.props.textColor,
    };
    const btnClass = this.state.flipped ? "flip-btn" : "flip-btn flipped";
    return (
      <div id="card-container">
        <CopyBtn gradientCSS={this.props.gradientCSS} />
        <div className="card-circle" style={circleStyle} />
        <div className="card-colors">
          <ColorBox label="From" color={this.props.colors.from} />
          <div className="flip-container">
            <button className={btnClass} onClick={this.handleClick}>
              <i className="fal fa-exchange" />
            </button>
          </div>
          <ColorBox label="To" color={this.props.colors.to} />
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  gradientCSS: PropTypes.string.isRequired,
  textColor: PropTypes.instanceOf(Color).isRequired,
  colors: PropTypes.shape({
    from: PropTypes.instanceOf(Color).isRequired,
    to: PropTypes.instanceOf(Color).isRequired,
  }).isRequired,
  flipColors: PropTypes.func.isRequired,
};

export default Card;
