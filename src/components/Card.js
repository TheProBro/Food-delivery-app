import React from 'react'
import { useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'
import "./Card.css"
function Card({item}) {
    const options=Object.keys(item.options[0])
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState(options[0])
    const dispatch=useDispatchCart()
    const cart=useCart()
    const addToCart=()=>{
        dispatch({type:"ADD_TO_CART", id: item.id, name: item.name, price: (item.options[0][size] * qty), qty: qty, size: size})
        console.log("added to cart: ", cart)
    }
    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem" }}>
                <img className="card-img-top" src={item.img} alt="Card cap" style={{ height: '200px',  objectFit: 'cover'  }}/>
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <div className='container w-100'>
                        <select className="m-2 h-100 bg-success rounded" onChange={(e)=>{
                            setQty(e.target.value)
                        }}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className="m-2 h-100 bg-success rounded" onChange={(e)=>{
                            setSize(e.target.value)
                        }}>
                            {
                                options.map((option)=>{
                                    return(
                                        <option value={option}>{option}</option>
                                    )
                                })
                            }
                        </select>
                        <div className='d-inline h-100'>₹{(item.options[0][size] * qty)}/-</div>
                    </div>
                    <hr/>
                    <button className="btn btn-success justify-center ms-2" onClick={()=>{
                        localStorage.getItem("authToken")?addToCart():alert("Please Login to add to cart")
                    }}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card