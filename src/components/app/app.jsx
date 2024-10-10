import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalEmployees: 0,
      data: [
        {
          name: "John C.",
          salary: 800,
          increase: true,
          rise: true,
          id: 1,
        },
        {
          name: "Alex M.",
          salary: 3000,
          increase: false,
          rise: false,
          id: 2,
        },
        {
          name: "Carl W.",
          salary: 5000,
          increase: true,
          rise: false,
          id: 3,
        },
      ],
    };
    this.maxId = 4;
  }

  deleteItem = id => {
    this.setState(({ data }) => {
      return {
        data: data.filter(item => item.id !== id),
      };
    });
  };

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.maxId++,
    };
    this.setState(prevState => {
      return {
        data: [...prevState.data, newItem],
      };
    });
  };

  onToggleIncrease = id => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, increase: !item.increase };
        }
        return item;
      }),
    }));
  };

  onToggleRise = id => {
    console.log(`Rise this ${id}`);
  };

  totalNumberOfEmployees = () => {
    this.setState(({ data }) => {
      const totalEmployees = Object.keys(data).length;
      return { totalEmployees };
    });
  };

  componentDidMount() {
    this.totalNumberOfEmployees();
  }

  render() {
    return (
      <div className="app">
        <AppInfo
          data={this.state.data}
          totalEmployees={this.state.totalEmployees}
        />

        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>

        <EmployeesList
          data={this.state.data}
          onDelete={this.deleteItem}
          onToggleIncrease={this.onToggleIncrease}
          onToggleRise={this.onToggleRise}
        />

        <EmployeesAddForm
          onAdd={this.addItem}
          totalNumberOfEmployees={this.totalNumberOfEmployees}
        />
      </div>
    );
  }
}

export default App;
