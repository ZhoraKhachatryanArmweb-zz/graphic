import React, {Component} from 'react';
import './home.css';
import SimpleTable from "../Data/demo";

class Home extends Component {
    render() {
        return (
            <div className="container">
                <SimpleTable/>
            </div>
        );
    }
}

export default Home;
