import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'
import {BsTrash} from 'react-icons/bs'
function Cart() {
    const cart=useCart()
    const dispatch=useDispatchCart()
    const total=cart.reduce((acc,item)=>{
        return acc+item.price
    },0)
    console.log(total)
    const sendOrder=(e)=>{
        // e.preventDefault()
        console.log("cart")
        fetch('http://localhost:5000/api/orderdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('email'),
                location: localStorage.getItem('location'),
                data: cart
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }
  return (
    <div>
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
            <table className='table table-hover'>
                <thead className='text-success fs-4'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Size</th>
                        <th scope='col'>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((item,index)=>{
                            return(
                                <tr key={index}>
                                    <th scope='row'>{index+1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.size}</td>
                                    <td>₹{item.price}</td>
                                    <td onClick={()=>{dispatch({type: "DELETE_FROM_CART", index:index})}} style={{cursor: 'pointer'}}><BsTrash/></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan='4' className='text-end fs-4'>Total</td>
                        <td className='fs-4'>₹{total}</td>
                    </tr>   
                </tfoot>
            </table>
            <div>
                <div className='btn btn-success' onClick={()=>{
                    console.log(cart)
                    if(cart.length>0){
                        sendOrder()
                    }
                    else{
                        alert("Cart is Empty")
                    }
                }}>Place Order</div>
            </div>
        </div>
    </div>
  )
}

export default Cart