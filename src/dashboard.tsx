/** @jsx webjsx.createElement */
import * as webjsx from "webjsx";
import { applyDiff } from "webjsx";

declare module "webjsx" {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * Sidebar navigation
       */
      "dashboard-sidebar": {};

      /**
       * Stock Price widget
       */
      "stock-price": {
        symbol: string;
        price: string;
      };

      /**
       * Stock Trend widget
       */
      "stock-trend": {
        symbol: string;
        trend: string;
      };

      /**
       * Stock Overview widget
       */
      "stock-overview": {
        symbol: string;
        description: string;
      };
    }
  }
}

// Sidebar Web Component
class DashboardSidebar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const vdom = (
      <div class="sidebar">
        <h2>Stocks Dashboard</h2>
        <ul>
          <li>Overview</li>
          <li>Stocks</li>
          <li>Market News</li>
          <li>Settings</li>
        </ul>
      </div>
    );

    applyDiff(this, vdom);
  }
}

if (!customElements.get("dashboard-sidebar")) {
  customElements.define("dashboard-sidebar", DashboardSidebar);
}

// Stock Price Widget Web Component
class StockPrice extends HTMLElement {
  static get observedAttributes() {
    return ["symbol", "price"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const symbol = this.getAttribute("symbol") || "";
    const price = this.getAttribute("price") || "0.00";

    const vdom = (
      <div class="widget stock-price">
        <h3>{symbol} - Price</h3>
        <p>{price} USD</p>
      </div>
    );

    applyDiff(this, vdom);
  }
}

if (!customElements.get("stock-price")) {
  customElements.define("stock-price", StockPrice);
}

// Stock Trend Widget Web Component
class StockTrend extends HTMLElement {
  static get observedAttributes() {
    return ["symbol", "trend"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const symbol = this.getAttribute("symbol") || "";
    const trend = this.getAttribute("trend") || "No trend data";

    const vdom = (
      <div class="widget stock-trend">
        <h3>{symbol} - Trend</h3>
        <p>{trend}</p>
      </div>
    );

    applyDiff(this, vdom);
  }
}

if (!customElements.get("stock-trend")) {
  customElements.define("stock-trend", StockTrend);
}

// Stock Overview Widget Web Component
class StockOverview extends HTMLElement {
  static get observedAttributes() {
    return ["symbol", "description"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const symbol = this.getAttribute("symbol") || "";
    const description =
      this.getAttribute("description") || "No description available";

    const vdom = (
      <div class="widget stock-overview">
        <h3>{symbol} - Overview</h3>
        <p>{description}</p>
      </div>
    );

    applyDiff(this, vdom);
  }
}

if (!customElements.get("stock-overview")) {
  customElements.define("stock-overview", StockOverview);
}

// Main App Component
const App = () => {
  const stockData = [
    {
      symbol: "AAPL",
      price: "145.23",
      trend: "Upward",
      description: "Apple Inc.",
    },
    {
      symbol: "GOOGL",
      price: "2731.56",
      trend: "Downward",
      description: "Alphabet Inc.",
    },
    {
      symbol: "TSLA",
      price: "755.83",
      trend: "Upward",
      description: "Tesla Inc.",
    },
  ];

  const vdom = (
    <div class="dashboard">
      <dashboard-sidebar></dashboard-sidebar>
      <div class="main-content">
        <h1>Dashboard</h1>
        <div class="widgets">
          {stockData.map((stock) => (
            <>
              <stock-price
                symbol={stock.symbol}
                price={stock.price}
              ></stock-price>
              <stock-trend
                symbol={stock.symbol}
                trend={stock.trend}
              ></stock-trend>
              <stock-overview
                symbol={stock.symbol}
                description={stock.description}
              ></stock-overview>
            </>
          ))}
        </div>
      </div>
    </div>
  );

  const container = document.getElementById("app");
  if (container) {
    applyDiff(container, vdom);
  }
};

// Initialize the App
App();

// Optional: Add basic styles
const style = document.createElement("style");
style.textContent = `
  .dashboard {
    display: flex;
    font-family: Arial, sans-serif;
    max-width: 900px;
    margin: 50px auto;
  }

  .sidebar {
    width: 200px;
    background-color: #333;
    color: white;
    padding: 20px;
    border-radius: 8px 0 0 8px;
  }

  .sidebar h2 {
    color: #fff;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
  }

  .sidebar ul li {
    padding: 10px 0;
    cursor: pointer;
    color: #ccc;
  }

  .sidebar ul li:hover {
    color: #fff;
  }

  .main-content {
    flex: 1;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 0 8px 8px 0;
  }

  .widgets {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .widget {
    padding: 20px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .widget h3 {
    margin-top: 0;
  }
`;
document.head.appendChild(style);
