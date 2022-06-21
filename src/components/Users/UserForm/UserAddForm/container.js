import React, { useEffect, useState } from 'react'
import "firebase/auth";
import { useFirebaseApp } from "reactfire"; 
import {db} from '../../../../firebase'
import { toast } from 'react-toastify'
import { Layout } from './layout'
import { usernameValidation } from '../container'

const UserAddForm = () => {

    const fb = useFirebaseApp()

    const initialStateValues = {
      email: "",
      password: "",
      confirmedPassword: "",
      username: "",
      role: 1,
      paymentDate: null,
      lastVideoWatched: 1,
      points: 250,
      lastSignIn: "",
    }
    
    const [values, setValues] = useState(initialStateValues)
   
    const [emailExists, setEmailExists] = useState({ exists: false, msg: "" });
    const [usernameExists, setUsernameExists] = useState({exists: false, msg: ""});
    const [invalidPassword, setInvalidPassword] = useState({invalid: false, msg: ""});
    const [invalidConfirmedPassword, setInvalidConfirmedPassword] = useState({ invalid: false, msg: "",});
    

    const handleInputchange = e => {
        //console.log(e.target.value)
        const {name, value} = e.target
        setValues({...values, [name]: value} )
        
    }

    
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setEmailExists({ exists: false, msg: "" })
            setUsernameExists({exists: false, msg: ""})
            setInvalidPassword({invalid: false, msg: ""})
            setInvalidConfirmedPassword({ invalid: false, msg: ""})

            usernameValidation(values.username)
            await checkIfUsernameExists(values.username)
            validatePassword(values.password)
            validatePasswordConfirmation()
            await addUser(values)
            setValues({...initialStateValues})
            await fb.auth().signOut()
        }
        catch (error) {
            let aux = await fb.auth().currentUser
            aux != null ? console.log(aux.email) : console.log('no hay usaurio en linea')

            if (error.code === "username-exists" || error.code === "empty-username") {
                setUsernameExists({ exists: true, msg: error.message });
                console.log('paso por 1')
            } 
            else if (
                error.code === "auth/email-already-in-use" ||
                error.code === "auth/invalid-email"
                ) 
                {   
                    console.log('paso por 2')
                    setEmailExists({ exists: true, msg: error.message });
                } 
            else if (
                error.code === "auth/weak-password" ||
                error.code === "pass/invalid-pass"
                )   
                {
                console.log('paso por 3')
                setInvalidPassword({ invalid: true, msg: error.message });
                } 
            else if (error.code === "pass/no-match") {
                setInvalidConfirmedPassword({ invalid: true, msg: error.message });
            }
        }
        
    }


    const addUser = async (user) => {
        try {
            
            const userCreds = await fb.auth().createUserWithEmailAndPassword(user.email, user.password)
        
            await db.collection('users').doc(userCreds.user.uid).set({
                username: user.username,
                role: user.role,
                paymentDate: user.paymentDate,
                lastVideoWatched: user.lastVideoWatched,
                points: user.points,
                lastSignIn: user.lastSignIn,
            })
            
            toast('added successfully' , {type: 'success', autoClose: 4000})
            
            return { code: null };
            
        } catch (error) {
            throw { code: error.code, message: error.message };
        }
    }

    const checkIfUsernameExists = async (username) => {
        try {
          
          let querySnapshot = await db
            .collection("users")
            .where("username", "==", username)
            .get();
          if (querySnapshot.docs[0] != undefined) {
            throw {
              code: "username-exists",
              message: `The username ${username} is already in use`,
            };
          }
        } catch (error) {
          throw error;
        }
      };


/*     const usernameValidation = (username) => {
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
    }
 */

    const validatePassword = (password) => {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    
        if (!strongRegex.test(password)) {
          throw {
            code: "pass/invalid-pass",
            message:
              "Password must have 8 characters, 1 upper, 1 lower and 1 number",
          };
        }
    };

    const validatePasswordConfirmation = () => {
        if (values.password !== values.confirmedPassword) {
          throw { code: "pass/no-match", message: "Passwords must match" };
        }
    };


    useEffect(() => {
        setValues({...initialStateValues})
    }, [])


    return(
       <Layout
            submitHandler={submitHandler}
            handleInputchange={handleInputchange}
            values={values}
            emailExists={emailExists}
            invalidPassword={invalidPassword}
            usernameExists={usernameExists}
            invalidConfirmedPassword={invalidConfirmedPassword}
       />
    )

}


export default UserAddForm