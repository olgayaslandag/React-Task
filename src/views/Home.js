import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/auth";
import { Link } from "react-router-dom";

const Home = () => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 col-sm-4">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <strong>ID:</strong> {user.id}
                        </li>
                        <li className="list-group-item">
                            <strong>Ad:</strong> {user.firstName}
                        </li>
                        <li className="list-group-item">
                            <strong>Soyad:</strong> {user.lastName}
                        </li>
                        <li className="list-group-item">
                            <strong>E-Mail:</strong> {user.email}
                        </li>
                    </ul>
                    <button className="btn btn-danger btn-sm" onClick={() => dispatch(logout())}>Çıkış Yap</button>
                    <Link to="/register" className="mt-2 btn btn-link text-center">Kayıt</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;