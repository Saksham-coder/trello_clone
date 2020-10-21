import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/authActions';
import './Login.css'
class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmitHandler = e => {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(newUser);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/boards');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/boards');
    }

    if (nextProps.errors) {
      this.setState({ errors: this.props.errors });
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <Fragment>
      <div  className='forlogin'>
        <div className='login_box'> 
          <div className='login_box_left'>
          </div>
          <div className='login_box_right'>
          <div className='login_box_right_padd'>
              <h1 className="text-primary">Welcome</h1>
              <p className='text-secondary'>Trello Account</p>
              <p className="lead">
                {/* <i className="fas fa-user" /> Sign Into Your Account */}
              </p>
              <form noValidate onSubmit={this.onSubmitHandler}>
          <TextFieldGroup
            placeholder={'e.g.,ender@battle.edu'}
            name={'email'}
            type={'email'}
            value={this.state.email}
            onChange={this.onChangeHandler}
            error={errors.email}
            label={'Email'}
          />
          <TextFieldGroup
            placeholder="e.g., ••••••••••••"
            name="password"
            type={'password'}
            value={this.state.password}
            onChange={this.onChangeHandler}
            error={errors.password}
            label={'Password'}
          />

          <button className={'register__Button button--green'}>Log In</button>
        </form>
        {errors.message ? <p>{errors.message}</p> : null}
              <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
          </div>
          </div>
        </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors,
  };
};
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
