import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Sidebar = ({user}) => {
    const navigate = useNavigate();

    const cikis = () => {
        Swal.fire({
            icon: 'question',
            text: 'Sistemden çıkış yapılacaktır!',
            title: 'Emin Misin?',
            showCancelButton: true,
            confirmButtonText: 'Evet',
            cancelButtonText: 'Hayır',
        }).then(r => {
            if(r.isConfirmed)
                navigate('/logout')
        });
    }

    return (
        <>
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
            <div className="d-grid">
                <button className="btn btn-danger btn-sm mt-3" onClick={() => cikis()}>Çıkış Yap</button>
            </div>
        </>
    ); 
}

export default Sidebar;