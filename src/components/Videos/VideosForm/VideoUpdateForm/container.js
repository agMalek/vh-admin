import React, {useEffect, useState} from 'react'
import {Layout} from './layout'
import { toast } from 'react-toastify' 
import { db } from '../../../../firebase'


const VideosForm = (props) => {
    
    const initialStateValues = {
        title: "",
        url: "",
        number: "",
        description: "",
    }
    
    const [values, setValues] = useState(initialStateValues)

    const [allRequired, setAllRequired] = useState(false)
    const [urlInvalid, setUrlInvalid ] = useState(false)
    /* const [warning, setWarning ] = useState(false)
    const [warning2, setWarning2 ] = useState(false) */
    const [disabledSumbit, setDisabledSumbit ] = useState(true)
    
    const handleInputChange = e => {
        //console.log(e.target.value)
        setDisabledSumbit(false)
        const {name, value} = e.target
        setValues({...values, [name]: value} )
        
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const rta = await validation()
        if(!rta){
            
            await updateVideo(values)
            setValues({...initialStateValues})
        }
        
    }
    
    const updateVideo = async (video) => {
        try {
            await db.collection('videos').doc(props.currentID).update(video)
            toast('was successfully updated', {type: 'info', autoClose: 4000})
            props.setcurrentID('')
            
        } catch (error) {
            console.log(error)
        }
    }

    const validation = async () => {
        let invalid = false
        if(values.url !== ""){
            setAllRequired(false)
        }
        else{
            setAllRequired(true)
            invalid = true
        }
        if(values.url.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)){
            setUrlInvalid(true)
            invalid = true
        }     
        else{ 
            setUrlInvalid(false)
        }
        
        
        
        /* if(props.currentID === ""){

            let aux = ""
            if(props.videos.length > 0){
                aux = parseInt(props.videos[props.videos.length-1].number)+1
            }
            else{
                aux = 1
            } 
            if(values.number > aux){
                setWarning2(true)
                invalid = true
            }
            else{
                setWarning2(false)
            }
            
            
        }
        else{

            try {
                const ant = await props.getVideoByID(props.currentID)
                //console.log(ant.number)
                //console.log(values.number)
                if(parseInt( ant.number) !== parseInt( values.number) ){  
                    setWarning(true)
                    invalid = true 
                }
                else{
                    setWarning(false)
                }
                
            } catch (error) {
                console.log(error)
            }
        } */
        
        return invalid
    }

    
    

    const getCurrentData =  async (id) => {
        try {
            const video = await props.getVideoByID(id)
            console.log({...video})
            setValues({...video}) 
            
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getCurrentData(props.currentID)
    }, [props.currentID])



    const videoNumber = ()=> {
        return 'Video número ' + values.number 
    }

    return(
       <Layout
            submitHandler={submitHandler}
            handleInputChange={handleInputChange}
            values={values}
            videoNumber={videoNumber}
            allRequired={allRequired}
            urlInvalid={urlInvalid}
           /*  warning={warning}
            warning2={warning2} */
            disabledSumbit={disabledSumbit}
           /*  currentID={props.currentID} */
        />
    )
}


export default VideosForm