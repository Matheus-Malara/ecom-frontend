import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import SearchPage from "./pages/SearchPage"
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
    return (
        <Router>
            <Header/>
            <main className="min-h-screen">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/search" element={<SearchPage/>}/>
                </Routes>
            </main>
            <Footer/>
        </Router>
    )
}

export default App
