import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  Snackbar,
  TextField
} from '@material-ui/core';
import { HTTP } from 'actions/apiConfig';

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6,
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 2,
      maximum: 32
    },
    email: true
  },
  contact_number: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 10,
      maximum: 10
    }
  },
  address: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 10,
      maximum: 50
    }
  }
};
const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [values, setValues] = useState({
    form:{
      name: '',
      email: '',
      contact_number: '',
      address: ''
    },
    open:false,
    isValid:false,
    errors:{},
    touched: {}
  });

  const handleChange = event => {
    event.persist();
    setValues({
      ...values,
      form: {
        ...values.form,
        [event.target.name]:event.target.value
      },
      touched: {
        ...values.touched,
        [event.target.name]: true
      }
    });
  };
  const updateDetails = event => {
    event.preventDefault();
    setValues(values => ({
       ...values,
       isValid :false
    }))
    HTTP.put('/retailer',values.form)
    .then((res)=> {
      setValues(values => ({
        ...values,
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
  async function getUser() {
      HTTP.get('/retailer')
      .then((res)=> {
        let data = res.data.result;
        setValues(user => ({
          ...user,
          form:{
            ...user.form,
            name:data.name ,
            email:data.email,
            address:data.address,
            contact_number:data.contact_number
          }
        }));
      })
      .catch((err)=> {
          // console.log(err);
      })
   }
  useEffect(() =>{
    getUser();
  }, []);
  useEffect(() =>{
    const errors = validate(values.form,schema);
    setValues(values => ({
      ...values,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [values.form]);
  const hasError = field =>
    values.touched[field] && values.errors[field] ? true : false;
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        onSubmit={updateDetails}
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                error={hasError('password')}
                helperText={
                  hasError('password') ? values.errors.name[0] : null
                }
                label="Brand name"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={values.form.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                error={hasError('email')}
                helperText={
                  hasError('email') ? values.errors.email[0] : null
                }
                onChange={handleChange}
                required
                value={values.form.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                margin="dense"
                name="contact_number"
                onChange={handleChange}
                type="text"
                value={values.form.contact_number}
                variant="outlined"
                error={hasError('contact_number')}
                helperText={
                  hasError('contact_number') ? values.errors.contact_number[0] : null
                }
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Address"
                margin="dense"
                name="address"
                onChange={handleChange}
                required
                value={values.form.address}
                variant="outlined"
                error={hasError('address')}
                helperText={
                  hasError('address') ? values.errors.address[0] : null
                }
              >
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={!values.isValid}
          >
            Save details
          </Button>
        </CardActions>
      </form>
      <Snackbar
        open={values.open}
        autoHideDuration={4000}
        message={<span>Details updated sucessfully</span>}
    />
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
