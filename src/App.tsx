import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Products from './pages/products'
import AddPro from './pages/addPro'
import EditPro from './pages/editPro'
import { IProducts } from './interface/products'
import { instance } from './utils/product'


function App() {
  const [products, setProducts] = useState<IProducts[]>([])


  useEffect(() => {
    (async () => {
      const { data } = await instance.get('/product')
      setProducts(data)
    })()
  }, [])
  // const [theme, setTheme] = useState(() => {
  //   const savedTheme = localStorage.getItem('theme');
  //   return savedTheme ? JSON.parse(savedTheme) : false;
  // });

  // useEffect(() => {
  //   if (theme) {
  //     document.body.classList.add('dark')
  //   }
  //   else {
  //     document.body.classList.remove('dark')
  //   }
  //   localStorage.setItem('theme', JSON.stringify(theme))
  // }, [theme])
  // const handleClick = () => {
  //   setTheme(!theme)
  // }
  return (
    <>
      {/* <div >haha</div>
      <button onClick={handleClick}>Click</button> */}

      <Router>
        <Routes>
          <Route path='/' element={<Products products={products} setProducts={setProducts} />}></Route>
          <Route path='/addpro' Component={AddPro}></Route>
          <Route path='/editpro/:id' Component={EditPro}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
