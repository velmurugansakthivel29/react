import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import validate from "validate.js";
import clsx from "clsx";
import { Snackbar, Grid, FormControl, Select, OutlinedInput, MenuItem, TextField, InputLabel, Button, Card, CardHeader, Divider, CardContent, CardActions } from "@material-ui/core";
import { HTTP } from "actions/apiConfig";

const schema = {
  user_name: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32
    }
  },
  contact_number: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 8,
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64
    }
  },
  role_name: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128
    }
  }
};
const schema1 = {
  user_name: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32
    }
  },
  contact_number: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 8,
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128
    }
  }
};
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  close: {
    padding: theme.spacing(0.5)
  },
  textField: {
    marginTop: theme.spacing(4)
  },
  root: {
    padding: theme.spacing(1)
  },
  form: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  }
}));
const Retailer = () => {
  const [values, setValues] = React.useState({
    age: '',
    name: 'hai',
  });
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [formState, setFormState] = useState({
    msg: "",
    openMsg: false,
    isValid: false,
    isUValid: false,
    loading: false,
    aretailer: {},
    uretailer: {},
    retailers: [],
    touched: {},
    touched1: {},
    errors: {},
    errors1: {},
    roles: [
      { name: "Retailer", id: "retailer" },
      { name: "Admin", id: "admin" }
    ]
  });
  useEffect(() => {
    const errors = validate(formState.aretailer, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.aretailer]);
  useEffect(() => {
    const errors = validate(formState.uretailer, schema1);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.uretailer]);
  useEffect(() => {
    getAllRetailer();
  }, []);

  const handleSelectChange = (event) => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      aretailer: {
        ...formState.aretailer,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  // const handleChange1 = event => {
  //   event.persist();
  //   setFormState(formState => ({
  //     ...formState,
  //     uretailer: {
  //       ...formState.uretailer,
  //       [event.target.name]: event.target.value
  //     },
  //     touched1: {
  //       ...formState.touched1,
  //       [event.target.name]: true
  //     }
  //   }));
  // };
  const handleRetailer = event => {
    event.preventDefault();
    setFormState(formState => ({
      ...formState,
      loading: true
    }));
    HTTP.post("/retailer/create", formState.aretailer)
      .then(function (response) {
        setFormState(formState => ({
          ...formState,
          aretailer: {
            user_name: "",
            password: "",
            contact_number: "",
            role_name: "",
            email: ""
          },
          errors: {},
          touched: {},
          loading: false,
          openMsg: true,
          msg: response.message
        }));
        setTimeout(() => {
          setFormState(formState => ({
            ...formState,
            openMsg: false
          }));
        }, 5000);
      })
      .catch(function (err) {
        setFormState(formState => ({
          ...formState,
          aretailer: {
            user_name: "",
            password: "",
            role_name: "",
            contact_number: "",
            email: ""
          },
          errors: {},
          touched: {},
          loading: false,
          openMsg: true,
          msg: "Something went wrong"
        }));
        setTimeout(() => {
          setFormState(formState => ({
            ...formState,
            openMsg: false
          }));
        }, 5000);
      });
  };
  const getAllRetailer = () => {
    HTTP.get("/retailers/all").then(function (response) {
      let retailers = response.data.result;
      setFormState(formState => ({
        ...formState,
        retailers
      }));
    });
  };
  // const onRetailerChange = (event, values) => {
  //   if(values){
  //     setFormState(formState => ({
  //        ...formState,
  //        uretailer: {
  //          user_name:values.user_name,
  //          contact_number:values.contact_number
  //        }
  //     }))
  //   }
  // }
  const hasError = field => (formState.touched[field] && formState.errors[field] ? true : false);
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} xl={4} xs={12}>
          <Card className={clsx(classes.root)}>
            <form className={classes.form} onSubmit={handleRetailer}>
              <CardHeader subheader="Add Retailer" title="Retailer" />
              <Divider />
              <CardContent>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                    Age
        </InputLabel>
                  <Select
                    value={values.age}
                    onChange={handleSelectChange}
                    input={<OutlinedInput name="age" id="outlined-age-simple" />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  className={classes.textField}
                  error={hasError("user_name")}
                  fullWidth
                  autoComplete="off"
                  helperText={hasError("user_name") ? formState.errors.user_name[0] : null}
                  label="User name"
                  name="user_name"
                  onChange={handleChange}
                  type="text"
                  value={formState.aretailer.user_name || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError("email")}
                  fullWidth
                  autoComplete="off"
                  helperText={hasError("email") ? formState.errors.email[0] : null}
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.aretailer.email || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError("contact_number")}
                  fullWidth
                  autoComplete="off"
                  helperText={hasError("contact_number") ? formState.errors.contact_number[0] : null}
                  label="Mobile"
                  name="contact_number"
                  onChange={handleChange}
                  type="text"
                  value={formState.aretailer.contact_number || ""}
                  variant="outlined"
                />
                <TextField
                  select
                  fullWidth
                  label="Role name"
                  name="role_name"
                  className={classes.halftextField}
                  error={hasError("role_name")}
                  value={formState.aretailer.role_name || ""}
                  onChange={handleChange}
                  helperText={hasError("role_name") ? formState.errors.role_name[0] : null}
                  margin="normal"
                  variant="outlined"
                >
                  {formState.roles.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  className={classes.textField}
                  error={hasError("password")}
                  fullWidth
                  autoComplete="off"
                  helperText={hasError("password") ? formState.errors.password[0] : null}
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.aretailer.password || ""}
                  variant="outlined"
                />
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  size="large"
                  type="submit"
                  disabled={!formState.isValid || formState.loading}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Create Retailer
                </Button>
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
      <Snackbar open={formState.openMsg} autoHideDuration={4000} message={formState.msg} />
    </div>
  );
};
export default Retailer;
// <Grid
//      item
//      lg={6}
//      md={6}
//      xl={4}
//      xs={12}>
//      <Card
//          className={clsx(classes.root)}>
//            <form
//            className={classes.form}
//            onSubmit={handleRetailer}>
//            <CardHeader
//              subheader="Update Retailer"
//              title="Retailer"
//            />
//            <Divider />
//            <CardContent>
//              <Autocomplete
//                 options={formState.retailers}
//                 onChange={onRetailerChange}
//                 getOptionLabel={option => option.name}
//                 renderInput={params => (
//                   <TextField
//                     {...params}
//                     label="Retailer name"
//                     className={classes.textField}
//                     fullWidth
//                      name="name"
//                      variant="outlined" fullWidth />
//                 )}
//               />
//                <TextField
//                  className={classes.textField}
//                  error={hasError1('user_name')}
//                  fullWidth
//                  autoComplete="off"
//                  helperText={
//                    hasError1('user_name') ? formState.errors1.user_name[0] : null
//                  }
//                  label="User name"
//                  name="user_name"
//                  onChange={handleChange1}
//                  type="text"
//                  value={formState.uretailer.user_name || ''}
//                  variant="outlined"
//                />
//                <TextField
//                  className={classes.textField}
//                  error={hasError1('contact_number')}
//                  fullWidth
//                  autoComplete="off"
//                  helperText={
//                    hasError1('contact_number') ? formState.errors1.contact_number[0] : null
//                  }
//                  label="Mobile"
//                  name="contact_number"
//                  onChange={handleChange1}
//                  type="text"
//                  value={formState.uretailer.contact_number || ''}
//                  variant="outlined"
//                />
//                <TextField
//                 select
//                 label="Role name"
//                 name="category"
//                 className={classes.halftextField}
//                 value={formState.values.role_name || ''}
//                 onChange={handleChange}
//                 helperText={ hasError('role_name') ? formState.errors.role_name[0] : null }
//                 margin="normal"
//                 variant="outlined"
//                >
//                 {formState.roles.map(option => (
//                   <MenuItem key={option.id} value={option.id}>
//                     {option.name}
//                   </MenuItem>
//                 ))}
//                </TextField>
//                <TextField
//                  className={classes.textField}
//                  error={hasError1('password')}
//                  fullWidth
//                  autoComplete="off"
//                  helperText={
//                    hasError1('password') ? formState.errors1.password[0] : null
//                  }
//                  label="Password"
//                  name="password"
//                  onChange={handleChange1}
//                  type="password"
//                  value={formState.uretailer.password || ''}
//                  variant="outlined"
//                />
//            </CardContent>
//            <Divider />
//            <CardActions>
//              <Button
//                size="large"
//                type="submit"
//                disabled={!formState.isUValid || formState.loading}
//                variant="contained" color="primary" className={classes.button}>
//                Update Retailer
//              </Button >
//            </CardActions>
//            </form>
//      </Card>
//   </Grid>
