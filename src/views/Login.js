import React, {useState} from "react";
import {LoginApi} from '../Api';
import { useDispatch } from "react-redux";
import { login as loginSlice } from '../store/auth';
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = {
      email,
      password: pass
    }
    const result = await LoginApi("/api/auth/login", request);
        

    if(result.status){
        dispatch(loginSlice(result.result));
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
                <label htmlFor="email">E-Posta</label>
                <input 
                  id="email"
                  type="email" 
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
                  value={pass}
                  onChange={e => setPass(e.target.value)}></input>
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-primary btn-block">Giriş Yap</button>
                <Link to="/register" className="mt-2 btn btn-link text-center">Kayıt</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
