import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyElement from "./components/CurrencyElement";
import Title from "./components/Title";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [currencyFrom, setCurrencyFrom] = useState();
  const [currencyTo, setCurrencyTo] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  function handleSwapCurrencies(e) {
    const firstCurrency = currencyFrom;
    setCurrencyFrom(currencyTo);
    setCurrencyTo(firstCurrency);
  }

  useEffect(() => {
    if (currencyFrom != null && currencyTo != null) {
      fetch(`${BASE_URL}?base=${currencyFrom}&symbols=${currencyTo}`)
        .then((response) => response.json())
        .then((data) => setExchangeRate(data.rates[currencyTo]));
    }
    console.log();
  }, [currencyFrom, currencyTo]);

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => {
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setCurrencyFrom(data.base);
        setCurrencyTo(Object.keys(data.rates)[0]);
        setExchangeRate(data.rates[Object.keys(data.rates)[0]]);
      });
  }, []);

  return (
    <>
      <div id="title">
        <Title />
      </div>
      <div id="container" className="container">
        <div className="row">
          <div className="col-12 col-md-5">
            <CurrencyElement
              currencyOptions={currencyOptions}
              selectedCurrency={currencyFrom}
              onChangeCurrency={(e) => setCurrencyFrom(e.target.value)}
              onChangeAmount={handleFromAmountChange}
              amount={fromAmount}
            />
          </div>
          <div className="col-12 col-md-2" onClick={handleSwapCurrencies}>
            <svg
              id="exchangeIcon"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="exchange-alt"
              class="svg-inline--fa fa-exchange-alt fa-w-16"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"
              ></path>
            </svg>
          </div>
          <div className="col-12 col-md-5">
            <CurrencyElement
              currencyOptions={currencyOptions}
              selectedCurrency={currencyTo}
              onChangeCurrency={(e) => setCurrencyTo(e.target.value)}
              onChangeAmount={handleToAmountChange}
              amount={toAmount}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
