import React from 'react';

const results = props => {
  return (
    <div
      className={`results
        ${
          props.data.rates[props.convertTo] >= 1
            ? 'green-background'
            : 'red-background'
        }`}
    >
      <h3>
        {props.data.rates[props.convertTo] < 1
          ? 'You are not so rich in that country!'
          : 'Wow you will live like a king!'}
      </h3>
      <h2>{props.baseCountry} = 1</h2>
      <h2>
        {props.convertCountry} = {props.data.rates[props.convertTo]}
      </h2>
    </div>
  );
};

export default results;
