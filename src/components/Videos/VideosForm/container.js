import React, {useEffect, useState} from 'react'
import {Layout} from './layout'

const VideosForm = (props) => {
    
    const initialStateValues = {
        url: "",
        number: "",
        description: "",
    }
    
    const [values, setValues] = useState(initialStateValues)

    const [invalid, setInvalid] = useState(false)
    const [urlInvalid, setUrlInvalid ] = useState(false)
    const [warning, setWarning ] = useState(false)
    const [warning2, setWarning2 ] = useState(false)
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
            if(props.currentID === ""){
                props.addVideo(values) 
                /* props.update(values) */
            }
            else{
                props.updateVideo(values)
            }

            setValues({...initialStateValues})
        }
        
    }
    
    

    const validation = async () => {
        let invalid = false
        if(values.url !== "" && values.number !== ""){
            setInvalid(false)
        }
        else{
            setInvalid(true)
            invalid = true
        }
        if(values.url.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)){
            setUrlInvalid(true)
            invalid = true
        }     
        else{ 
            setUrlInvalid(false)
        }
        
        
        
        if(props.currentID === ""){

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
                /* console.log(ant.number)
                console.log(values.number) */
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
        }
        
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
        if(props.currentID === ""){
            setValues({...initialStateValues})
        }
        else {
            getCurrentData(props.currentID)
        }
    }, [props.currentID])

    const videoNumber = ()=> {
        let msg = ""
        if(props.videos.length > 0){
            values.number = ( parseInt(props.videos[props.videos.length-1].number)+1)
            msg = 'Video número ' + values.number
        }
        else{
            values.number = 1
            msg = 'Video número ' + values.number
        }
        return msg
    }

    return(
       <Layout
            submitHandler={submitHandler}
            handleInputChange={handleInputChange}
            values={values}
            videoNumber={videoNumber}
            invalid={invalid}
            urlInvalid={urlInvalid}
            warning={warning}
            warning2={warning2}
            disabledSumbit={disabledSumbit}
            currentID={props.currentID}
        />
    )
}


export default VideosForm