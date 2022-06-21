import React, {useEffect, useState} from 'react'
import {Layout} from './layout'
import { toast } from 'react-toastify' 
import { db } from '../../../../firebase'

const VideosForm = (props) => {
    
    const initialStateValues = {
        title: "Rookie Workout #" ,
        url: "",
        number: "",
        description: "",
    }

    const [values, setValues] = useState(initialStateValues)


    const [invalidTitle, setInvalidTitle ] = useState(false)
    const [invalidURL, setInvalidURL ] = useState(false)
    //const [urlInvalid, setUrlInvalid ] = useState(false)
    const [allRequired, setAllRequired] = useState(false)
    
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
        try {
            const rta = await validation()
            if(!rta){
                
                await addVideo(values) 
                setValues({...initialStateValues})
    
            }
            
        } catch (error) {
            console.log(error)
        }
        
    }
    
    

    const addVideo = async (video) => {
        try {
            await db.collection('videos').doc().set(video)
            //await updateForAdd(video)
            toast('added successfully' , {type: 'success', autoClose: 4000})
            
        } catch (error) {
            console.log(error)
        }        
    }


  /*   const updateForAdd = async (video) => {

        try {
            const pos = videos.findIndex(a => a.number === video.number)
            if(pos>=0){
                for(let i  = pos; i<videos.length; i++){ 
                    videos[i].number++
                    await db.collection('videos').doc(videos[i].id).update({number: videos[i].number, url: videos[i].url, description:videos[i].description })        
               }    
            }
        } catch (error) {
            console.log(error)   
        }
    } */

    const validURL = (url) => {
        var pattern = new RegExp(
          "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
          "i"
        ); // fragment locator
        return !!pattern.test(url);
    };
    



    const validation = async () => {
        let invalid = false
        if(values.url !== ""){
            setAllRequired(false)
        }
        else{
            setAllRequired(true)
            invalid = true
        }
        /* if(values.url.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)){
            setUrlInvalid(true)
            invalid = true
        }     
        else{ 
            setUrlInvalid(false)
        } */

        let index = values.title.indexOf('#')+1
        let number =  parseInt( values.title.slice(index) )
        console.log(number)
        console.log(values.number)
        if (number !== values.number){
            console.log('son distintos')
            setInvalidTitle(true)
            invalid = true
        }else{
            console.log('son iguales')
            setInvalidTitle(false)
        }

        if(!validURL(values.url)){
            setInvalidURL(true)
            invalid = true
        }else{
            setInvalidURL(false)
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
                //setWarning2(true)
                invalid = true
            }
            else{
                //setWarning2(false)
            }
            
            
        }
        else{

            try {
                const ant = await props.getVideoByID(props.currentID)
                //console.log(ant.number)
                //console.log(values.number)
                if(parseInt( ant.number) !== parseInt( values.number) ){  
                    //setWarning(true)
                    invalid = true 
                }
                else{
                    //setWarning(false)
                }
                
            } catch (error) {
                console.log(error)
            }
        } */
        
        return invalid
    }



    useEffect(() => {
        setValues({...initialStateValues})
    }, [])

    
    useEffect(() => {
       
    }, [])



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
            allRequired={allRequired}
            invalidURL={invalidURL}
            invalidTitle={invalidTitle}
           /*  warning={warning}
            warning2={warning2} */
            disabledSumbit={disabledSumbit}
            /* currentID={props.currentID} */
        />
    )
}


export default VideosForm