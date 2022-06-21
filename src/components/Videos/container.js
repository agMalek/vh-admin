import React, {useState, useEffect} from 'react'
import '../../assets/css/styles.css'
import {db} from '../../firebase'
import { toast } from 'react-toastify' 
import { Layout } from './layout'

const Videos = () => {
    
    useEffect(() => {
        getVideos()
    }, [])

    const [videos, setVideos] = useState([])
    const [currentID, setcurrentID] = useState("")
    const [showForm, setShowForm ] = useState(false)
    const [pidiendo, setPidiendo ] = useState(true)
    /* const [urlInvalid, setUrlInvalid ] = useState(false) */
    const [disabledEditOrDelete, seteDisabledEditOrDelete ] = useState(false)
    


    const getVideos = () => {
        
        try {
            db.collection('videos').onSnapshot(query => {
                const docs = []
                query.forEach(u => {
                    docs.push({...u.data(), id:u.id})
                });
                
                docs.sort(function(a,b){return a.number-b.number})
                
                /* let aux = [{nro:45, name:"juan"},{nro:22, name:"pedro"},{nro:67, name: 'gonazalo'},{nro:80, name: "alberto"},{nro:12, name: "teletubi"}]
                let array = [45,22,67,80,12] */
                //console.log(aux.findIndex(a => a.nro === 67))
    
                setVideos(docs)
                setPidiendo(false)
            })
        } catch (error) {
            console.log(error)
        }
    }


    
    /* const updateVideo = async (video) => {
        try {
            await db.collection('videos').doc(currentID).update(video)
            toast('was successfully updated', {type: 'info', autoClose: 4000})
            setcurrentID('')
            
        } catch (error) {
            console.log(error)
        }
    } */
    
    /* const addVideo = async (video) => {
        try {
            await db.collection('videos').doc().set(video)
            await updateForAdd(video)
            toast('added successfully' , {type: 'success', autoClose: 4000})
            
        } catch (error) {
            console.log(error)
        }

        
    }
    const updateForAdd = async (video) => {

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

    const showForUpdate = (id) => {
        setcurrentID(id)
        setShowForm(true)
    }

    const hideOrShowForm = () => {
        setShowForm(!showForm)
        setcurrentID("")
    }

    const onDelete = async (id) => {
        console.log(videos[videos.length-1].number)
        seteDisabledEditOrDelete(true)
        if(window.confirm('Estas seguro?')) {
            try {
                await updateOrderDelete(id)
                await db.collection("videos").doc(id).delete() 
                setcurrentID('')
                toast('was successfully removed' , {type: 'error', autoClose: 4000})
            } catch (error) {
                console.log(error)
            }
        }
        seteDisabledEditOrDelete(false)
    }


    const getVideoByID = async (id) => {
        try {
            return await (await db.collection('videos').doc(id).get()).data()
        } catch (error) {
            console.log(error)
        }
        
    }


    const updateOrderDelete = async (id) => {

        try {
            const video = await getVideoByID(id)
            const pos = videos.findIndex(a => a.number === video.number)
    
            for(let i  = pos+1; i<videos.length; i++){     
                videos[i].number--
                await db.collection('videos').doc(videos[i].id).update({number: videos[i].number, url: videos[i].url, description:videos[i].description })     
            }
        } catch (error) {
            console.log(error)
        }

    }
 
    return(
        

        <Layout
            pidiendo={pidiendo}
            showForm={showForm}
/*             addVideo={addVideo}
            updateVideo={updateVideo} */
            getVideoByID={getVideoByID}
            currentID={currentID}
            setcurrentID={setcurrentID}
            videos={videos}
            hideOrShowForm={hideOrShowForm}
            disabledEditOrDelete={disabledEditOrDelete}
            showForUpdate={showForUpdate}
            onDelete={onDelete}
        />


    )
}


export default Videos