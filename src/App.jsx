import { useEffect, useState } from 'react'
import { useAuthStore } from './store/useAuthStore.js'


function App() {
    const checkAuth = useAuthStore((state)=>state.checkAuth)
    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <>
            <div>

            </div>
        </>
    )
}



export default App