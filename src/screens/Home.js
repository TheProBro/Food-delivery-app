import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import '../components/Carousel.css'
function Home() {
    const [search, setSearch] = useState('')
    const [categories, setCategories] = useState([])
    const [items, setItems] = useState([])

    const loadData= async()=>{
        const response=await fetch('http://localhost:5000/api/displaydata',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
        const data=await response.json()
        setItems(data[0])
        setCategories(data[1])
        console.log(data)
    }
    useEffect(() => {
        loadData()
    },[])
    return (
        <div>
            <div><Navbar /></div>
            <div id="carouselExampleSlidesOnly" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-caption ">
                        <div className="d-flex justify-content-center">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>{
                                setSearch(e.target.value)
                            }}/>
                            {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/700x200/?Pizza" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/700x200/?Burger" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/700x200/?Cake" className="d-block w-100" alt="..."/>
                    </div>
                </div>
            </div>
            <div className='container'> 
            {
                categories !== [] ? categories.map((item, index) => {
                    return(
                        <div className='row mb-3'>
                            <div key={index} className='fs-3 m-3'>{item.CategoryName}</div>
                            <hr/>
                            {
                                items !== [] ? items.filter((data) => {
                                    return (data.CategoryName === item.CategoryName) && (data.name.toLowerCase().includes(search.toLowerCase()))
                                }).map((fitems,indx)=>{
                                    return(
                                        <div className='col-12 col-md-6 col-lg-3'>
                                            <Card key={indx} item={fitems}/>
                                        </div>
                                    )
                                }):null
                            }
                        </div>
                    )
                }) : null
            }
            </div>
            <div><Footer /></div>
        </div>
    )
}

export default Home