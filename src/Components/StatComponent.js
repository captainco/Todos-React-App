import React from 'react';

export default class Stat extends React.Component {
  render(){
    const {done, total} = this.props
    return (
      <strong>
        <span>Done: {done}</span>/<span>Total: {total}</span>
      </strong>
    )
  }
}
