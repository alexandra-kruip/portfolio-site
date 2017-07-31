import React from 'react';
import './app.css';
import Navbar from './navbar';
import Footer from './footer';
import Grid from './grid';
import VideoList from './videolist';

const App = () => (
    <div>
        <div className="app">
            <h1>Welcome to Couch Pugtato!</h1>
        </div>
        <Grid />
        <VideoList />
        <Footer />
    </div>
);

export default App;