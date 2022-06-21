import React from 'react'


import '../../assets/css/styles.css' 

import UserAddForm from './UserForm/UserAddForm/container'
import UserUpdateForm from './UserForm/UserUpdateForm/container'


export function Layout ({
    pidiendo,
    showForm,
    currentID,
    setcurrentID,
    users,
    hideOrShowForm,
    showForUpdate,
   /*  onDelete */
})
{
    return (
        <div>

            {
                !pidiendo ?

                    <div>

                        {showForm ?
                            <div className="p-3">
                                
                                {
                                    currentID === "" ? <UserAddForm/> : <UserUpdateForm {...{ currentID, setcurrentID }}/>
                                }
                              
                            </div>
                            : null
                        }

                        <button className="btn btn-outline-info showFormButton" onClick={() => hideOrShowForm()}>
                            {showForm ? 'Discard changes' : 'ADD USER'}
                        </button>

                        <br />
                        <br />

                        {
                            //users.length !== 0 ?
                            users[0] !== undefined ?
                                <div className="table-responsive" >
                                    <table className="table">
                                        <tbody>
                                            <tr className="bg-dark text-white">
                                                <th>Username</th>
                                                <th>Points</th>
                                                <th>Last Video Watched</th>
                                                {/* <th>Last Sign in</th> */}
                                                <th></th>

                                            </tr>
                                        </tbody>

                                        <tbody>
                                            {users.map((u) => (
                                                <tr key={u.id}>

                                                    <td className="frutilla">{u.username}</td>
                                                    <td>{u.points}</td>
                                                    <td>{u.lastVideoWatched}</td>
                                                    {/* <td>{u.lastSignIn}</td> */}
                                                    <td >
                                                        <button className="btn btn-outline-warning m-2 " onClick={() => { showForUpdate(u.id) }}>Edit</button>
                                                        {/* <button className="btn btn-danger m-2 " onClick={() => { onDelete(u.id) }}>Delete</button> */}
                                                    </td>


                                                </tr>

                                            ))}
                                        </tbody>
                                    </table>
                                </div> : <h3>No hay usuarios</h3>
                        }

                    </div> : <h3>Loading...</h3>

                //<div>
                //    <img src={image} className="mainLogo"/>
                //</div>

            }

        </div>
    )
}


