import { useState } from "react"
import { Link } from "react-router-dom"
import Fruits from "./Fruits"
import App from "../App"
import Auth from "./Auth"

const Home = () => {


    return (
        <>
            <div>
                <button>
                    <Link to={'/fruit'}>Fruit</Link>
                </button>

                <button>
                    <Link to={'/404'}>Not Found</Link>
                </button>
                <Auth />
                <App />
            </div>
        </>
    )
}

export default Home

//useState, useEffect(3 состояния), props(2 вида), разбитие на компоненты, стилизация, callback func через props
//