import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Login() {
    const [cred, setCred] = useState({ email: '', pass: '' })
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const response = fetch('http://localhost:5000/api/loginuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: cred.email,
                pass: cred.pass,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'User Logged In') {
                    localStorage.setItem('authToken', data.authToken)
                    localStorage.setItem('email', data.email)
                    localStorage.setItem('location', data.location)
                    navigate('/')
                }
                else {
                    alert('Wrong Credentials')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }
    const onchange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
        console.log(cred)
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={cred.email} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="pass" value={cred.pass} onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <div className='d-inline m-2'>
                    New to Tomato?<Link to="/signup" >Signup</Link>
                </div>
            </form>
        </div>
    )
}

export default Login