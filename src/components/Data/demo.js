import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchGraficData, fetchPeriodData,changeData} from '../../redux/actions/';
import "./demo.css"
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {Link} from "react-router-dom";

var global;
class SimpleTable extends Component {
  static   data = [];

  constructor(props) {
    super(props);
    this.state = {
      name:'',
      price:'',
      yiel:'',
      spread:'',
      price_:true,
      yiel_:true,
      spread_:true
    }
  }
  componentDidMount() {
    this.redux_call(this.props.getGraficData());
  }

  allSetState = (price,yiel,spread)=>{
    this.setState({price_:price})
    this.setState({yiel_:yiel})
    this.setState({spread_:spread})
  }

  getPeriod = () =>{
    this.redux_call(this.props.getPeriodData());
  }

  changeYield = (event) =>{
    this.setState({yiel:event.target.value})
  }

  changeName= (event) =>{
    this.setState({name:event.target.value})
  }

  changeSpread = (event) =>{
    this.setState({spread:event.target.value})
  }

  changePrice = (event) =>{
    this.setState({price:event.target.value})
  }

  handleSubmit =() => {
    global = (this.state)
    this.redux_call(this.props.changeData());
    window.location.pathname ="/change"
  }

  selectGrafic = (event) => {
     if(event.target.value === 'yield'){
        this.allSetState(false,true,false)
     }else if(event.target.value === 'price'){
        this.allSetState(true,false,false)
     }else if(event.target.value === 'spread'){
       this.allSetState(false,false,true);
     }else if(event.target.value === 'all'){
       this.allSetState(true,true,true);
     }
  }

  redux_call(a) {
    a.then(() => {
      if (this.props.profile.length) {
        SimpleTable.data = this.props.profile;
        const {free_seats, teatre, kino} = this.props.profile[0];
        this.setState({
          free_seats, teatre, kino
        });
      }
    });
  }

  render() {

    return (
        <div>
          <h1>Recharts Grafic</h1>
          <div className="navbar-nav mr-auto">
            <span className="route" onClick={this.getPeriod}>
              <Link to="/week" className="nav-link">WEEK</Link>
            </span>
            <span className="route" onClick={this.getPeriod}>
              <Link to="/month" className="nav-link">MONTH</Link>
            </span>
            <span className="route" onClick={this.getPeriod}>
              <Link to="/year" className="nav-link">YEAR</Link>
            </span>
          </div>
          <br/>
          <LineChart
              width={1200}
              height={300}
              data={SimpleTable.data}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            {this.state.price_  &&  <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{r: 8}}/>}
            {this.state.yiel_   &&  <Line type="monotone" dataKey="yiel" stroke="#82ca9d"/>}
            {this.state.spread_ &&  <Line type="monotone" dataKey="spread" stroke="red"/>}
          </LineChart>
          <br/>
          <div className='ctrl'>
            <div className='cell'>
              <table>
                <thead>
                </thead>
                <tbody>
                <tr>
                  <td><label htmlFor='n'>Name:</label></td>
                  <td><input id = 'n' nsme='name' className='change-input' onChange={this.changeName}/></td>
                </tr>
                <tr>
                  <td><label htmlFor='p'>Price:</label></td>
                  <td> <input id='p' nsme='price' className='change-input'onChange={this.changePrice} /></td>
                </tr>
                <tr>
                  <td><label htmlFor='s'>Spread:</label></td>
                  <td><input id = 's' nsme='spread' className='change-input'  onChange={this.changeSpread} /></td>
                </tr>
                <tr>
                  <td><label htmlFor='y'>Yield:</label></td>
                  <td> <input id='y' nsme='yiel' className='change-input'  onChange={this.changeYield} /></td>
                </tr>
                </tbody>
              </table>
              <input type="button"
                     className="buttonChange"
                     value="CHANGE"
                     onClick={this.handleSubmit}
              />
            </div>
            <div className='cell'>
                <select id="slc" onClick={this.selectGrafic}>
                  <option  value="yield">Yield</option>
                  <option  value="spread">Spread</option>
                  <option  value="price">Price</option>
                  <option  value="all">All</option>
                </select>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    profile: state.profile,
    fetching: state.fetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGraficData: () => dispatch(fetchGraficData()),
    getPeriodData: () => dispatch(fetchPeriodData(window.location.pathname)),
    changeData: () => dispatch(changeData(global.name,global.yiel,global.spread,global.price))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleTable);
