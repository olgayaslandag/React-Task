import React, {useState} from "react";
import { RegisterApi, LoginApi } from '../Api';
import { useDispatch } from "react-redux";
import { login as loginSlice } from '../store/auth';
import { Link } from "react-router-dom";
import Toast from '../Toast'

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastname] = useState('');
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = {
      email,
      password,
      firstName,
      lastName
    }



    const RegisterRes = await RegisterApi(request);
    if(RegisterRes.status){
      const loginAction = await LoginApi({email, password});

      if(loginAction.status){
          dispatch(loginSlice(loginAction.result));
          window.location.replace("/")
      }else{
        Toast.fire({
          icon: loginAction.status ? 'success' : 'error',
          title: loginAction.message
        });
      }
    }else{
      if(RegisterRes.result){
        setErrors(RegisterRes.result)
      }
      Toast.fire({
        icon: 'error',
        title: RegisterRes.message
      });
    }
  }

  const errorHandle = (param) => {
    const getError = errors.find(c => c.param === param);
    return getError ? getError.msg : null;
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
                    className={errorHandle('firstName') ? 'is-invalid form-control' : 'form-control'}
                    id="firstName"
                    required
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}></input>
                    {errorHandle('firstName') && 
                      <small className="text-danger">{errorHandle('firstName')}</small>
                    }
              </div>
              
              <div className="mb-3">
                <label htmlFor="lastName">Soyad</label>
                <input 
                    type="text" 
                    className={errorHandle('lastName') ? 'is-invalid form-control' : 'form-control'}
                    id="lastName"
                    required
                    value={lastName}
                    onChange={e => setLastname(e.target.value)}></input>
                    {errorHandle('lastName') && 
                      <small className="text-danger">{errorHandle('lastName')}</small>
                    }
              </div>

              <div className="mb-3">
                <label htmlFor="email">E-Posta</label>
                <input 
                  type="email" 
                  id="email"
                  required
                  className={errorHandle('email') ? 'is-invalid form-control' : 'form-control'}
                  value={email}
                  onChange={e => setEmail(e.target.value)}></input>
                  {errorHandle('email') && 
                      <small className="text-danger">{errorHandle('email')}</small>
                    }
              </div>

              <div className="mb-3">
                <label htmlFor="password">Şifre</label>
                <input 
                  type="password" 
                  id="password" 
                  required
                  className={errorHandle('password') ? 'is-invalid form-control' : 'form-control'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}></input>
                  {errorHandle('password') && 
                      <small className="text-danger">{errorHandle('password')}</small>
                    }
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-primary btn-block">Kayıt</button>
                <Link to="/" className="mt-2 btn btn-white text-center">Giriş Yap</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
