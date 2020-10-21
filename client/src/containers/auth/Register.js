import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../store/actions/authActions';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup';

class Register extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    password2: '',
    errors: {},
  };
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmitHandler = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser, this.props.history);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.setState({ errors: this.props.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
       <div  className='forlogin'>
       <div className='login_box'> 
         <div className='login_box_left_signup'>
           {/* <img src='https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' alt='' /> */}
         </div>
         <div className='login_box_right'>
         <div className='login_box_right_padd'>
             <h1 className="text-primary">Join Now !</h1>
             <p className='text-secondary'>Create a Account in Trello Clone</p>
             <p className="lead">
               {/* <i className="fas fa-user" /> Sign Into Your Account */}
             </p>
             <form noValidate onSubmit={this.onSubmitHandler}>
          <TextFieldGroup
            placeholder={'e.g.,Ender Wiggin'}
            type={'text'}
            name={'name'}
            value={this.state.name}
            onChange={this.onChangeHandler}
            error={errors.name}
            label={'Name'}
          />
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
          <TextFieldGroup
            placeholder="Confirm Password"
            name="password2"
            type={'password'}
            value={this.state.password2}
            onChange={this.onChangeHandler}
            error={errors.password2}
            label={'Confirm your password'}
          />
          <button className={'register__Button'}>Create New Account</button>
        </form>
        {errors.message ? <p>{errors.message}</p> : null}
             <p className="my-1">
               Already have an account? <Link to="/">Login</Link>
             </p>
         </div>
         </div>
       </div>
       </div>
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
  { registerUser }
)(Register);
