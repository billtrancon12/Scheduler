import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Input extends Component {
  render() {

    // If the input is select then different format
    if(this.props.type === "select"){
        let options = this.props.options.map(item => {
            if(item.selectable){
                return(
                    <option key={item.id} className={item.className} id={item.id} value={item.value} name={item.name}>{item.placeholder}</option>
                )
            }

            return(
                <option key={item.id} className={item.className} id={item.id} value={item.value} name={item.name} selected disabled hidden>{item.placeholder}</option>
            )
        });

        return (
            <React.Fragment>
                <select className={this.props.className} id={this.props.id} name={this.props.name} onChange={this.props.onChange}>
                    {options}
                </select>
            </React.Fragment>
        )
    }

    if(this.props.type === 'textarea'){
        return (
            <React.Fragment>
                <textarea className={this.props.className} id={this.props.id} name={this.props.name} value={this.props.value} placeholder={this.props.placeholder} onChange={this.props.onChange}></textarea>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <input className={this.props.className} id={this.props.id} name={this.props.name} type={this.props.type} value={this.props.value} placeholder={this.props.placeholder} onChange={this.props.onChange}></input>
        </React.Fragment>
    )
  }
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    options: PropTypes.array,
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string
}