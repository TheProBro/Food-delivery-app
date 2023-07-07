import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import { useCart } from './ContextReducer';
import { useState } from 'react';
import Cart from '../screens/Cart'
import Modal from '../Modal';
function Navbar() {
    const [cartView, setCartView] = useState(false)
    // localStorage.clear()
    const navigate=useNavigate()
    const cart=useCart()
    const logout_btn = () => {
        localStorage.clear()
        navigate('/')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <Link className="navbar-brand m-2 fs-2" to="/">Tomato</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2">
                        <li className="nav-item active">
                            <Link className="nav-link fs-5 active" to="/">Home <span className="sr-only"></span></Link>
                        </li>
                        {localStorage.getItem('authToken') ? <li className="nav-item active">
                            <Link className="nav-link fs-5 active" to="/">My Orders <span className="sr-only"></span></Link>
                        </li>:null}
                    </ul>

                    {!localStorage.getItem("authToken")?
                    <div className='d-flex'>
                        <Link className="nav-link btn bg-white text-success mx-1" to="/login">Login</Link>
                        <Link className="nav-link btn bg-white text-success mx-1" to="/signup">Signup</Link>
                    </div> 
                    : 
                    <div className='d-flex'>
                        <div className="nav-link btn bg-white text-success mx-1" to='/cart' onClick={()=>{setCartView(true)}}>
                            My Cart {' '}
                            {cart.length>0?<Badge pill>{cart.length}</Badge>:null}
                            
                        </div>
                        {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                        <div className="nav-link btn bg-white text-danger mx-1" onClick={logout_btn}>Signout</div>
                    </div>
                    }
                </div>
            </nav>
        </div>
    )
}

export default Navbar