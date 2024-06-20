import { useState } from "react";
import { useEffect } from "react";
import { KeyRound, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [notif, setNotif] = useState([]);
    const navigate = useNavigate();

    //payload object
    const payload = {
        email: email, 
        password: password,
        password_confirmation: confirmPassword
    }

    const registerToIslak = () => {
        //call api
        const post = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
        //get response
        fetch('http://206.189.91.54/api/v1/auth', post)
        .then(response => {
            //if 200 response
            if(response.status == 200){
                localStorage.clear();

                setNotif("Account succesfully created")
                // change to link to login
                setTimeout(() => {
                    navigate("/login");
                }, 5000);
            } else { //if !=200
                response.json().then(json => {
                    let errorMessage = "";

                    for(const message of json.errors.full_messages){
                        errorMessage = `${errorMessage}${message}.\n`;

                        setNotif(errorMessage);
                    }
                })
            }
        })

    }

    const prepareRegister = (e) => {
        e.preventDefault();

        payload.email = e.target.email.value;
        payload.password = e.target.password.value;
        payload.password_confirmation = e.target.confirmPassword.value;

        registerToIslak()
    }

    useEffect(() => {
        if (localStorage.getItem("currentUser")) {
            navigate("/home");
        }
    }, [navigate]);

    return (
        <div className="screen">
            <div className="islak">
                <img className="islak-logo" src="src/assets/images/logo.png" alt="logo"/>
                <div className="islak-title-container">
                    <h1 className="islak-title">islak</h1>
                    <span className="islak-description">Instantly Share, Link, Assemble, <br/> and Keep the connection</span>
                </div>
            </div>

            <div className="form-box login">
                <h2>Register</h2>
                <form action="#" onSubmit={prepareRegister}>
                    <div className="input-box">
                        <Mail className="icon"/>
                        <input type="email" name="email" autoComplete="off" required/>
                        <label for="email">Email</label>
                    </div>
                    <div className="input-box">
                        <KeyRound className="icon"/>
                        <input type="password" name="password" required/>
                        <label for="password">Password</label>
                    </div>
                    <div className="input-box" id="input-box-confirm">
                        <KeyRound className="icon"/>
                        <input type="password" name="confirmPassword" required/>
                        <label for="confirmPassword">Confirm Password</label>
                    </div>
                    <div className="errorNotif">
                        <span className="account_errorNotif">
                            {notif}
                        </span>
                    </div>
                    <button type="submit" className="btn">Register</button>
                    <div className="login-register">
                        <p>Already have an account? <a href="/login" className="register-link">Login instead</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}