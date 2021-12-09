import React from 'react'
import { Routes as Router, Route } from 'react-router-dom'
import Landing from './pages/landing';
import List from './pages/list';

function Routes() {
    return (
        <Router>
            <Route path="/" element={<Landing />} />
            <Route path="/lista" element={<List />} />
        </Router>

    );
}

export default Routes;