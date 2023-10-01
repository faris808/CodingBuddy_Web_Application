import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import EditorPage from "./pages/EditorPage";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <div>
        <Toaster position="top-right"  //Here we had defined the Toaster container globally in the app.js, so      that it can work anywhere inside our project 
        toastOptions={{
          success:{
            theme:{
              primary:'#4aee88',
            }
          }
        }}></Toaster>
      </div>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/editor/:roomid" element={<EditorPage />}></Route>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
