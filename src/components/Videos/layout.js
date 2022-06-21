

import React from 'react'
import VideosForm from './VideosForm/container'

import VideosAddForm from './VideosForm/VideoAddForm/container'
import VideosUpdateForm from './VideosForm/VideoUpdateForm/container'


export function Layout ({
    pidiendo,
    showForm,
   /*  addVideo,
    updateVideo, */
    getVideoByID,
    currentID,
    setcurrentID,
    videos,
    hideOrShowForm,
    disabledEditOrDelete,
    showForUpdate,
    onDelete

})
{
    return(
        <div>
            
            {
                !pidiendo ? 
                <div>
                
                {
                    showForm ? 
                    <div className="p-3">

                        {
                            currentID === "" ? <VideosAddForm {...{getVideoByID, videos}}/> : <VideosUpdateForm {...{ getVideoByID, currentID, setcurrentID, videos}}/>
                        }
                        {/* <VideosForm {...{addVideo, updateVideo, getVideoByID, currentID, videos}}/> */}
                    </div> : null
                }

                <button className="btn btn-info showFormButton"  onClick={ () => hideOrShowForm() }>
                    {showForm ? 'Discard changes' : 'ADD VIDEO'}
                </button> 

                <br />
                <br />

                {
                    videos.length !== 0 ?
                    <div className="table-responsive" > 
                    <table className="table">
                        <tbody>
                            <tr className="bg-dark text-white">
                                <th>TITLE</th>
                                <th>URL</th>
                                <th>Number</th>
                                <th>Description</th>
                                <th></th>
                            </tr> 
                        </tbody>
                    
                        <tbody>
                            {videos.map((u)=> (
                                <tr  key={u.id}>
                                    <td>{u.title}</td>   
                                    <td> <a href={u.url}>url</a></td>   
                                    <td>{u.number}</td>   
                                    <td>{u.description}</td>
                                    <td>
                                        <button className="btn btn-warning m-2" disabled={disabledEditOrDelete} onClick={ ()=> {showForUpdate(u.id)} }>Edit</button>
                                        <button className="btn btn-danger m-2" disabled={disabledEditOrDelete} onClick={ ()=> {onDelete(u.id)}}>Delete</button>
                                    </td>
                                
                                </tr>       

                            ))}
                        </tbody>    
                    </table>
                </div> : <h3>No hay videos</h3>
                }
            </div>    : <h3>Loading...</h3>
            }
            
        </div>

    )
}