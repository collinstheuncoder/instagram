import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { Form, Grid, Icon, Input } from 'semantic-ui-react';

import style from './passwordfield.module.scss';

class PasswordField extends Component {
  state = {
    showPassword: false,
  };

  onTogglePassword = () =>
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));

  render() {
    const { showPassword } = this.state;
    const { name, value, label, onChange } = this.props;

    return (
      <Form.Field className={style.field}>
        <Grid.Row>
          <Grid.Column width={6}>
            <label className={style['label']}>{label}</label>
          </Grid.Column>
          <Grid.Column width={10}>
            <Input
              className={style.input}
              type={showPassword ? 'text' : 'password'}
              name={name}
              value={value}
              onChange={onChange}
              icon={
                <Icon
                  name={showPassword ? 'eye slash outline' : 'eye'}
                  link
                  onClick={this.onTogglePassword}
                />
              }
            />
          </Grid.Column>
        </Grid.Row>
      </Form.Field>
    );
  }
}

PasswordField.propTypes = {
	name: string.isRequired,
	value: string.isRequired,
	label: string.isRequired,
	onChange: func.isRequired,
}

export default PasswordField;
