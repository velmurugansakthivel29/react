import React,{ useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { HTTP } from 'actions/apiConfig';
import validate from 'validate.js';
import clsx from 'clsx';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField,
  Snackbar
} from '@material-ui/core';
const schema = {
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6,
      maximum: 32
    }
  },
  confirm_password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6,
      maximum: 32
    }
  }
};
const useStyles = makeStyles(theme => ({
  root: {
  }
}));

const Settings = props => {
  const { className } = props;
  const classes = useStyles();
  const [values, setValues] = useState({
    form:{
      password:'',
      confirm_password:''
    },
    open:false,
    isValid:false,
    errors:{},
    touched: {}
  });
  useEffect(() => {
    const errors = validate(values.form,schema);
    setValues(values => ({
      ...values,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  },[values.form]);

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      form: {
        ...values.form,
        [event.target.name]:event.target.value
      },
      touched: {
        ...values.touched,
        [event.target.name]: true
      }
    }));
  };
  const changePassword = event => {
    event.preventDefault();
    setValues(values => ({
       ...values,
       isValid :false
    }))
    HTTP.post('/retailer/changePassword',values.form)
    .then((res)=> {
      setValues(values => ({
        ...values,
        form:{
          password:'',
          confirm_password:''
        },
        errors:{},
        touched: {},
        open:true
      }));
      setTimeout(() => {
        setValues(values => ({
          ...values,
          open:false
        }));
      },5000);
    })
    .catch((err)=> {
        // console.log(err);
    })
  };
  const hasError = field =>
    values.touched[field] && values.errors[field] ? true : false;
  return (
    <div className={classes.root}>
      <Grid
        item>
        <Card
          className={clsx(classes.root, className)}>
          <form
            autoComplete="off"
            noValidate
            onSubmit={changePassword}>
            <CardHeader
              subheader="Update password"
              title="Password"
            />
            <Divider />
            <CardContent>
              <TextField
                fullWidth
                label="Password"
                name="password"
                onChange={handleChange}
                type="password"
                error={hasError('password')}
                helperText={
                  hasError('password') ? values.errors.password[0] : null
                }
                value={values.form.password}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Confirm password"
                name="confirm_password"
                onChange={handleChange}
                error={hasError('confirm_password')}
                helperText={
                  hasError('confirm_password') ? values.errors.confirm_password[0] : null
                }
                style={{ marginTop: '1rem' }}
                type="password"
                value={values.form.confirm_password}
                variant="outlined"
              />
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={!values.isValid}>
                Update
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
      <Snackbar
        open={values.open}
        autoHideDuration={4000}
        message={<span>Password changed sucessfully</span>}
    />
    </div>
  );
};

Settings.propTypes = {
  className: PropTypes.string
};
export default Settings;
