import React from "react";

const Mytable2 = (props) => {

  const propsname = Object.keys(props);
  const dataArray = Object.values(props);

  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">{propsname[0]}</th>
            <th scope="col">{propsname[1]}</th>
            <th scope="col">{propsname[2]}</th>
          </tr>
        </thead>
        <tbody>
          {dataArray[0].map((x, index) => {
            return (
              <tr key={index}>
                <th scope="row">{dataArray[0][index]}</th>
                <td>{dataArray[1][index].toFixed(5)}</td>
                <td>{dataArray[2][index].toFixed(5)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Mytable2;
