import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'
function Signup() {
    const [cred, setCred]= useState({email:'',name:'',pass:'', location:'Location'})
    const handleSubmit = (e) => {
        e.preventDefault()
        const response = fetch('http://localhost:5000/api/createuser', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: cred.email,
                name: cred.name,
                pass: cred.pass,
                location: cred.location
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }
    const onchange=(e)=>{
        setCred({...cred,[e.target.name]:e.target.value})
        console.log(cred)
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={cred.email} onChange={onchange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputName1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputName1" name="name" value={cred.name} onChange={onchange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="pass" value={cred.pass} onChange={onchange}/>
                        <div id="emailHelp" className="form-text">Must be atleast 5 characters long</div>
                </div>
                <div className="mb-3">
                    <select className="form-select" aria-label="Default select example" name='location' onChange={onchange}>
                        <option selected>Location</option>
                        <option value="India">India</option>
                        <option value="Outside India">Outside India</option>
                        <option value="Can't Say">Can't Say</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <div className='d-inline m-2'>
                    Already have an account?<Link to="/login" >Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup