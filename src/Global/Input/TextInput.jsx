import React, { Component } from "react";
import "./scss/input.scss";
export default class TextInput extends Component {
      renderError() {
            if (this.props.error) {
                  return (
                        <div id="name-err" className="ta_err-text">
                              {this.props.error}
                        </div>
                  );
            }
            //else
            return;
      }

      renderLabel() {
            let label = this.props.labelname;
            if (this.props.required) {
                  return (
                        <div>
                              <span className="labelText">{label}</span>
                              <span className="labelRequired"> (required)</span>
                        </div>
                  );
            }
            return label;
      }
      render() {
            let validationError = this.props.validationError;
            let onSubmitValidationError = this.props.onSubmitValidationError;
            let inputClasses = [this.props.className];

            if (
                  (this.props.invalid && this.props.shouldValidate && this.props.touched) ||
                  onSubmitValidationError
            ) {
                  inputClasses.push("ta-form--err");
                  validationError = this.renderError();
            }

            return (
                  <div
                        className={
                              this.props.outerClassName ? this.props.outerClassName : "container"
                        }
                  >
                        <label htmlFor={this.props.id}>{this.renderLabel()}</label>
                        <input
                              id={this.props.id}
                              value={this.props.value}
                              type={this.props.type}
                              onChange={this.props.onChange}
                              defaultValue={this.props.defaultValue}
                              className={
                                    inputClasses
                                          ? inputClasses.join(" ")
                                          : inputClasses.join(" ") + "form-control"
                              }
                              onBlur={this.props.onBlur}
                        />
                        {validationError}

                  </div>
            );
      }
}