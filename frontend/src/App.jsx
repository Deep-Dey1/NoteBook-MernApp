import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"
import { toast } from "react-hot-toast";
const App = () => {
  return (<div data-theme="forest">
    {/* sample use of react-hot-toast and tailwind css*/}
     {/* <button onClick = {() => toast.error("congrats")} className="text-red-500 p-5 bg-slate-600">Click Me</button> */}
    {/* testing daisyui buttons :  */}
    <button className="btn btn-outline">Default</button>
    <button className="btn btn-outline btn-primary">Primary</button>
    <button className="btn btn-outline btn-secondary">Secondary</button>
    <button className="btn btn-outline btn-accent">Accent</button>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/:id" element={<NoteDetailPage />} />
    </Routes>
  </div>);
};

export default App;
