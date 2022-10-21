import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { EditTasksApi, UsersApi, getTaskApi } from "../Api";
import { editTask } from "../store/tasks";
import Toast from '../Toast'
import Swal from "sweetalert2";
import { allUsers } from "../store/users";


const EditTask = () => {
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);
    const users = useSelector(state => state.usersSlice.users);
    const tasks = useSelector(state => state.tasksSlice.tasks);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [task, setTask] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        (async () => {
            if(users.length === 0){
                const usersRes = await UsersApi(token);
                if(usersRes.status){
                    dispatch(allUsers(usersRes.result))
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oopps!',
                        text: usersRes.message,
                    });
                }
            }

            const taskRes = await getTaskApi(id, token);
            if(taskRes.status){
                setTask(taskRes.result);
                setTitle(taskRes.result.title);
                setDesc(taskRes.result.description)
                setOwnerId(taskRes.result.ownerId)
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oopps!',
                    text: taskRes.message,
                });
            }
        })()

    }, [dispatch, token, users, id, tasks]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const req ={
            title: title,
            description: desc,
            ownerId: ownerId
        };

        const result = await EditTasksApi(task.id, req, token);
        Toast.fire({
            icon: result.status ? 'success' : 'error',
            title: result.message
        });
        console.log(result.result)
        if(result.status){
            dispatch(editTask({
                title: title,
                description: desc,
                ownerId: ownerId,
                id: task.id,
                createdAt: task.createdAt
            }));
            navigate("/");
        }
    }


    if(task){
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
                                    value={task.ownerId}>
                                    <option value="">Seçim Yapın</option>
                                    {users.map(owner => (
                                        <option key={owner.id} value={owner.id}>{owner.firstName} {owner.lastName}</option>
                                    ))}
                                </select>
                            </div>
                            <button className="btn btn-primary" type="submit">Güncelle</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default EditTask;