import React from 'react' 

export function Layout ({
    submitHandler,
    handleInputchange,
    values,
    usernameExists
})
{

    return (
        <form className="card card-body" onSubmit={submitHandler}>
            {/* <div className="form-group input-group">
                <input type="email" name="email" className="form-control mb-3 bg-dark text-white" placeholder="Email" onChange={handleInputchange} value={values.email}  />   
            </div>
            {
                emailExists.exists ? <p className="text-danger"> {emailExists.msg} </p> : null
            } */}

            <label htmlFor="username" className="probando">USERNAME</label>
            <div className="form-group input-group">
                <input type="text" name="username" className="form-control mb-3 bg-dark text-white" placeholder="UserName" onChange={handleInputchange} value={values.username} />
            </div>
            {
                usernameExists.exists ? <p className="text-danger"> {usernameExists.msg} </p> : null
            }
            

            <label htmlFor="points" className="probando">POINTS</label>
            <div className="form-group input-group">
                <input type="number" name="points" className="form-control mb-3 bg-dark text-white" placeholder="Points" onChange={handleInputchange} value={values.points} />
            </div>


            <label htmlFor="lastVideoWatched" className="probando">LAST VIDEO WATCHED</label>
            <div className="form-group input-group">
                <input type="number" name="lastVideoWatched" className="form-control mb-3 bg-dark text-white" placeholder="Last Video Watched" onChange={handleInputchange} value={values.lastVideoWatched} />
            </div>
            
            <label htmlFor="lastSignIn" className="probando">LAST SING IN</label>
            <div className="form-group input-group">
                <input type="text" name="lastSignIn" className="form-control mb-3 bg-dark text-white" placeholder="Last Sign In" onChange={handleInputchange} value={values.lastSignIn} />
            </div>

            <label htmlFor="role" className="probando">ROLE</label>
            <div className="form-group input-group">
                <input type="number" name="role" className="form-control mb-3 bg-dark text-white" placeholder="Role" onChange={handleInputchange} value={values.role} />
            </div>
           
            <label htmlFor="paymentDate" className="probando">PAYMENT DATE</label>
            <div className="form-group input-group">
                <input type="text" name="paymentDate" className="form-control mb-3 bg-dark text-white" placeholder="PaymentDate" onChange={handleInputchange} value={values.paymentDate !== null ? values.paymentDate : ""} />
            </div>

            <button className="btn btn-success mt-2 btn-block" > UPDATE </button>
        </form>
    )
}