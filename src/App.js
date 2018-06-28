import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(){
    super();
    this.state = {

    }
  }

  componentDidMount(){
    axios.get('http://localhost:3000/api/karyawans') .then((dataJson) => {
      console.log(dataJson);
    });
  }

  add_karyawan() {
    axios.post('http://localhost:3000/api/karyawans', {
      nama_lengkap: this.refs.nama_lengkap.value,
      email: this.refs.email.value,
      password: ' '
    })
    .then(function (response) {
      alert('Success Add')
    })
    .catch(function (error) {
      alert('Error Add')
    });
  }

  render() {
    return (
      <div>

        <h1>Ini Dari Backend Lhooo Gaess</h1>
        <input ref="nama_lengkap" placeholder="nama lengkap" type="text" /><br />
        <input ref="email" placeholder="email" type="text" /><br />
        <button onClick={() => this.add_karyawan()}>Simpan</button>
        <hr />
        <div>
          <div>

          </div>
        </div>
      </div>
    );
  }
  
}

export default App;