import React from 'react';

const selects = props => {
  return (
    <select className="currency-selectors" onChange={props.onChange}>
      <option key="default">Please Select One</option>
      {Object.keys(props.countries).map((k, i) => (
        <option key={props.countries[k]} value={props.countries[k]}>
          {k}
        </option>
      ))}
    </select>
  );
};

export default selects;
