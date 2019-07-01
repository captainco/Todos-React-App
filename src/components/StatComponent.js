import React from 'react';

export default class Stat extends React.Component {
  render(){
    const { done, total } = this.props
    return (
      <strong>
        <span>{done} / {total}</span>
      </strong>
    )
  }
}
