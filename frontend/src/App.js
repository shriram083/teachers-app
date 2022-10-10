import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import { ReqAuth } from "./hoc/ReqAuth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SingleStudent from "./pages/SingleStudent";
import StudentsList from "./pages/StudentsList";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ReqAuth>
              <StudentsList />
            </ReqAuth>
          }
        />
        <Route
          path="/students/:id"
          element={
            <ReqAuth>
              <SingleStudent />
            </ReqAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
