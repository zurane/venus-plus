import Landing from './pages/Landing.js';
import SignUp from './pages/SignUp.js';
import SignIn from './pages/SignIn.js';
import Dashboard from './pages/Dashboard.js';
import { BrowserRouter, Route, Routes } from 'react-router';




function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    // <Landing />
  );
}
export default App;
