import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Button} from 'primereact/components/button/Button';


class App extends Component {
  constructor(){
    super();
    this.state = {
      data_karyawan:[]
      // row_karyawan:[]
    }
  }

  componentDidMount(){
    this.refresh_kar();
  }

  actionTemplate(rowData, column) {
    return <div>
        <Button type="button" onClick="" icon="fa fa-search" className="ui-button-danger">x</Button>
    </div>; 
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

  del_Kar(data){

    if(!data || data.length === 0){
      alert('Input Delete kosong');
    }else{
      data.map((kar,i) => 
          {
            var url_del = 'http://localhost:3000/api/karyawans/'+ kar.id ;
            axios.delete(url_del)
            .then((res) => {
              alert("success delete data : " + kar.nama_lengkap )
              console.log(res);
              // console.log(response);
              this.refresh_kar();
              this.setState({selectedCars3:0})
              this.displaySelection();
              // this.changeDatakaryawan();
            })
          })
      
    }
  }

  displaySelection(data) {
    if(!data || data.length === 0) {
        return <div style={{textAlign: 'left'}}>No Selection</div>;
    }
    else {
        if(data instanceof Array){
            // this.setState({data_kar_hapus:data})
            return <ul style={{textAlign: 'left', margin: 0}} > 
              {
                data.map((kar,i) => 
                  <li key={kar.id}>
                    {kar.nama_lengkap }
                    <br />{ kar.email }
                    <br />
                  </li>
                )
              }
              <Button type="button" onClick={()=> this.del_Kar(data)} icon="fa fa-search" className="ui-button-danger">x</Button>
            </ul>;
        }else{
            return <div style={{textAlign: 'left'}}>Selected Data: {'Nama Lengkap : '+data.nama_lengkap + ' - Email :' + data.email} <button onClick={()=> this.del_Kar(data.id)}>Delete</button></div>
        }      
    }
  }


  render() {
  
  
    // let paginatorLeft = <Button icon="fa fa-refresh"/>;
    // let paginatorRight = <Button icon="fa fa-cloud-upload"/>;
   

    let cols = [
      {field: 'id', header:"ID" },
      {field: 'nama_lengkap', header:"Nama Lengkap" },
      {field: 'email', header: 'Email'}
      // {body:this.actionTemplate() }
    ]; 

    // const row_karyawan = this.state.data_karyawan.map((p_, index)=>{
    // })
    // var dynamicColumns = this.state.row_karyawan.map((p_, index)=>{
    //   return <Column key={index} field={p_.nama_lengkap} header="nama" />;
    // });

    // let paginatorLeft = <Button icon="fa fa-refresh"/>;
    // let paginatorRight = <Button icon="fa fa-cloud-upload"/>;

    let dynamicColumns = cols.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });

    return (
      <div>

        <h1> </h1>
        <input ref="nama_lengkap" placeholder="nama lengkap" type="text" /><br />
        <input ref="email" placeholder="email" type="text"  /><br />
        <button onClick={() => this.add_karyawan()}>Simpan</button>
        <hr />
          <input ref="id_delete" type="text" /><br />
          <button onClick={() => this.del_Kar() }>Delete</button>
        <hr />
        {/* <button onClick={() => this.refresh_kar()}>Refresh</button> */}
        <div>
          {/* <table>
            {row_karyawan}
          </table> */}
          {/* <DataTable value={this.state.data_karyawan} paginator={true}  rows={5} rowsPerPageOptions={[5,10,20]}>
         
            <Column field="id" header="ID" />
            <Column field="nama_lengkap" header="Nama Lengkap" />
            <Column field="email" header="Email" />
            <Column body={this.actionTemplate} style={{textAlign:'center'}}>
              
            </Column>
            
          </DataTable> */}
          <DataTable value={this.state.data_karyawan} header="Delete Selection" footer={this.displaySelection(this.state.selectedCars3)}
                        selection={this.state.selectedCars3} onSelectionChange={(e) => this.setState({selectedCars3: e.data})}>
          {/* <DataTable value={this.state.data_karyawan} selectionMode="single" header="Single Selection" footer={this.displaySelection(this.state.selectedCar1)} selection={this.state.selectedCar1} onSelectionChange={(e) => this.setState({selectedCar1: e.data})}> */}
              <Column selectionMode="multiple" style={{width:'5em'}}/>
              <Column field="nama_lengkap" header="Nama" />
              <Column field="email" header="Email" />
          </DataTable>

          
        </div>
      </div>
    );
  }

}

export default App;