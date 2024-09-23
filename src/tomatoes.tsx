/** @jsx webjsx.createElement */
import * as webjsx from "webjsx";
import { applyDiff } from "webjsx";

declare module "webjsx" {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * Header component for the Rotten Tomatoes homepage
       */
      "homepage-header": {};
      /**
       * Trending section carousel
       */
      "trending-carousel": {};
      /**
       * Movie card for showing movies in lists
       */
      "movie-card": {
        title: string;
        rating: string;
        tomatoMeter: string;
        image: string;
      };
      /**
       * Section component to display lists of movies
       */
      "movie-section": {
        title: string;
      };
    }
  }
}

// Header Web Component
class HomepageHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const vdom = (
      <>
        <style>
          {`
            header {
              background-color: #ff4500;
              color: white;
              padding: 10px 20px;
              border-radius: 8px;
            }

            .header-content {
              display: flex;
              justify-content: space-between;
              align-items: center;
              max-width: 1200px;
              margin: 0 auto;
            }

            nav ul {
              list-style-type: none;
              display: flex;
              gap: 15px;
              padding: 0;
              margin: 0;
            }

            nav ul li {
              display: inline;
            }

            nav ul li a {
              color: white;
              text-decoration: none;
            }
          `}
        </style>
        <header>
          <div class="header-content">
            <div class="logo">
              <h1>Rotten Tomatoes</h1>
            </div>
            <nav>
              <ul>
                <li>
                  <a href="#">Movies</a>
                </li>
                <li>
                  <a href="#">TV Shows</a>
                </li>
                <li>
                  <a href="#">News</a>
                </li>
                <li>
                  <a href="#">Showtimes</a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </>
    );

    applyDiff(this.shadowRoot!, vdom);
  }
}
if (!customElements.get("homepage-header")) {
  customElements.define("homepage-header", HomepageHeader);
}

// Trending Carousel Web Component
class TrendingCarousel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const vdom = (
      <>
        <style>
          {`
            section.trending {
              margin: 20px 0;
              padding: 20px;
              background-color: white;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            .carousel {
              display: flex;
              gap: 15px;
              overflow-x: auto;
            }

            .carousel-item {
              background-color: #ddd;
              padding: 20px;
              border-radius: 8px;
              width: 200px;
              text-align: center;
              flex: 0 0 auto;
            }
          `}
        </style>
        <section class="trending">
          <h2>Trending on RT</h2>
          <div class="carousel">
            <div class="carousel-item">Trending Item 1</div>
            <div class="carousel-item">Trending Item 2</div>
            <div class="carousel-item">Trending Item 3</div>
          </div>
        </section>
      </>
    );

    applyDiff(this.shadowRoot!, vdom);
  }
}
if (!customElements.get("trending-carousel")) {
  customElements.define("trending-carousel", TrendingCarousel);
}

// Movie Card Web Component
class MovieCard extends HTMLElement {
  static get observedAttributes() {
    return ["title", "rating", "tomatoMeter", "image"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title") || "";
    const rating = this.getAttribute("rating") || "";
    const tomatoMeter = this.getAttribute("tomatoMeter") || "";
    const image = this.getAttribute("image") || "";

    const vdom = (
      <>
        <style>
          {`
            .movie-card {
              background-color: #fff;
              padding: 15px;
              border: 1px solid #ddd;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              text-align: center;
              height: 400px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }

            .movie-poster {
              width: 100%;
              height: 250px;
              object-fit: cover;
              border-radius: 8px;
              margin-bottom: 10px;
            }

            h3 {
              margin: 10px 0 5px 0;
            }

            p {
              margin: 5px 0;
            }
          `}
        </style>
        <div class="movie-card">
          <img src={image} alt={`${title} Poster`} class="movie-poster" />
          <h3>{title}</h3>
          <p>Rating: {rating}</p>
          <p>Tomato Meter: {tomatoMeter}%</p>
        </div>
      </>
    );

    applyDiff(this.shadowRoot!, vdom);
  }
}
if (!customElements.get("movie-card")) {
  customElements.define("movie-card", MovieCard);
}

// Movie Section Web Component (to group multiple movies)
class MovieSection extends HTMLElement {
  static get observedAttributes() {
    return ["title"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title") || "";
    const vdom = (
      <>
        <style>
          {`
            .movie-section {
              margin: 20px 0;
              padding: 20px;
              background-color: white;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            h2 {
              margin-top: 0;
            }

            .movie-list {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 15px;
            }
          `}
        </style>
        <section class="movie-section">
          <h2>{title}</h2>
          <div class="movie-list">
            {title === "New & Now in Theaters" ? (
              <>
                <movie-card
                  title="A Clockwork Orange"
                  rating="R"
                  tomatoMeter="91"
                  image="/static/tomatoes/a-clockwork-orange.jpg"
                ></movie-card>
                <movie-card
                  title="Apocalypse Now"
                  rating="R"
                  tomatoMeter="98"
                  image="/static/tomatoes/apocalypse-now.jpg"
                ></movie-card>
                <movie-card
                  title="Chinatown"
                  rating="R"
                  tomatoMeter="99"
                  image="/static/tomatoes/chinatown.jpg"
                ></movie-card>
                <movie-card
                  title="One Flew Over the Cuckoo's Nest"
                  rating="R"
                  tomatoMeter="93"
                  image="/static/tomatoes/one-flew-over-the-cuckoos-nest.jpg"
                ></movie-card>
              </>
            ) : (
              <>
                <movie-card
                  title="Rocky"
                  rating="PG"
                  tomatoMeter="94"
                  image="/static/tomatoes/rocky.jpg"
                ></movie-card>
                <movie-card
                  title="Star Wars"
                  rating="PG"
                  tomatoMeter="92"
                  image="/static/tomatoes/star-wars.jpg"
                ></movie-card>
                <movie-card
                  title="Taxi Driver"
                  rating="R"
                  tomatoMeter="96"
                  image="/static/tomatoes/taxi-driver.jpg"
                ></movie-card>
                <movie-card
                  title="The Godfather"
                  rating="R"
                  tomatoMeter="97"
                  image="/static/tomatoes/the-godfather.jpg"
                ></movie-card>
              </>
            )}
          </div>
        </section>
      </>
    );

    applyDiff(this.shadowRoot!, vdom);
  }
}
if (!customElements.get("movie-section")) {
  customElements.define("movie-section", MovieSection);
}

// Main App Component
const App = () => {
  const vdom = (
    <>
      <style>
        {`
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            height: 100vh;
          }

          #app {
            width: 100%;
            max-width: 1320px;
            margin: 20px auto;
          }

          /* Additional global styles if necessary */
        `}
      </style>
      <div class="homepage">
        <homepage-header></homepage-header>
        <trending-carousel></trending-carousel>
        <movie-section title="New & Now in Theaters"></movie-section>
        <movie-section title="Watch at Home"></movie-section>
      </div>
    </>
  );

  const container = document.getElementById("app");
  if (container) {
    applyDiff(container, vdom);
  }
};

// Initialize the App
App();
