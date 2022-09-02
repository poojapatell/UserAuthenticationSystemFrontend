import React, { useState, useEffect , Component} from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import authHeader from "../services/auth-header";
const API_URL = 'http://localhost:8080/api/test/admin/'


class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isLoading: false,
      isError: false,
      setMessage : '',
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  handleChange = event => {
    this.setState({ setMessage : event.target.value })
    console.log('value is:', event.target.value);
  };

  handleClick = event => {
    event.preventDefault();
    console.log('handleClick', this.state.setMessage);
  };

  async componentDidMount(){
    this.setState({ isLoading: true })
    const response = await fetch(API_URL+`${this.state.setMessage}`,{ headers: authHeader() })
    if (response.ok) {
      const users = await response.json()
      console.log(users);
      this.setState({ users, isLoading: false })
    } 
    else {
      this.setState({ users : [{"username": "Not Found"}], isLoading: false })
    }
  }

  render() {
    const { users, isLoading, isError } = this.state
 
    if (isLoading) {
      return <div>Loading...</div>
    }
 
    if (isError) {
      return <div>Error</div>
    }
  
    return users.length > 0
      ? (
        <div>
        <nav className="navbar navbar-expand ">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
                  <div>
                  <h3>Age Filter</h3>
                    <input
                      type="text"
                      id="message"
                      name="message"
                      onChange={this.handleChange}
                      value={this.state.setMessage}
                      autoComplete="off"
                    />
                    <br></br>
                    <br></br>
                    <button style={{borderRadius:'30px',width : '150px'}} onClick={this.componentDidMount}>Click</button>
                  </div>
          </li>
        </div>
        </nav>
        <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            {this.renderTableHeader()}
          </tr>
        </thead>
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
        </div>
      ) : (
        <div>
          No users.
      </div>
      )
  }
  
renderTableHeader = () => {
    return Object.keys(this.state.users[0]).map(attr => <th scope="col" key={attr}>{attr.toUpperCase()}</th>)
  }
  
renderTableRows = () => {
    return this.state.users.map(user => {
      return (
        <tr key={user.id}>
          <th scope="row">{user.id}</th>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.age}</td>
          <td>{user.password}</td>
          <td>{user.createdAt}</td>
          <td>{user.updatedAt}</td>
        </tr>
      )
    })
}
}

export default Table;
// const renderTableHeader = (message) => {
//   return Object.keys(message[0]).map(attr => <th key={attr}>{attr.toUpperCase()}</th>)
// }
// const renderTableRows = (message) => {
//   return message.map(user => {
//     return (
//       <tr key={user.id}>
//         <td>{user.id}</td>
//         <td>{user.username}</td>
//         <td>{user.email}</td>
//         <td>{user.password}</td>
//       </tr>
//     )
//   })
// }

// const BoardAdmin = () => {
//   const [content, setContent] = useState([{
//     id: 1,
//     "username": "",
//     "email": "",
//     "password": "",
//     "createdAt": "",
//     "updatedAt": "",
// }]);
//   useEffect(() => {
//     UserService.getAdminBoard().then(
//       (response) => {
//         // console.log('response',response);
//         console.log(response.data.message);
//       //   let Data = `<table>
//       //   <thead>
//       //     <tr>
//       //       ${renderTableHeader(response.data.message)}
//       //     </tr>
//       //   </thead>
//       //   <tbody>
//       //     ${renderTableRows(response.data.message)}
//       //   </tbody>
//       // </table>`
//       // console.log(renderTableHeader(response.data.message));
//       // console.log(renderTableRows(response.data.message));
//         setContent(response.data.message);
//       },
//       (error) => {
//         const _content =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
//         setContent(_content);
//       }
//     );
//   }, []);
//   return (
//     <div className="container">
//       <header className="jumbotron">
//         <h3>{content}</h3>
//         {/* <Markup content={content} /> */}
//       </header>
//     </div>
//     // <div id="boardAdminTable"></div>
//   );
// };
// export default BoardAdmin;