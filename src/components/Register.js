import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import React from "react";
import { withRouter} from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";

/**
 * @class Register component handles the Register page UI and functionality
 *
 * Contains the following fields
 *
 * @property {boolean} state.loading
 *    Indicates background action pending completion. When true, further UI actions might be blocked
 * @property {string} state.username
 *    User given field for username
 * @property {string} state.password
 *    User given field for password
 * @property {string} state.confirmPassword
 *    User given field for retyping and confirming password
 */
class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      username: "",
      password: "",
      confirmPassword: "",
    };
  }

  /**
   * Definition for register handler
   * This is the function that is called when the user clicks on the register button or submits the register form
   *    - Display an alert message, "Register logic not implemented yet"
   */
  register = async () => {
    message.info("Register logic not implemented yet");
  }
  //Incomming Change
  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the API call over the network and return the response
   *
   * @returns {{ success: boolean }|undefined}
   *     The response JSON object
   *
   * -    Set the loading state variable to true
   * -    Perform the API call via a fetch call: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
   * -    The call must be made asynchronously using Promises or async/await
   * -    The call must handle any errors thrown from the fetch call
   * -    Parse the result as JSON
   * -    Set the loading state variable to false once the call has completed
   * -    *** If in Milestone 1 ***,
   * -      return the response JSON object
   * -    *** If in Milestone 2 ***,
   * -      Call the validateResponse(errored, response) function defined previously
   * -        If response passes validation, return the response object
   *
   * Example for successful response from backend for the API call:
   * HTTP 200
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  performAPICall = async () => {
    this.setState({loading : true});
    const dataToPost = {
      username : this.state.username,
      password : this.state.password
    }
    let data;
    let flag = false;
    try {
      const response = await fetch(`${config.endpoint}/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(dataToPost)
      });
      data = await response.json();
    } catch {
      flag = true;
    }
    this.setState({loading : false});
    if(this.validateResponse(flag, data))
      return data;
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * -    Check that username field is not an empty value
   * -    Check that username field is not less than 6 characters in length
   * -    Check that username field is not more than 32 characters in length
   * -    Check that password field is not an empty value
   * -    Check that password field is not less than 6 characters in length
   * -    Check that password field is not more than 32 characters in length
   * -    Check that confirmPassword field has the same value as password field
   */
  validateInput = () => {
    const username = this.state.username;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    let flag = true;
    if(username === "") {
      message.error("Username is a required field");
      flag = false;
    }
    else if(username.length < 6 || username.length > 32) {
      message.error("Username should contain atleast 6 and atmost 32 characters");
      flag = false;
    }
    if(password === "") {
      message.error("Password is a required field");
      flag = false;
    }
    else if(password.length < 6 || password.length > 32) {
      message.error("Password should contain atleast 6 and atmost 32 characters");
      flag = false;
    }
    else if(password !== confirmPassword) {
      message.error("Passwords do not match");
      flag = false;
    }
    return flag;
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Check API response
  /**
   * Check the response of the API call to be valid and handle any failures along the way
   *
   * @param {boolean}  errored
   *    Represents whether an error was thrown when the API call was made
   * @param {{ success: boolean, message?: string }}  response
   *    The response JSON object which may contain further success or error messages
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   *
   * If the API call itself threw an error,
   *  - errored flag will be true.
   * If the API call returns an error eg: 400 or 500 status code instead of 200,
   *  - then "success" field will be "false" and "message" field will have a string with error details to be displayed.
   * eg: HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   * If the API call is successful
   *  - "success" field in API response will be true
   *
   *
   * TODO
   * 1. When API call itself threw an error,
   *  - display a generic error message on the website and return false.
   * 2. When there is an error message returned by backend,
   *  - display an error message with contents of the "message" field of API response and return false.
   * 3. When there is no error and API call is successful,
   *  - return true.
   *
   */
  validateResponse = (errored, response) => {
    if(errored || !response.success) {
      message.error(response.message);
      return false;
    }
    message.success("Registered Successfully");
    return true;
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Implement the register function
  /**
   * Definition for register handler
   * This is the function that is called when the user clicks on the register button or submits the register form
   * -    Call the previously defined validateInput() function and check that is returns true, i.e. the input values pass validation
   * -    Call the previously defined performAPICall() function asynchronously and capture the returned value in a variable
   * -    If the returned value exists,
   *      -   Clear the input fields
   *      -   Display a success message
   *      -   Redirect the user to the "/login" page
   */
  register = async () => {
    const response = this.validateInput() ? await this.performAPICall() : null;
    if(response != null) {
      this.setState({
        username: "",
        password: "",
        confirmPassword: ""
      });
      this.props.history.push("/login");
    }
  };
  //End of incomming change
  /**
   * JSX and HTML goes here
   * We require a text field, a password field, and a confirm password field (each with data binding to state), and a submit button that calls register()
   */
  render() {
    return (
      <>
        {/* Display Header */}
        <Header history={this.props.history} />

        {/* Display Register fields */}
        <div className="flex-container">
          <div className="register-container container">
            <h1>Make an account</h1>

            {/* Antd component which renders a formatted <input type="text"> field */}
            <Input
              className="input-field"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              value = {this.state.username}
              onChange={(e) => {
                this.setState({
                  username: e.target.value,
                });
              }}
            />

            {/* Antd component which renders a formatted <input type="password"> field */}
            <Input.Password
              className="input-field"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder = "Password"
              value = {this.state.password}
              onChange={(e) => {
                this.setState({
                  password: e.target.value,
                });
              }}
            />

            {/* Antd component which renders a formatted <input type="password"> field */}
            <Input.Password
              className="input-field"
              prefix={<LockOutlined className="site-form-item-icon"/>}
              placeholder="Confirm Password"
              value = {this.state.confirmPassword}
              onChange={(e) => {
                this.setState({
                  confirmPassword: e.target.value,
                });
              }}
            />

            {/* Antd component which renders a formatted <button type="button"> field */}
            <Button
              loading={this.state.loading}
              type="primary"
              onClick = {this.register}
            >
              Register
            </Button>
          </div>
        </div>

        {/* Display the footer Incomming change*/}
        <Footer></Footer>
      </>
    );
  }
}

export default withRouter(Register);