import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import AddProject from './components/AddProject';
import UpdateProject from './components/UpdateProject';

function App() {
    return (
        <Router>
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={<ProjectList />} />
                    <Route path="/add-project" element={<AddProject />} />
                    <Route path="/update-project/:id" element={<UpdateProject />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
