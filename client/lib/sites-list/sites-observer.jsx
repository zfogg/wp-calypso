/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import omit from 'lodash/omit';

/**
 * Internal dependencies
 */
import Debug from 'debug';
const debug = Debug( 'calypso:site-observe-hoc' );

const sitesObserver = ( WrappedComponent ) => {
	class SitesObserverComponent extends Component {

		constructor( props, context ) {
			super( props, context );

			this.update = this.update.bind( this );

			this.state = {};
		}

		componentWillMount() {
			this.cacheSites();
		}

		componentDidMount() {
			// Using componentDidMount to register to events because
			// this lifecycle method will not be called on SSR.
			this.props.sites.on( 'change', this.update );
		}

		componentWillUnmount() {
			this.props.sites.off( 'change', this.update );
		}

		update() {
			debug( 'Re-rendering ' + this.constructor.displayName + ' due to sites change event.' );
			this.cacheSites();
		}

		cacheSites() {
			if ( this.props.sites ) {
				this.setState( { sites: Object.create( this.props.sites ) } );
			}
		}

		render() {
			return (
				<WrappedComponent
					sites={ this.state.sites }
					{ ...omit( this.props, 'sites' ) }
				/>
			);
		}
	}

	const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
	SitesObserverComponent.displayName = `SitesObserver(${ wrappedComponentName })`;
	SitesObserverComponent.propTypes = {
		sites: PropTypes.object.isRequired
	};

	return SitesObserverComponent;
};

export default sitesObserver;
