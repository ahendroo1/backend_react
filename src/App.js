import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      data_karyawan:[],
      row_karyawan:[]
    }
  }

  componentDidMount(){
    this.refresh_kar();
  }
  componentWillMount(){
    setTimeout(() => {  this.refresh_kar(); }, 100);
  }

  refresh_kar(){
    axios.get('http://localhost:3000/api/karyawans').then((dataJson) => {
      this.setState({data_karyawan:dataJson.data})
    });
  }

  add_karyawan() {

    if(this.refs.nama_lengkap.value == '' && this.refs.email.value == ''){
      alert('Input kosong');
    }else{
      axios.post('http://localhost:3000/api/karyawans', {

        nama_lengkap: this.refs.nama_lengkap.value,
        email: this.refs.email.value,
        password: ' '
      })
      .then((response) => {
        alert("success")
        // console.log(response);
        this.state.data_karyawan.push(response.data);
        this.refresh_kar();
        // this.changeDatakaryawan();
      })
    }

    
    // .catch(function (error) {
    //   this.setState({data_karyawan:error});
    // });
  }

  render() {

    let cols = [
      {field: 'nama_lengkap', header:"Nama Lengkap" },
      {field: 'email', header: 'Email'}
    ]; 

    // const row_karyawan = this.state.data_karyawan.map((p_, index)=>{
    // })
    // var dynamicColumns = this.state.row_karyawan.map((p_, index)=>{
    //   return <Column key={index} field={p_.nama_lengkap} header="nama" />;
    // });
    let dynamicColumns = cols.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });
    
    return (
      <div>

        <h1>Ini </h1>
        <input ref="nama_lengkap" placeholder="nama lengkap" type="text" /><br />
        <input ref="email" placeholder="email" type="text"  /><br />
        <button onClick={() => this.add_karyawan()}>Simpan</button>
        <hr />
        {/* <button onClick={() => this.refresh_kar()}>Refresh</button> */}
        <div>
          {/* <table>
            {row_karyawan}
          </table> */}
          <DataTable value={this.state.data_karyawan} paginator={true}  rows={5} rowsPerPageOptions={[5,10,20]}>
            {dynamicColumns}
          </DataTable>
          
        </div>
      </div>
    );
  }

}

export default App;