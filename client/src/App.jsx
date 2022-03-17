import { Services, Navbar, Loader, Footer, Transections, Welcome } from "./components" 
const App = () =>  {

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transections />
      <Footer />
    </div>
  )
}

export default App
