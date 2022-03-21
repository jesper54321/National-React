import React, {useState, useEffect} from "react";
import './Login.scss';
import { useHistory,Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db } from "../../Logic/firebase";
import { auth, username } from "../../Wrappers/AuthProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import FirebaseMain from "../../Logic/firebase";
import { SetUser } from "../../Wrappers/AuthProvider";



export default function Login ()
{
    var emailLogin;
    var usernameLogin;

   const initialValues = {email:"", password:"", username:""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, loading, error] = useAuthState(auth);

   

    const navigate = useNavigate();

    const handleChange = (e) => {
   console.log (e.target);
   const { name, value } = e.target;
    setFormValues({...formValues, [name]: value});

    console.log(formValues);
    };

    var usersData = FirebaseMain();


  const handleSubmit = (e) => 
  {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    
    for (var i = 0; i < usersData.Users.length; i++) {
        if(usersData.Users[i].email === formValues.email)
        	{
                emailLogin = formValues.email;
                usernameLogin = usersData.Users[i].username;

                //SetUser(usersData.Users[i].username, usersData.Users[i].email) ;
            }
        if(usersData.Users[i].username === formValues.email)
            {

                //SetUser(usersData.Users[i].username, usersData.Users[i].email);
                formValues.email=usersData.Users[i].email;

                emailLogin = usersData.Users[i].email;
                usernameLogin = usersData.Users[i].username;

            }
    }

    signInWithEmailAndPassword(auth, formValues.email, formValues.password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
   
    console.log("login successfuly");

    SetUser(usernameLogin, emailLogin );

    navigate("/");
    })
    .catch((error) => {
        document.getElementById("wrong").innerHTML=  "Wrong data!";
    const errorCode = error.code;
    const errorMessage = error.message;
    });
    
};


const validate = (values)=>{
    const errors = {};
   //const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

    if(!values.email){
        errors.email = "Email or username ares required!";
    }
    if(!values.password){
        errors.password = "Password is required!";
    }else if (values.password.length < 6)
    {
        errors.password = "Password must be more than 6 caracters";
    }



    return errors;
};
    return(

        <div>
        
            <form  onSubmit={handleSubmit}> 
            <h2 >LOG IN </h2>
            
            <div>
                <p>{ formErrors.email}</p>
                <input type="text" placeholder="enter your email or your username, please"  name ="email" value={formValues.email} onChange={handleChange}/>
            </div>
            
            <div>
            <p>{ formErrors.password}</p>
                <input type="password" placeholder="Enter your password" name ="password"  value={formValues.password} onChange={handleChange} />
            </div>
            
            <div>
                    <button>Submit</button>
            </div>

            
            <div>
                <h4>Don't have account yet ?</h4>
                <Link to ="../Register"><button>Register</button></Link>
            </div>

            </form>
            <div id="wrong"></div>
             
        </div>
    
    );
}