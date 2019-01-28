import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header>
        <div className="header-title">
          <h1>
            <span className="header-title-primary">{this.props.user.name}</span>
            <span className="header-title-secondary">
              find your favourite movies
            </span>
          </h1>

          <button
            className="button button-red"
            onClick={this.props.onDeleteClick}
          >
            delete
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
