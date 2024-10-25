import { Component } from "react";

import "./employees-add-form.scss";

class EmployeesAddForm extends Component {

  state = {
    name: "",
    salary: "",
    namePlaceholder: "Как его зовут?",
    salaryPlaceholder: "З/П в $?",
    isCorrectlyEntered: true,
  };


  onValueChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.name.length >= 3 && this.state.salary >= 100) {
      this.props.onAdd(this.state.name, this.state.salary);
      this.setState({
        name: "",
        salary: "",
        namePlaceholder: "Как его зовут?",
        salaryPlaceholder: "З/П в $?",
        isCorrectlyEntered: true,
      });
    } else {
      this.setState({
        name: "",
        salary: "",
        namePlaceholder: "Введите правильное имя",
        salaryPlaceholder: "З/П доложна бить больше 100$",
        isCorrectlyEntered: false,
      });
    }
  };

  render() {
    const {
      name,
      salary,
      namePlaceholder,
      salaryPlaceholder,
      isCorrectlyEntered,
    } = this.state;

    return (
      <div className="app-add-form">
        <h3>Добавьте нового сотрудника</h3>
        <form className="add-form d-flex" onSubmit={this.onSubmit}>
          <input
            type="text"
            className={`form-control new-post-label ${
              isCorrectlyEntered ? "" : "incorrectly-entered"
            }`}
            // placeholder="Как его зовут?"
            placeholder={namePlaceholder}
            name="name"
            value={name}
            onChange={this.onValueChange}
          />
          <input
            type="number"
            className={`form-control new-post-label ${
              isCorrectlyEntered ? "" : "incorrectly-entered"
            }`}
            placeholder={salaryPlaceholder}
            name="salary"
            value={salary}
            onChange={this.onValueChange}
          />

          <button type="submit" className="btn btn-outline-light">
            Добавить
          </button>
        </form>
      </div>
    );
  }
}

export default EmployeesAddForm;
