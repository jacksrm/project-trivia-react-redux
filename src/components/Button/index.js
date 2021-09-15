import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  revealAnswers,
  setAssertions,
  setScore,
} from '../../redux/actions';
import { stopChronometer } from '../../redux/actions/timerActions';
import fixEncodedWords from '../../utils/fixEncodedWords';

const BASE_SCORE = 10;

const difficulty = {
  hard: 3,
  medium: 2,
  easy: 1,
};

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.calcScore = this.calcScore.bind(this);
    this.setClassName = this.setClassName.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { player } = this.props;
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  componentDidUpdate() {
    const { player } = this.props;
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  setClassName(reveal, answer) {
    const { time } = this.props;
    if (reveal || time === 0) return answer.correct ? 'correct-answer' : 'wrong-answer';
    return '';
  }

  calcScore(correct) {
    const { questions, currentQuestion, time, score, assertion } = this.props;
    const actualQuestion = questions[currentQuestion];

    if (correct) {
      const sumScore = BASE_SCORE + (time * difficulty[actualQuestion.difficulty]);
      score(sumScore);
      assertion();
    }
  }

  handleClick() {
    const {
      answer,
      nextBtn,
      setRevealAnswers,
      stop,
    } = this.props;
    this.calcScore(answer.correct);
    nextBtn();
    stop();
    setRevealAnswers(true);
  }

  render() {
    const { answer, reveal, time, key } = this.props;

    return (
      <button
        className={ this.setClassName(reveal, answer) }
        disabled={ time === 0 || reveal }
        data-testid={
          answer.correct ? 'correct-answer' : `wrong-answer${key}`
        }
        type="button"
        onClick={ this.handleClick }
      >
        { fixEncodedWords(answer.value, 'span') }
      </button>
    );
  }
}

Button.propTypes = {
  answer: PropTypes.shape({
    correct: PropTypes.bool,
    value: PropTypes.string,
  }).isRequired,
  assertion: PropTypes.func.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  key: PropTypes.number,
  nextBtn: PropTypes.func.isRequired,
  player: PropTypes.objectOf().isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  reveal: PropTypes.bool.isRequired,
  score: PropTypes.func.isRequired,
  setRevealAnswers: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};

Button.defaultProps = {
  key: 0,
};

const mapDispatchToProps = (dispatch) => ({
  setRevealAnswers: (reveal) => dispatch(revealAnswers(reveal)),
  assertion: () => dispatch(setAssertions()),
  score: (score) => dispatch(setScore(score)),
  stop: () => dispatch(stopChronometer()),
});

const mapStateToProps = ({
  player,
  questions: { data: questions, currentQuestion, reveal },
  timer: { time },
}) => ({
  player,
  time,
  questions,
  currentQuestion,
  reveal,
});
export default connect(mapStateToProps, mapDispatchToProps)(Button);
