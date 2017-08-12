import PropTypes from 'prop-types'
import React from 'react'
import ReactHighstock from 'react-highcharts/ReactHighstock.src'

export default function PriceChart ({ priceData, ticker }) {
  const data = priceData
    .map(mapPriceData)
    .sort(sortPriceData)

  const config = {
    rangeSelector: {
      selected: 1
    },
    series: [
      {
        data,
        name: ticker
      }
    ],
    title: {
      text: `${ticker} Stock Price`
    }
  }

  return (
    <ReactHighstock config={config} />
  )
}

PriceChart.propTypes = {
  priceData: PropTypes.array,
  ticker: PropTypes.string
}

function mapPriceData ({ timeStamp, close }) {
  return [(new Date(timeStamp)).getTime(), parseFloat(close)]
}

function sortPriceData (a, b) {
  if (a[0] > b[0]) {
    return 1
  }

  if (b[0] > a[0]) {
    return -1
  }

  return 0
}
