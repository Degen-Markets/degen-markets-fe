"use client";

import {useState} from "react";
import {Ticker} from "@/app/lib/utils/bets/types";

export default function CreateBet() {
	// TODO all this logic in useTickers hook
	const [ticker, setTicker] = useState<Ticker>(Ticker.PEPE);
	const tickers = Object.values(Ticker);
	const tickerIndex = tickers.findIndex((tic) => tic === ticker);
	const isStartTicker = tickerIndex === 0;
	const isEndTicker = tickerIndex === tickers.length - 1;

	const tickersToDisplay = (() => {
		if (isStartTicker) {
			return [tickers[tickers.length - 1], ticker, tickers[1]]
		}
		if (isEndTicker) {
			return [tickers[tickers.length - 2], ticker, tickers[0]]
		}
		return tickers.slice(tickerIndex - 1, tickerIndex + 2);
	})();

	const handleTickerBack = () => {
		if (isStartTicker) {
			return setTicker(tickers[tickers.length - 1]);
		}
		return setTicker(tickers[tickerIndex - 1]);
	};

	const handleTickerForward = () => {
		if (isEndTicker) {
			return setTicker(tickers[0]);
		}
		return setTicker(tickers[tickerIndex + 1]);
	};

	return (
		<main>
			<div>
				<div onClick={handleTickerBack}>BACK</div>
				<div onClick={handleTickerForward}>FORWARD</div>
			</div>
		</main>
	);
}