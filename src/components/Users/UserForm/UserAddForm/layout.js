import React from 'react' 
import '../../../../assets/css/styles.css'



export function Layout ({
    submitHandler,
    handleInputchange,
    values,
    /* passInputHandler,
    userInputHandler,
    emailInputHandler, */
   /*  invalid,
    usernameInvalid, */
    emailExists,
    invalidPassword,
    usernameExists,
    invalidConfirmedPassword,
    //-------------
    //currentID
})
{

    return (
        <form className="card card-body" onSubmit={submitHandler}>
            
            <label htmlFor="email" className="probando">EMAIL</label>
            <div className="form-group input-group">
                <input type="email" name="email" className="form-control mb-3 bg-dark text-white" placeholder="Email" onChange={handleInputchange} value={values.email}  />   
            </div>
            {
                emailExists.exists ? <p className="text-danger"> {emailExists.msg} </p> : null
            }

            <label htmlFor="username" className="probando">USERNAME</label>
            <div className="form-group input-group">
                <input type="text" name="username" className="form-control mb-3 bg-dark text-white" placeholder="UserName" onChange={handleInputchange} value={values.username} />
            </div>
            {
                usernameExists.exists ? <p className="text-danger"> {usernameExists.msg} </p> : null
            }
            

            <label htmlFor="password" className="probando">PASSWORD</label>
            <div className="form-group input-group">
                <input type="password" name="password" className="form-control mb-3 bg-dark text-white" placeholder="Password" onChange={handleInputchange} value={values.password} />
            </div>


            <label htmlFor="confirmedPassword" className="probando">CONFIRM PASSWORD</label>
            <div className="form-group input-group">
                <input type="password" name="confirmedPassword" className="form-control mb-3 bg-dark text-white" placeholder="Confirm Password" onChange={handleInputchange} value={values.confirmedPassword} />
            </div>

            {
                invalidPassword.invalid ? <p className="text-danger"> {invalidPassword.msg} </p>  : null
            }
            {
                invalidConfirmedPassword.invalid ? <p className="text-danger"> {invalidConfirmedPassword.msg} </p>  : null
            }
            
           
            <button className="btn btn-success mt-2 btn-block" > SAVE </button>
        </form>
    )
}