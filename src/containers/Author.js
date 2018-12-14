import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

class Author extends React.Component {
  render () {
    const { authLogin, component: Component,...rest} =this.props;//获取顶层provider上所有的信息
    return (
      <Route {...rest} render={props=>{
         return authLogin ? <Component {...this.props} /> : <Redirect to="/login" />
       }}/>
    )
  }
} 

const mapStateToProps = (state) => ({
  authLogin: state.authLogin,
})

export default connect(mapStateToProps)(Author);