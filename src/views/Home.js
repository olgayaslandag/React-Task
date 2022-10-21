import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { TasksApi, DelTasksApi } from "../Api";
import Sidebar from './Sidebar';
import { Link } from "react-router-dom";
import { allTasks, delTask } from "../store/tasks";
import Toast from '../Toast'

const Home = () => {
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);
    const tasks = useSelector(state => state.tasksSlice.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            if(tasks.length === 0){
                const tasksRes = await TasksApi(token);
                if(tasksRes.status){
                    dispatch(allTasks(tasksRes.result))
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oopps!',
                        text: tasksRes.message,
                    });
                }
            }
        })();
    }, [token, dispatch, tasks]);


    const delTaskAction = (id) => {
        Swal.fire({
            icon: 'question',
            title: 'Emin Misin?',
            text: 'Veri sistemden kalıcı olarak silinecek!',
            showCancelButton: true
        }).then( async r => {
            if(r.isConfirmed){
                const result = await DelTasksApi(id, token);

                Toast.fire({
                    icon: result.status ? 'success' : 'error',
                    title: result.message
                });
                if(result.status)
                    dispatch(delTask(id));
            }
        });
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
                            <h2 className="h5">Tasks</h2>
                        </div>
                        <div className="col text-end">
                            <Link to="/newtask" className="btn btn-primary btn-sm mb-3">
                                Yeni Ekle
                            </Link>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th width="30">#</th>
                                    <th>Başlık</th>
                                    <th>Açıklama</th>
                                    <th>Tarih</th>
                                    <th width="130"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map(task => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{new Date(task.createdAt).toLocaleString("en-US")}</td>
                                    <td>
                                        <Link className="btn btn-sm btn-secondary me-1" to={"/editTask/" + task.id}>Düzenle</Link>
                                        <button className="btn btn-sm btn-danger" onClick={() => delTaskAction(task.id)}>Sil</button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;