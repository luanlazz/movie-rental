import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router'
import { AUTH_PAGE } from 'routes'

const PrivateRoute = ({ authUser, component: RouteComponent, ...props }) => {
  return (
    <Route
      {...props}
      render={routeProps =>
        authUser.validateToken
          ? <RouteComponent {...routeProps} />
          : <Redirect to={AUTH_PAGE} />}
    />
  )
}

PrivateRoute.propTypes = {
  authUser: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  authUser: state.authUser
})

export default connect(mapStateToProps, null)(PrivateRoute)
