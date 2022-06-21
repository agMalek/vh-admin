

import React from 'react'
import '../../../../assets/css/styles.css'

export function Layout ({

    submitHandler,
    handleInputChange,
    values,
    videoNumber,
    allRequired,
    invalidURL,
    invalidTitle,
    /* warning,
    warning2, */
    disabledSumbit,
    
})

{
    return(
        
        <form className="card card-body" onSubmit={submitHandler} >

            <h4>{videoNumber()}</h4>


            <label htmlFor="title" className="probando">TITLE VIDEOS</label>
            <div className="form-group input-group">
                <input type="text" name="title" className="form-control mb-3 bg-dark text-white" placeholder="Rookie Workout #" value={values.title} onChange={handleInputChange} />  
            </div>
            {
                invalidTitle ? <p className="text-danger">* Deberias poner el numero del video</p> : null 
            }


            <label htmlFor="url" className="probando">URL VIDEOS</label>
            <div className="form-group input-group">
                {/* <div className="probando"> */}
               {/*  </div> */}
                <input type="text" name="url" className="form-control mb-3 bg-dark text-white" placeholder="https://someurl.com" onChange={handleInputChange} value={values.url}/>
            </div>
            {
                invalidURL ? <p className="text-danger">*Debes escribir una URL válida</p> : null 
            }
           
           

            {/* <label htmlFor="number" className="probando">NUMBER VIDEOS</label>
            <div className="form-group input-group">
                <input type="number" name="number" className="form-control mb-3 bg-dark text-white" placeholder={numeroConsecutivo()} onChange={handleInputChange} value={values.number}/>
            </div>
            */}

            <label htmlFor="description" className="probando">DESCRIPTION VIDEOS</label>
            <div className="form-group input-group">
                <textarea name="description" rows="4" className="form-control mb-3 bg-dark text-white" placeholder="Write a description" value={values.description} onChange={handleInputChange}></textarea>  
            </div>
            
            
            {
                allRequired ? <p className="text-danger">* All fields are required</p> : null 
            }


           {/*  {
                warning ? <p className="text-danger">* No se puede cambiar el número</p> : null 
            }
            {
                warning2 ? <p className="text-danger">* El numero que ingreso no es consecutivo con el ultimo.</p> : null 
            } */}
            <button className="btn btn-success mt-2 btn-block" disabled={disabledSumbit}> UPDATE </button>  
           
        </form>
    )
}