import React, { Component } from 'react'

import AddTickerForm from './add-ticker-form/AddTickerForm'
import PriceChart from './price-chart/PriceChart'

class App extends Component {
  constructor (props) {
    super(props)

    this.buildPriceChartComponent = this.buildPriceChartComponent.bind(this)
    this.handleAddTicker = this.handleAddTicker.bind(this)

    this.state = {
      priceDatasets: [
        {
          dataset: [],
          ticker: ''
        }
      ]
    }

    const tickers = JSON.parse(window.localStorage.getItem('tickers')) || []

    this.getPriceDatasetsForTickers(tickers)
      .then(priceDatasets => {
        this.setState({
          priceDatasets
        })
      })
  }

  render () {
    return (
      <div>
        {this.state.priceDatasets.map(this.buildPriceChartComponent)}
        <AddTickerForm onSubmit={this.handleAddTicker} />
      </div>
    )
  }

  handleAddTicker (ticker) {
    const currentSavedTickers = JSON.parse(window.localStorage.getItem('tickers')) || []
    window.localStorage.setItem('tickers', JSON.stringify([...currentSavedTickers, ticker]))

    this.getPriceDatasetForTicker(ticker)
      .then(priceDataset => {
        const currentState = this.state.priceDatasets

        this.setState({
          priceDatasets: [...currentState, { dataset: priceDataset, ticker }]
        })
      })
  }

  buildPriceChartComponent ({ dataset, ticker }) {
    return <PriceChart priceData={dataset} ticker={ticker} key={ticker} />
  }

  getPriceDatasetForTicker (ticker) {
    return window.fetch(`/api/mostrecentquotes/${ticker}`).then(response => response.json())
  }

  getPriceDatasetsForTickers (tickers) {
    const priceDatasetRequestPromises = tickers.map(ticker => {
      return this.getPriceDatasetForTicker(ticker)
    })

    return Promise.all(priceDatasetRequestPromises)
      .then(priceDatasets => {
        return priceDatasets.map((priceDataset, index) => {
          return {
            dataset: priceDataset,
            ticker: tickers[index]
          }
        })
      })
  }
}

export default App
