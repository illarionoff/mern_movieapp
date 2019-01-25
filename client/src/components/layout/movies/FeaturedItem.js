import React, { Component } from "react";
import axios from "axios";

import Article from "./Article";

class FeaturedItem extends Component {
  state = {
    featured: []
  };

  componentDidMount = () => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?sources=entertainment-weekly&apiKey=ed210d8662f040bb8cd78da6d087abf9"
      )
      .then(res => {
        console.log(res);
        this.setState({ featured: res.data.articles });
      })
      .catch(err => console.log(err));
  };

  render() {
    let featuredContent;
    if (this.state.featured.length > 0) {
      featuredContent = (
        <React.Fragment>
          <div className="section-featured-header">
            <h2>Latest news</h2>
          </div>
          <div className="section-featured-body">
            {this.state.featured.map((article, index) => {
              return <Article article={article} key={index} />;
            })}
          </div>
        </React.Fragment>
      );
    } else {
      featuredContent = null;
    }

    return <section className="section-featured">{featuredContent}</section>;
  }
}
export default FeaturedItem;
