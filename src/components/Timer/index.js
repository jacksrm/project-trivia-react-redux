import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  resetTimer,
  setChronometer,
  startChronometer,
  stopChronometer,
  updateTime,
} from '../../redux/actions/timerActions';
import './style.css';

class NewTimer extends Component {
  componentDidUpdate() {
    const { stop, time } = this.props;
    console.log('atualizou!');
    if (time === 0) {
      stop();
    }
  }

  componentWillUnmount() {
    const { reset, stop } = this.props;
    stop();
    reset();
  }

  render() {
    const { time } = this.props;
    return <div className="timer">{`${time}s`}</div>;
  }
}

NewTimer.propTypes = {
  reset: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setChronometerInstance: (chronometer) => dispatch(setChronometer(chronometer)),
  update: (time) => dispatch(updateTime(time)),
  reset: () => dispatch(resetTimer()),
  stop: () => dispatch(stopChronometer()),
  start: (execute) => dispatch(startChronometer(execute)),
});

const mapStateToProps = ({ timer: { chronometer, time } }) => ({
  chronometer,
  time,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTimer);
