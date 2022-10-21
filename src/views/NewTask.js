import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { NewTasksApi, UsersApi } from "../Api";
import { insertTask } from "../store/tasks";
import Toast from '../Toast'
import { allUsers } from "../store/users";


const NewTask = () => {
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);
    const users = useSelector(state => state.usersSlice.users)
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(users.length === 0){
            (async () => {
                const result = await UsersApi(token);
                if(result.status){
                    dispatch(allUsers(result.result))
                }
            })()
        }
    }, [dispatch, token, users]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const req ={
            title: title,
            description: desc,
            ownerId: ownerId
        };

        const result = await NewTasksApi(req, token);
        Toast.fire({
            icon: result.status ? 'success' : 'error',
            title: result.message
        });

        if(result.status){
            dispatch(insertTask(result.result));
            navigate("/");
        }
    }



    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 col-sm-3">
                    <Sidebar user={user} />
                </div>

                <div className="col-12 col-sm-9">
                    <div className="row">
                        <div className="col">
                            <h2 className="h5">New Task</h2>
                        </div>
                        <div className="col text-end">
                            <Link className="btn btn-secondary btn-sm mb-3" to="/">Geri</Link>
                        </div>
                    </div>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="desc">Description</label>
                            <input type="text" id="desc" className="form-control" value={desc} onChange={e => setDesc(e.target.value)} required></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="owner">Yazar</label>
                            <select 
                                id="owner" 
                                className="form-select" 
                                required
                                onChange={e => setOwnerId(e.target.value)}
                                value={ownerId}>
                                <option value="">Seçim Yapın</option>
                                {users.map(owner => (
                                    <option key={owner.id} value={owner.id}>{owner.firstName} {owner.lastName}</option>
                                ))}
                            </select>
                        </div>
                        <button className="btn btn-primary" type="submit">Ekle</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewTask;