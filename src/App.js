import { Routes, Route, Outlet } from 'react-router-dom'

import Navigation from './routes/navigation/navigation.component';

import Home from './routes/home/home.component';
import SignIn from './sign-in/sign-in.component';

import './categories.styles.scss'

// import './components/category-item/category-item.component'


const Shop = () => {
  return (
    <h1>I am the shop page! :)</h1>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='sign-in' element={<SignIn />} />
        {/* /home/shop */} 
      </Route>
    </Routes>
  );
};

export default App;
