import React, { Component } from 'react'
import { ReactTable } from './ReactTable'
import PropTypes from 'prop-types'

export default class Calendar extends Component {
  render() {
    return (
      <ReactTable 
        data={this.props.data} 
        columns={this.props.headers} 
        className="calendar_table_wrapper"
        style={this.props.style}>
    	</ReactTable>
    )
  }
}

Calendar.propTypes = {
	data: PropTypes.array.isRequired,
	headers: PropTypes.array.isRequired,
	style: PropTypes.array
}

