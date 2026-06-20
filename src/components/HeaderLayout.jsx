import { Outlet } from "react-router-dom"
import Header from "./Header"

function HeaderLayout() {
    return (
        <div>
            <Header/>

            <main>
                <Outlet/>
            </main>
            
        </div>
    )
}

export default HeaderLayout
