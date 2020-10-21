import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import TextFieldGroup from '../../common/TextFieldGroup';
import { updateUser } from '../../store/actions/authActions';

const Update = (props) => {

    const {
        updateUser,
        auth,
        errors
    } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(errors || {})

    // useEffect(()=> {
    //     setError(errors)
    // }, [errors])


    console.log("Checking every props",auth, errors )

    const onChangeHandler = e => {
        if (e.target.name === 'email'){
            setEmail(e.target.value )
        }
        if (e.target.name === 'password'){
            setPassword(e.target.value )
        }
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        const id = auth.user.userId
        const newUser = {
          email,
          password,
          id
        };
        updateUser(newUser);
      };

    return ( 
        <div  className='forlogin'>
            <form noValidate onSubmit={onSubmitHandler} style={{width: '50%', margin: '0px auto', marginTop: '16%'}}>
          <TextFieldGroup
            placeholder={'e.g.,name@org.com'}
            name={'email'}
            type={'email'}
            value={email}
            onChange={onChangeHandler}
            label={'New Email'}
          />
          <TextFieldGroup
            placeholder="e.g., ••••••••••••"
            name="password"
            type={'password'}
            value={password}
            onChange={onChangeHandler}
            label={'New Password'}
          />
          {errors.message ? <p style={{ color: 'red', textAlign: 'center' }}>{errors.message}</p> : null}
          <button className={'register__Button button--green'}>Update</button>
        </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
      auth: state.auth,
      errors: state.errors,
    };
  };

export default connect(mapStateToProps, {updateUser})(Update);