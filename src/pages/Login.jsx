import { useState } from "react";
import { useEffect } from "react";
import { KeyRound, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    //payload object
    const payload = {
        email: email, 
        password: password
    }

    const loginToIslak = () => {
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
        fetch('http://206.189.91.54/api/v1/auth/sign_in', post)
        .then(response => {
            //if 200 response
            if(response.status == 200){

                response.json().then(json => {

                    const currentUser = {
                        email: email,
                        id: json.data.id,
                        uid: response.headers.get('uid'),
                        expiry: response.headers.get('expiry'),
                        accessToken: response.headers.get('access-token'),
                        client: response.headers.get('client')
                    }
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                })

                navigate("/home");

                window.location.reload();
            } else { //if !=200
                response.json().then(json => {

                setError(json.errors[0])
                })
            }
        })
    }

    const prepareLogin = (e) => {
        e.preventDefault();

        payload.email = e.target.email.value;
        payload.password = e.target.password.value;
        
        loginToIslak();
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
                <h2>Login</h2>
                <form action="#" onSubmit={prepareLogin}>
                    <div className="input-box">
                        <Mail className="icon"/>
                        <input type="email" name="email" autoComplete="off" required/>
                        <label for="email">Email</label>
                    </div>
                    <div className="input-box" id="input-box-password">
                        <KeyRound className="icon"/>
                        <input type="password" name="password" required/>
                        <label for="password">Password</label>
                    </div>
                    <div className="errorNotif">
                        <span className="account_errorNotif">
                            {error}
                        </span>
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox"/> Remember me</label>
                    </div>
                    <button type="submit" className="btn">Login</button>
                    <div className="login-register">
                        <p>Don't have an account yet? <a href="/register" className="register-link">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}