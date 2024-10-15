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
      term: "",
      filter: "all",
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

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  };

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1;
    });
  };

  onUpdateSearch = term => {
    this.setState({ term: term });
  };

  filterPost = (items, filter) => {
    // перший варіант
    switch (filter) {
      case "rise":
        return items.filter(item => item.rise);
      case "moreThan1000":
        return items.filter(item => item.salary > 1000);
      default:
        return items;
    }

    // другий варінт
    // if (filter === "rise") {
    //   return items.filter(items => items.rise);
    // } else if (filter === "salaryMore1000") {
    //   return items.filter(items => items.salary >= 1000);
    // } else {
    //   return items;
    // }
  };

  onFilterSelect = filter => {
    this.setState({ filter: filter });
  };

  render() {
    const { data, term, filter } = this.state;

    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;

    // перший варіант
    const visibleData = this.searchEmp(data, term);
    const filteredData = this.filterPost(data, filter);
    const intersectionData = visibleData.filter(elem =>
      filteredData.includes(elem),
    );

    // другий варіант
    // const intersectionData = this.filterPost(
    //   this.searchEmp(data, term),
    //   filter,
    // );

    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased} />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter onFilterSelect={this.onFilterSelect} filter={filter} />
        </div>

        <EmployeesList
          data={intersectionData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />

        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
