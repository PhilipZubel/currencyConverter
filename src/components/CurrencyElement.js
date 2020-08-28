import React from "react";
import "./CurrencyElement.css";

const CurrencyElement = (props) => {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;
  return (
    <div id="card" className="card pt-2">
      <div id="currencyElement">
        <div id="inputContainer">
          <input
            type="number"
            value={amount}
            onChange={onChangeAmount}
            className="form-label"
            id="inputBox"
          />
        </div>

        <select
          id="selectItem"
          className="custom-select selectItem"
          value={selectedCurrency}
          onChange={onChangeCurrency}
        >
          {currencyOptions.map((currency) => (
            <option className="optionItem" key={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencyElement;
