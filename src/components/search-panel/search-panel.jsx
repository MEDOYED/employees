import { Component } from "react";

import "./search-panel.css";

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
    };
  }

  onUpdateSearch = e => {
    const term = e.target.value;
    this.setState({ term: term });
    this.props.onUpdateSearch(term); // тута ми передаєм const term (2 строчки вверху) наверх в компонент app.jsx
  };

  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="найти сотрудника"
        value={this.state.term}
        onChange={this.onUpdateSearch}
      />
    );
  }
}

export default SearchPanel;
