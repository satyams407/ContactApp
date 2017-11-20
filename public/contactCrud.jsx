// let React=require('react');
// let ReactDOM= require('react-dom');
//import { withRouter } from 'react-router';

let EmployeeAll;
EmployeeAll = React.createClass({
    login() {
        console.log('in login');
        //this.props.router.push('/edit.html');
    },

    // toggleVisiblity: function () {
    //     let e = document.getElementById('div1');
    //     if (e.style.display === 'block') e.style.display = 'none';
    //     else e.style.display = 'block';
    // },

    getInitialState: function () {
        return {
            name: '',
            address: '',
            personalNumber: '',
            officeNumber: '',
            image: '',
            id: '', Buttontxt: 'Save',
            data1: []
        };
    },

    handleChange: function (e) {
        this.setState({[e.target.name]: e.target.value});
    },

    componentDidMount() {

        $.ajax({
            url: "api/getdata",
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {
                this.setState({data1: data});

            }.bind(this),
            error: function (jqXHR) {
                console.log(jqXHR);

            }.bind(this)
        });
    },

    DeleteData(id) {
        let employeeDelete = {
            'id': id
        };
        $.ajax({
            url: "/api/Removedata/",
            dataType: 'json',
            type: 'POST',
            data: employeeDelete,
            success: function (data) {
                alert(data.data);
                this.componentDidMount();

            }.bind(this),
            error: function (xhr, status, err) {
                alert(err);


            }.bind(this),
        });
    },


    EditData(item) {
        this.setState({
            name: item.name,
            address: item.address,
            personalNumber: item.personalNumber,
            officeNumber: item.officeNumber,
            image: item.image,
            id: item._id,
            Buttontxt: 'Update'
        });
    },

    handleClick: function () {

        let Url = "";
        if (this.state.Buttontxt === "Save") {
            Url = "/api/insertdata";
        }
        else {
            Url = "/api/Updatedata";
        }
        let employeedata = {
            'name': this.state.name,
            'address': this.state.address,
            'personalNumber': this.state.personalNumber,
            'officeNumber': this.state.officeNumber,
            'image': this.state.image,
            'id': this.state.id,

        }
        $.ajax({
            url: Url,
            dataType: 'json',
            type: 'POST',
            data: employeedata,
            success: function (data) {
                alert(data.data);
                this.setState(this.getInitialState());
                this.componentDidMount();

            }.bind(this),
            error: function (xhr, status, err) {
                alert(err);
            }.bind(this)
        });
    },


    render: function () {
        return (
            <div className='panel panel-primary'>
                <h1 id="heading1">Contact List </h1>
                <div className="table-responsive " style={{marginleft: '100px'}}>

                    <table className="table" style={{marginleft: '50px'}}>
                        <thead>
                        <tr>
                            <th style={{padding: '10px', float: 'left'}}>Name</th>
                            <th>Address</th>
                            <th style={{padding: '10px', float: 'left'}}>PersonalNumber</th>
                            <th style={{padding: '10px'}}>OfficeNumber</th>
                        </tr>
                        </thead>

                        <tbody>

                        {this.state.data1.map((item, index) => (
                            <tr key={index}>
                                <td style={{padding: '10px'}}>{index + 1 + ". "}{item.name}</td>
                                <td style={{padding: '10px'}}>{item.address}</td>
                                <td style={{padding: '10px'}}>{item.personalNumber}</td>
                                <td style={{padding: '10px'}}>{item.officeNumber}</td>
                                <td>{item.image}</td>
                                <td>

                                    <button type="button" className="btn btn-success" onClick={(e) => {
                                        this.EditData(item)
                                    }}>Edit
                                    </button>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-info" onClick={(e) => {
                                        this.DeleteData(item._id)
                                    }}>Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>


                {/*<button type="button" className="btn btn-primary" style={{marginLeft: '530px'}} onClick={this.login}>Add New Contact*/}
                {/*</button>*/}

                <div className="col-sm-12 col-md-12" style={{marginLeft: '400px'}} id="div1">

                    <table className="table-bordered">
                        <tbody>
                        <tr>
                            <td><b>Name</b></td>
                            <td>
                                <input className="form-control" type="text" value={this.state.name} name="name"
                                       onChange={this.handleChange}/>
                                <input type="hidden" value={this.state.id} name="id"/>
                            </td>
                        </tr>

                        <tr>
                            <td><b>Address</b></td>
                            <td>
                                <input type="text" className="form-control" value={this.state.address}
                                       name="address" onChange={this.handleChange}/>
                            </td>
                        </tr>


                        <tr>
                            <td><b>Personal number</b></td>
                            <td>
                                <input type="text" className="form-control" value={this.state.personalNumber}
                                       name="personalNumber" onChange={this.handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td><b>Office Number</b></td>
                            <td>
                                <input type="text" className="form-control" value={this.state.officeNumber}
                                       name="officeNumber" onChange={this.handleChange}/>
                            </td>
                        </tr>

                        <tr>
                            <td><b>Upload Image</b></td>
                            <td>
                                <input type="file" className="form-control" id="exampleInputFile"
                                       onChange={this.handleChange}
                                       aria-describedby="fileHelp"/>
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>
                                <input className="btn btn-primary " id="save_button" type='button'
                                       value={this.state.Buttontxt}
                                       onClick={this.handleClick}/>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>

            </div>

        );

    }
});

ReactDOM.render(<EmployeeAll/>, document.getElementById('root'));