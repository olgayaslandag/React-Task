import React, {useState} from "react";
import {RegisterApi} from '../Api';
import { useDispatch } from "react-redux";
import { login as loginSlice } from '../store/auth';
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastname] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = {
      email,
      password,
      firstName,
      lastName
    }
    const result = await RegisterApi("/api/auth/register", request);
        

    if(result.token){
        dispatch(loginSlice(result));
        window.location.reload()
    }
  }

  return (
    <>
      <div className="container h-100">
        <div className="row">
          <div className="col-12 col-sm-4 offset-sm-4 align-middle">
            <form onSubmit={e => handleSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="firstName">Ad</label>
                <input 
                    type="text" 
                    className="form-control"
                    id="firstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}></input>
              </div>
              
              <div className="mb-3">
                <label htmlFor="lastName">Soyad</label>
                <input 
                    type="text" 
                    className="form-control"
                    id="lastName"
                    value={lastName}
                    onChange={e => setLastname(e.target.value)}></input>
              </div>

              <div className="mb-3">
                <label htmlFor="email">E-Posta</label>
                <input 
                  type="email" 
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={e => setEmail(e.target.value)}></input>
              </div>

              <div className="mb-3">
                <label htmlFor="password">Şifre</label>
                <input 
                  type="password" 
                  id="password" 
                  className="form-control"
                  value={password}
                  onChange={e => setPassword(e.target.value)}></input>
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-primary btn-block">Kayıt</button>
                <Link to="/" className="mt-2 btn btn-link text-center">Giriş Yap</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
