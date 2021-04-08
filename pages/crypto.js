import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import "../src/configureAmplify";

const Crypto = () => {
  const [input, setInput] = useState({ limit: 5, start: 0 });
  const [coins, setCoins] = useState([]);

  function updateInputValues(type, value) {
    setInput({ ...input, [type]: value });
  }

  async function fetchCoins() {
    const { limit, start } = input;
    const data = await API.get(
      "cryptoapi",
      `/coins?limit=${limit}&start=${start}`
    );

    console.log(data.coins);

    setCoins(data.coins);
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center my-8">
        <input
          className="mx-2 text-gray-600 text-xl bg-white h-10 w-60 px-5 pr-10 border-2 shadow-sm rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          placeholder="start"
          onChange={(e) => updateInputValues("start", e.target.value)}
        />
        <input
          className="mx-2 text-gray-600 text-xl bg-white h-10 w-60 px-5 pr-10 border-2 shadow-sm rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          onChange={(e) => updateInputValues("limit", e.target.value)}
          placeholder="limit"
        />
        <button
          className="mx-2 px-8 py-2 rounded-full bg-blue-500 text-white max-w-max shadow-sm hover:shadow-lg transition ease-in-out delay-800 focus:outline-none focus:border-transparent active:bg-blue-800"
          onClick={fetchCoins}
        >
          Fetch Coins
        </button>
      </div>
      <div className="flex flex-col">
        {coins.length > 1
          ? coins.map((coin, index) => (
              <div className="flex flex-col mx-auto my-10" key={index}>
                <div className="text-4xl font-bold text-gray-900">
                  {coin.name} - {coin.symbol}
                </div>
                <div className="text-2xl font-bold mx-auto">
                  ${coin.price_usd}
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Crypto;
