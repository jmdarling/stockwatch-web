import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class AddTickerForm extends Component {
  constructor (props) {
    super(props)

    this.handleTickerChange = this.handleTickerChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      ticker: ''
    }
  }

  render () {
    return (
      <div>
        <input type='text' value={this.state.ticker} onChange={this.handleTickerChange} />
        <button type='button' onClick={this.handleSubmit}>Add Ticker</button>
      </div>
    )
  }

  handleSubmit () {
    this.props.onSubmit(this.state.ticker)
    this.setState({
      ticker: ''
    })
  }

  handleTickerChange ({ target }) {
    this.setState({
      ticker: target.value
    })
  }
}

AddTickerForm.propTypes = {
  onSubmit: PropTypes.func
}
