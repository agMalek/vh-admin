
export function usernameValidation(username){
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