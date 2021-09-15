import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  nextQuestions,
  btnNext,
  revealAnswers,
  hiddenButton,
} from '../../redux/actions';
import {
  resetTimer,
  startChronometer,
  stopChronometer,
  updateTime,
} from '../../redux/actions/timerActions';
import Button from '../Button';

import './style.css';

class Answers extends Component {
  constructor(props) {
    super(props);

    this.nextBtn = this.nextBtn.bind(this);
  }

  componentDidMount() {
    const { start, update } = this.props;
    start(() => update());
  }

  componentDidUpdate(prevProps) {
    const { chronometer, start, update, currentQuestion } = this.props;
    if (!chronometer && prevProps.currentQuestion !== currentQuestion) {
      start(() => update());
    }
  }

  nextBtn() {
    const { btnNextReducer } = this.props;
    btnNextReducer();
  }

  render() {
    const {
      answers,
      nextQuestion,
      currentQuestion,
      time,
      btnNextValue,
      setRevealAnswers,
      goToFeedback,
      hiddenButtonReducer,
      reset,
    } = this.props;
    const QUATRO = 4;
    return (
      <>
        <section className="answers">
          {answers.map((answer, index) => (
            <Button
              key={ index }
              time={ time }
              answer={ answer }
              nextBtn={ this.nextBtn }
            />
          ))}
        </section>
        {btnNextValue || time === 0 ? (
          <button
            className="special-btn next-btn"
            data-testid="btn-next"
            id="btn-next"
            onClick={ () => {
              nextQuestion();
              reset();
              hiddenButtonReducer();
              setRevealAnswers(false);
              if (currentQuestion === QUATRO) goToFeedback();
            } }
            type="button"
          >
            Próxima
          </button>
        ) : (
          false
        )}
      </>

    );
  }
}

Answers.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.object).isRequired,
  btnNextReducer: PropTypes.func.isRequired,
  btnNextValue: PropTypes.bool.isRequired,
  chronometer: PropTypes.number.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  goToFeedback: PropTypes.func.isRequired,
  hiddenButtonReducer: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  setRevealAnswers: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  timer: { chronometer, time },
  questions: { currentQuestion, btnNext: btnNextValue },
}) => ({
  time,
  currentQuestion,
  btnNextValue,
  chronometer,
});

const mapDispatchToProps = (dispatch) => ({
  start: (execute) => dispatch(startChronometer(execute)),
  update: () => dispatch(updateTime()),
  reset: () => dispatch(resetTimer()),
  stop: () => dispatch(stopChronometer()),
  nextQuestion: () => dispatch(nextQuestions()),
  btnNextReducer: () => dispatch(btnNext()),
  setRevealAnswers: (reveal) => dispatch(revealAnswers(reveal)),
  hiddenButtonReducer: () => dispatch(hiddenButton()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
