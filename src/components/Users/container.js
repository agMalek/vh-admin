import React, {useState, useEffect} from 'react'
import '../../assets/css/styles.css'

import {db} from '../../firebase'
/* import { toast } from 'react-toastify'  */

import {Layout} from './layout'



const Users = () => {
    
    
    
    const [users, setUsers] = useState([])
    const [currentID, setcurrentID] = useState("")
    const [showForm, setShowForm ] = useState(false)
    const [pidiendo, setPidiendo ] = useState(true)


    useEffect(() => {
        getUsers()
    }, [])
    

    const getUsers =  () => {

        try {
            db.collection('users').onSnapshot(query => {
                const docs = []
                query.forEach(u => {
                    docs.push({...u.data(), id:u.id})
                });
                docs.sort(function(a,b){return(b.points-a.points)})
                setUsers(docs)
                
                //listAllUsers()

                setPidiendo(false)

            })
            
        } catch (error) {
            console.log(error)
        }
        
    }
    
    const showForUpdate = (id) => {
        setcurrentID(id)
        setShowForm(true)
    }

    const hideOrShowForm = () => {
        setShowForm(!showForm)
        setcurrentID("")
    }
    
    /* const onDelete = async (id) => {
        
        if(window.confirm('Estas seguro?')) {
            try {
                await db.collection("users").doc(id).delete()
                setcurrentID('')
                toast('was successfully removed' , {type: 'error', autoClose: 4000})
                
            } catch (error) {
                console.log(error)
            }

        }
    } */


    return(
        <Layout 
            pidiendo={pidiendo}
            showForm={showForm}
            currentID={currentID}
            setcurrentID={setcurrentID}
            users={users}
            hideOrShowForm={hideOrShowForm}
            showForUpdate={showForUpdate}
          /*   onDelete={onDelete} */
        />

    )
}



export default Users


