

import React from 'react'
import '../../../assets/css/styles.css'

export function Layout ({

    submitHandler,
    handleInputChange,
    values,
    videoNumber,
    invalid,
    urlInvalid,
    warning,
    warning2,
    disabledSumbit,
    currentID
})

{
    return(
        
        <form className="card card-body" onSubmit={submitHandler} >

            <h4>{videoNumber()}</h4>


            <br />
            <label htmlFor="url" className="probando">URL VIDEOS</label>
            <div className="form-group input-group">
                {/* <div className="probando"> */}
               {/*  </div> */}
                <input type="text" name="url" className="form-control mb-3 bg-dark text-white" placeholder="https://someurl.com" onChange={handleInputChange} value={values.url}/>
            </div>
           
           

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
                invalid ? <p className="text-danger">* All fields are required</p> : null 
            }
            {
                urlInvalid ? <p className="text-danger">* Url cannot contain white spaces or special characters</p> : null 
            }
            {
                warning ? <p className="text-danger">* No se puede cambiar el número</p> : null 
            }
            {
                warning2 ? <p className="text-danger">* El numero que ingreso no es consecutivo con el ultimo.</p> : null 
            }
            <button className="btn btn-success mt-2 btn-block" disabled={disabledSumbit}> 
            {currentID === "" ?  'SAVE' : 'UPDATE' }
            </button>  
           
        </form>
    )
}