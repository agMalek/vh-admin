import React, { useEffect, useState } from 'react'
import "firebase/auth";
import { useFirebaseApp } from "reactfire"; 
import {db} from '../../../../firebase'
import { toast } from 'react-toastify'
import { Layout } from './layout'
import { usernameValidation } from '../container'

const UserAddForm = (props) => {

    const fb = useFirebaseApp()

    const initialStateValues = {
        username: "",
        role: 1,
        paymentDate: null,
        lastVideoWatched: 1,
        points: 250,
        lastSignIn: "",
    }
    
    const [values, setValues] = useState(initialStateValues)
    const [usernameExists, setUsernameExists] = useState({exists: false, msg: ""});

    

    const handleInputchange = e => {
        //console.log(e.target.value)
        const {name, value} = e.target
        setValues({...values, [name]: value} )
        
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
    
            setUsernameExists({exists: false, msg: ""})
           
            usernameValidation(values.username)
            await checkIfUsernameExists(values.username)
        
            await updateUser(values)

            setValues({...initialStateValues})
            
        }
        
        catch (error) {
            let aux = await fb.auth().currentUser
            aux != null ? console.log(aux.email) : console.log('no hay usaurio en linea')

            if (true || error.code === "username-exists" || error.code === "empty-username") {
                setUsernameExists({ exists: true, msg: error.message });
                console.log('paso por 1')
            } 

        }
        
    }

    const updateUser = async (user) => {
        try {
            await db.collection('users').doc(props.currentID).update({
                username: user.username,
                role: user.role,
                paymentDate: user.paymentDate,
                lastVideoWatched: user.lastVideoWatched,
                points: user.points,
                lastSignIn: user.lastSignIn,
            })
            
            toast('was successfully updated', {type: 'info', autoClose: 4000})
            props.setcurrentID('')
            
        } catch (error) {
            console.log(error)
        }
    }
    

    const checkIfUsernameExists = async (username) => {
       
        try {
            const userCurrent = await db.collection('users').doc(props.currentID).get()
            const usernameCurrent = await userCurrent.data().username
    
            if(usernameCurrent !== username){
                let querySnapshot = await db
                    .collection("users")
                    .where("username", "==", username)
                    .get();
    
    
                if (querySnapshot.docs[0] != undefined ) {
                    throw {
                        code: "username-exists",
                        message: `The username ${username} is already in use`,
                    };
                }
            }
        } catch (error) {
          throw error;
        }
      };


    /* const usernameValidation = (username) => {

        if (username.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)){
          throw {
            code: "empty-username",
            message: "Username cannot contain white spaces or special characters",
            };
        }    
        if (username.trim() === ""){
          throw {
            code: "empty-username",
            message: "You must enter a valid username",
          }
        };
    } */


    const getUserByID =  async (id) => {
        try {
            const user = await db.collection('users').doc(id).get()
            setValues({...user.data() })
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => { 
        getUserByID(props.currentID) 
    }, [props.currentID])


    return(
       <Layout
            submitHandler={submitHandler}
            handleInputchange={handleInputchange}
            values={values}
            usernameExists={usernameExists}
       />
    )

}


export default UserAddForm