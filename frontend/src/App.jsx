import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EventDetailPage from "./pages/EventDetailPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />

      <div data-theme="forest" className="min-h-screen bg-base-200 " >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
      </Routes>
      </div>
    </>
  );
};

export default App;