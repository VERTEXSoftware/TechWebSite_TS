import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Home extends Component {
    render() {
        return (
            <header className=" w-full h-[5%] bg-red-800 text-white flex items-center justify-center space-x-4 py-3">
                <Link to="/" className="hover:text-gray-300">Home</Link>
                <Link to="/about" className="hover:text-gray-300">About</Link>
                <Link to="/contact" className="hover:text-gray-300">Contact</Link>
                <Link to="/blog" className="hover:text-gray-300">Blog</Link>
            </header>
        );
    }
}