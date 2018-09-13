import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Spinner extends Component {
  render() {
    let hidden = this.props.isLoading ? '' : 'hidden';
    return (
      <div className={`loading ${hidden}`}>
        <span className='spinner fa fa-spinner'/>
      </div>
    )
  }
}

Spinner.propTypes = {
  isLoading: PropTypes.bool
};
