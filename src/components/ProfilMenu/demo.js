import React, {useState, useEffect, Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux';
import {
  changeRemember,
  changeRememberNot,
  fetchProfile,
  fetchProfileReminders,
  postProfile,
  profileUpdate
} from '../../redux/actions/';
import { Link } from "react-router-dom";
import "./demo.css"
function createData(Id,firstname, lastname,phone,email,product,time,isRemember) {
  return {Id,firstname, lastname,phone,email,product,time,isRemember};
}

class SimpleTable extends Component {
  static data = [];
  rows = [];

   constructor(props) {
    super(props);
    this.state = {
      ren:false,
      _id: '',
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      product:'',
      time:'',
      isRemember:''
    }

  }
  checking(event){
     this.setState({ren:true});
     if(event.target.checked){
       this.props.changeRemember(event.target.id);
     }else{
       this.props.changeRememberNot(event.target.id);
     }
    this.setState({ren:false});
  }
  componentDidMount() {
    switch(window.location.pathname){
      case "/reminders":
        this.redux_call(this.props.getProfileReminders());
        break;
      case "/prof-menu":
        this.redux_call(this.props.getProfile());
        break;
      default:
        break;
    }
  }

  redux_call(a){
     a.then(() => {
       if (this.props.profile.length) {
         SimpleTable.data = this.props.profile;
         console.log(SimpleTable.data);
         for (let i = 0; i < SimpleTable.data.length; i++) {
           this.rows.push(createData(
               SimpleTable.data[i]['_id'],
               SimpleTable.data[i]['firstname'],
               SimpleTable.data[i]['lastname'],
               SimpleTable.data[i]['phone'],
               SimpleTable.data[i]['email'],
               SimpleTable.data[i]['product'],
               SimpleTable.data[i]['time'],
               SimpleTable.data[i]['isRemember'].toString(),
           ))
         }

         const {Id,firstname, lastname, phone, email,product,time,isRemember} = this.props.profile[0];
         this.setState({
           Id, firstname, lastname, phone, email, product, time, isRemember
         });
       }
     });
  }

  render() {
    return (
        <Paper >
          <Table >
            <TableHead>
              <TableRow>
                <TableCell align="right">Uniq Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Surname</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Product</TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right">Remember</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.rows.map(row => (
                  <TableRow key={row.Id}>
                    <TableCell align="right">{row.Id}</TableCell>
                    <TableCell align="right">{row.firstname}</TableCell>
                    <TableCell align="right">{row.lastname}</TableCell>
                    <TableCell align="right">{row.phone}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.product}</TableCell>
                    <TableCell align="right">{row.time}</TableCell>
                    <TableCell align="right">
                      <Link to="/reminders" className="nav-link">
                      <input id={row.Id}
                             className="check"
                             type='checkbox'
                             onChange={this.checking.bind(this)}
                             checked={ eval(row.isRemember)}
                      />
                    </Link>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    fetching: state.fetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => dispatch(fetchProfile()),
    getProfileReminders: () => dispatch(fetchProfileReminders()),
    changeRemember:id => dispatch(changeRemember(id)),
    changeRememberNot:id => dispatch(changeRememberNot(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleTable);
