import React from "react";
import {connect} from 'react-redux';
import {signIn,signOut} from '../actions'
class GoogleAuth extends React.Component {
  
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "46222452415-f5ho0ug64kqruktsqm5aensri9p6nkqt.apps.googleusercontent.com",
          scope: "email", //only we want email thats why we are scoping email
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn)
    {
      return signIn;
    }
    else{
      return signOut;
    }
  };

  onSignInClick = () =>{
      this.props.signIn();
  }

  onSignOutClick = () =>{
    this.props.signOut();
}
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          SignOut
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui green google button">
        <i className="google icon" />
        SignIn With Google
      </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) =>{
  return{isSignedIn:state.auth.isSignedIn};
}

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);
