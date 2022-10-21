import React, {useState} from "react";
import { LoginApi } from '../Api';
import { useDispatch } from "react-redux";
import { login as loginSlice } from '../store/auth';
import { Link } from "react-router-dom";
import Toast from '../Toast'

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = {
      email,
      password: pass
    }
    const result = await LoginApi(request);

    Toast.fire({
      icon: result.status ? 'success' : 'error',
      title: result.message
    });
    if(result.status){
        dispatch(loginSlice(result.result));
        window.location.reload()
    }else{
      if(result.result){
        setErrors(result.result)
      }
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
                <label htmlFor="email">E-Posta</label>
                <input 
                  id="email"
                  type="email" 
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
                  value={pass}
                  onChange={e => setPass(e.target.value)}></input>
                  {errorHandle('password') && 
                      <small className="text-danger">{errorHandle('password')}</small>
                    }
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-primary btn-block">Giriş Yap</button>
                <Link to="/register" className="mt-2 btn btn-white text-center">Kayıt</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
