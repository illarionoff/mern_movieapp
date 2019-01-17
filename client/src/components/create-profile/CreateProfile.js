import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    location: "",
    sex: "",
    twitter: "",
    instagram: "",
    facebook: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      sex: this.state.sex,
      location: this.state.location,
      twitter: this.state.twitter,
      instagram: this.state.instagram,
      facebook: this.state.facebook
    };
    this.props.createProfile(profileData, this.props.history);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { user } = this.props.auth;
    const { errors, displaySocialInputs } = this.state;
    // Select optiond for sex
    const sexOptions = [
      { label: "Select your sex", value: 0 },
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Prefer not to answer", value: "No answer" }
    ];

    const countriesOptions = [
      { label: "Choose country", value: "" },
      { label: "USA", value: "USA" },
      { label: "Russia", value: "Russia" },
      { label: "Prefer not to answer", value: "No answer" }
    ];

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Instagram"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
          <InputGroup
            placeholder="Facebook"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Welcome {user.name}</h1>
              <p className="lead text-center">Create Your Profile</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Profile handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Unique handle for your profile url"
                  type="text"
                />
                <SelectListGroup
                  placeholder="Choose your sex"
                  name="sex"
                  value={this.state.sex}
                  onChange={this.onChange}
                  error={errors.sex}
                  options={sexOptions}
                />
                <SelectListGroup
                  placeholder="Choose your location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  options={countriesOptions}
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add social network link
                  </button>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
