import "./app-info.css";

const AppInfo = ({ totalEmployees }) => {
  return (
    <div className="app-info">
      <h1>Учет сотрудников в компании MEDOYED'a</h1>
      <h2>Общее число сотрудников: {totalEmployees}</h2>
      <h2>Премию получат: </h2>
    </div>
  );
};

export default AppInfo;
