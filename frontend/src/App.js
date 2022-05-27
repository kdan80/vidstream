import { useState } from "react";
import VideoList from "./VideoList/VideoList";
import TopBar from "./TopBar/TopBar";
import Watch from "./Watch/Watch";
import UploadVideo from "./UploadVideo/UploadVideo";
//import "./App.css";
import "./styles/css/main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  const [showUploadLink, setShowUploadLink] = useState(true);

  return (
    <div className="app__root">
      <Router>
        <TopBar showUploadLink={showUploadLink} />
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/watch/:v_id" element={<Watch />} />
          <Route path="/upload" element={<UploadVideo setShowUploadLink={setShowUploadLink} />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
