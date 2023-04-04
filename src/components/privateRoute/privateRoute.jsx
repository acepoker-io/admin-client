import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
//import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			localStorage.getItem('adminToken') ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/',
						state: { from: props.location },
					}}
				/>
			)
		}
	/>
);

PrivateRoute.propTypes = {
	component: propTypes.function,
	location: propTypes.string,
};