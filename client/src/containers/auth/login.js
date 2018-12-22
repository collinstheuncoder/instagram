import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react';

import LoginForm from '../../components/auth/LoginForm';
import { loginUser } from './actions';

const styles = {
	grid: {
		alignItems: 'center', 
    minHeight: '100vh',
	},
  image: {
    width: '12.5rem',
  },
};

export function LoginPage({ loginUser }) {
  return (
    <Grid style={styles.grid}>
    	<Grid.Row>
    		<Grid.Column>
		    	<Image
		        style={styles.image}
		        src="https://imgur.com/3aCDD3O.jpg"
		        size="small"
		        centered
		      />
		    	<LoginForm loginUser={loginUser} />
    		</Grid.Column>
    	</Grid.Row>
    </Grid>
  );
}

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default connect(null, { loginUser })(LoginPage);
