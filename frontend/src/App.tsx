import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import LiveDetectionPage from './pages/LiveDetectionPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/live" element={<LiveDetectionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;