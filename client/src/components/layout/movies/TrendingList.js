import React, { Component } from "react";

import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import axios from "axios";
import TrendingMovie from "./TrendingMovie";

class TrendingList extends Component {
  state = {
    top_movies: []
  };

  componentDidMount() {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=cbf8a5918204c1c55f4c7ce039c99036&language=en-US&page=1"
      )
      .then(res => {
        this.setState({
          top_movies: res.data.results.splice(0, 10),
          loading: false
        });
        console.log(res.data.results);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <section className="section-trending">
        <div className="section-trending-header">
          <h2>Trending Movies</h2>
        </div>

        <div className="section-trending-body">
          <Carousel
            infinite
            slidesPerPage={5}
            slidesPerScroll={2}
            animationSpeed={1500}
            autoPlay={3000}
            stopAutoPlayOnHover
            itemWidth={200}
          >
            {this.state.top_movies.map(movie => (
              <TrendingMovie movie={movie} key={movie.id} />
            ))}
          </Carousel>
        </div>
      </section>
    );
  }
}

export default TrendingList;
