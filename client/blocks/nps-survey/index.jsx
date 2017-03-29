/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import Card from 'components/card';
import RecommendationSelect from './recommendation-select';

class NpsSurvey extends Component {
	static propTypes = {
		onDismissed: PropTypes.func,
		name: PropTypes.string
	}

	constructor( props ) {
		super( props );
		this.state = {
			recommendationValue: null,
			isSubmitting: false,
			isSubmitted: false
		};
		this.handleRecommendationSelectChange = this.handleRecommendationSelectChange.bind( this );
		this.handleFinishClick = this.handleFinishClick.bind( this );
		this.handleDismissClick = this.handleDismissClick.bind( this );
	}

	handleRecommendationSelectChange( newRecommendationValue ) {
		this.setState( {
			recommendationValue: newRecommendationValue
		} );
	}

	handleFinishClick() {
		// TODO: fire Redux action and use Redux state tree to determine when
		// survey has been submitted
		this.setState( {
			isSubmitting: true
		} );

		// simulate requestresponse time
		setTimeout( () => {
			this.setState( {
				isSubmitting: false,
				isSubmitted: true
			} );
		}, 500 );
	}

	handleDismissClick() {
		// TODO: fire Redux action and use Redux state tree to determine
		// if survey has been dismissed

		this.props.onDismissed( {
			wasSubmitted: this.state.isSubmitted,
			surveyName: this.props.name,
			recommendationValue: this.state.recommendationValue
		} );
	}

	render() {
		const className = classNames( 'nps-survey', {
			'is-recommendation-selected': Number.isInteger( this.state.recommendationValue ),
			'is-submitting': this.state.isSubmitting,
			'is-submitted': this.state.isSubmitted
		} );

		const shouldDisableControls = this.state.isSubmitting || this.state.isSubmitted;

		return (
			<Card className={ className }>
				<div className="nps-survey__question-screen">
					<div className="nps-survey__question">
						How likely is it that you would recommend WordPress.com to your friends, family, or colleagues?
					</div>
					<div className="nps-survey__recommendation-select-wrapper">
						<RecommendationSelect
							value={ this.state.recommendationValue }
							disabled={ shouldDisableControls }
							onChange={ this.handleRecommendationSelectChange }
						/>
					</div>
					<div className="nps-survey__buttons">
						<Button primary
							className="nps-survey__finish-button"
							disabled={ shouldDisableControls }
							onClick={ this.handleFinishClick }
						>
							Finish
						</Button>
						<Button borderless
							className="nps-survey__not-answer-button"
							disabled={ shouldDisableControls }
							onClick={ this.handleDismissClick }
						>
							I'd rather not answer
						</Button>
					</div>
				</div>
				<div className="nps-survey__thank-you-screen">
					<div className="nps-survey__thank-you">
						Thanks for providing your feedback!
					</div>
					<div className="nps-survey__buttons">
						<Button primary
							className="nps-survey__dismiss-button"
							onClick={ this.handleDismissClick }
						>
							Close
						</Button>
					</div>
				</div>
		</Card>
		);
	}
}

export default NpsSurvey;
