import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import validate from "validate.js";
import clsx from "clsx";
import { Grid, TextField, Button, Card, IconButton, CardHeader, Divider, CardContent, CardActions, MenuItem } from "@material-ui/core";
import { HTTP } from "actions/apiConfig";
import Snackbar from '@material-ui/core/Snackbar';
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
const schema = {
  product_name: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 6,
      maximum: 120
    }
  },
  description: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 10,
      maximum: 1200
    }
  },
  // color: {
  //   presence: { allowEmpty: false, message: "cannot be selected twice" },
  //   length: {
  //     minimum: 100,
  //     maximum: 300
  //   }
  // },
  specification: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 10,
      maximum: 1200
    }
  },
  product_code: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 25
    }
  },
  product_weight: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 4
    }
  },
  actual_price: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 10
    }
  },
  discounted_price: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 10
    }
  },
  // count: {
  //   presence: { allowEmpty: false, message: "is required" },
  //   length: {
  //     minimum: 1,
  //     maximum: 10
  //   }
  // },
  // category: {
  //   presence: { allowEmpty: false, message: "is required" }
  // },
  file: {
    presence: { allowEmpty: false, message: "is required" }
  }
  // fileName: {
  //   presence: { allowEmpty: false, message: "is required" }
  // }
};
const color_schema = {
  color_name: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 2,
      maximum: 15
    }
  }
}
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  imgName:{
      fontSize:12,
      marginLeft:10,
      color:'red'
  },
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  halftextField: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "calc(20% - 8px)"
  },
  mr1:{
      marginRight: theme.spacing(1)
  },
  autoComplete: {
    margin: theme.spacing(1),
    marginLeft: 0,
    width: "calc(20% - 8px)",
    display: "inline-flex",
    flexDirection: "column",
    verticalAlign: "top"
  },
  btnWrapper: {
    display: "inline-flex",
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  fileName: {
    margin: theme.spacing(1),
    display: "inline-flex"
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
const AddProduct = props => {
  const { history } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [snackOpen,setSnackOpen] = React.useState(false);
  const [formState, setFormState] = useState({
    isValid: false,
    isColorValid:false,
    message:"",
    values: {
      file: null,
      discounted_price: 0,
      actual_price: 0,
      description: "",
      category: "",
      combinations: [
        {
          size: "",
          color: "",
          count: 0
        }
      ]
    },
    loading: false,
    addColorLoading: false,
    sizes: [],
    categories: [],
    colors: [],
    color:{
      color_name:"",
    },
    errors_color:{},
    touched_color:{},
    touched: {},
    errors: {},
    sameColorError: false
  });
 const handleClose = () => {
   setOpen(false);
 };
 const handleSnackClose = (event) => {
    setSnackOpen(false);
 };
 const addColor = () => {
   setOpen(true);
 };
 const saveColor = (event) => {
   event.preventDefault();
   const values = formState.color;
   setFormState(formState => ({
     ...formState,
     addColorLoading: true
   }));
   HTTP.post("/retailer/colors/add", values)
     .then(res => {
       const color = {
         color_name:res.data.result.color_name,
         id:res.data.result.id
       };
       setFormState(formState => ({
         ...formState,
         color:{
           color_name:''
         },
         colors:[
           ...formState.colors,
          color
         ],
         message:"Color name is added sucessfully",
         addColorLoading: false,
         errors_color:{},
         touched_color:{}
       }));
       setOpen(false);
       setSnackOpen(true);
     })
     .catch(err => {
       setFormState(formState => ({
         ...formState,
         color:{
            color_name:''
         },
         message:"Color name is exists",
         addColorLoading: false,
         errors_color:{},
         touched_color:{}
       }));
       setOpen(false);
       setSnackOpen(true);
     });
 };
 const handleMaxWidthChange = event => {
   setMaxWidth(event.target.value);
 };
 const handleFullWidthChange = event => {
   setFullWidth(event.target.checked);
 };
  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);
  useEffect(() => {
    const errors = validate(formState.color, color_schema);
    setFormState(formState => ({
      ...formState,
      isColorValid: errors ? false : true,
      errors_color: errors || {}
    }));
  }, [formState.color]);
  useEffect(() => {
    getSizes();
    getCategories();
    getColors();
  }, []);
  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  const handleColorChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      color:{
        ...formState.color,
        [event.target.name]: event.target.value
      },
      touched_color: {
        ...formState.touched_color,
        [event.target.name]: true
      }
    }));
  };
  const handleCombination = (index, id, event) => {
    var values = formState.values;
    var combinations = values.combinations;
    const { value } = event.target;
    let notPresent = true;
    if (id === "color") notPresent = !combinations.some(item => item.color !== "" && item.color === value);
    if (notPresent || value === "") {
      combinations[index][id] = value;
      setFormState(formState => ({
        ...formState,
        values: values,
        touched: {
          ...formState.touched,
          [id]: true
        },
        sameColorError: id === "color" ? false : null
      }));
    } else {
      setFormState(formState => ({
        ...formState,
        touched: {
          ...formState.touched,
          [id]: false
        },
        sameColorError: id === "color" ? true : false
      }));
    }
  };
  const addMore = event => {
    let values = formState.values;
    let conmbination = {
      size: "",
      color: "",
      count: 0
    };
    values.combinations.push(conmbination);
    setFormState(formState => ({
      ...formState,
      values: values
    }));
  };
  const cancelCombination = (index, event) => {
    let values = formState.values;
    values.combinations.splice(index, 1);
    setFormState(formState => ({
      ...formState,
      values: values
    }));
  };
  const handleCapture = event => {
    event.persist();
    if (event && event.target.files.length) {
      setFormState(formState => ({
        ...formState,
        values:{
            ...formState.values,
            [event.target.name]:event.target.files[0]
        },
        touched: {
          ...formState.touched,
          [event.target.name]: true
        }
      }));
    }
  };
  const createProduct = event => {
    event.preventDefault();
    const values = formState.values;
    const data = new FormData();
    const obj = {
      product_name: values.product_name,
      description: values.description,
      specification: values.specification,
      product_code: values.product_code,
      fk_category_id: values.category,
      actual_price: values.actual_price,
      discounted_price: values.discounted_price,
      product_combinations: values.combinations,
      product_weight: values.product_weight
    };
    setFormState(formState => ({
      ...formState,
      loading: true
    }));
    data.append("file", values.file, values.file.name);
    HTTP.post("/retailer/upload", data)
      .then(res => {
        obj.image = unescape(res.data.result);
        HTTP.post("/retailer/addProduct", obj)
          .then(res => {
            // let data1 = res.data.result;
            history.push("/product");
            setFormState(formState => ({
              ...formState,
              loading: false
            }));
          })
          .catch(err => {
            setFormState(formState => ({
              ...formState,
              loading: false
            }));
          });
      })
      .catch(err => {
        setFormState(formState => ({
          ...formState,
          loading: false
        }));
      });
  };
  async function getSizes() {
    HTTP.get("/retailer/sizes")
      .then(res => {
        let data = res.data.result;
        setFormState(formState => ({
          ...formState,
          sizes: data
        }));
      })
      .catch(err => {
        // console.log(err);
      });
  }
  async function getCategories() {
    HTTP.get("/retailer/categories")
      .then(res => {
        let data = res.data.result;
        setFormState(formState => ({
          ...formState,
          categories: data
        }));
      })
      .catch(err => {
        // console.log(err);
      });
  }
  async function getColors() {
    HTTP.get("/retailer/colors")
      .then(res => {
        let data = res.data.result;
        setFormState(formState => ({
          ...formState,
          colors: data
        }));
      })
      .catch(err => {
        // console.log(err);
      });
  }
  const hasError = field => (formState.touched[field] && formState.errors[field] ? true : false);
  const hasColorError = field => (formState.touched_color[field] && formState.errors_color[field] ? true : false);
  return (
    <div className={classes.root}>
      <Grid item>
        <Card className={clsx(classes.root)}>
          <form className={classes.form} onSubmit={createProduct}>
            <CardHeader subheader="Add Product" title="Product" />
            <Divider />
            <CardContent>
              <TextField
                className={classes.textField}
                error={hasError("product_name")}
                fullWidth
                autoComplete="off"
                helperText={hasError("product_name") ? formState.errors.product_name[0] : null}
                label="Product Name"
                name="product_name"
                onChange={handleChange}
                type="text"
                value={formState.values.product_name || ""}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                error={hasError("description")}
                fullWidth
                autoComplete="off"
                multiline
                rows="10"
                helperText={hasError("description") ? formState.errors.description[0] : null}
                label="Description"
                name="description"
                onChange={handleChange}
                type="text"
                value={formState.values.description || ""}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                error={hasError("specification")}
                fullWidth
                autoComplete="off"
                multiline
                rows="10"
                helperText={hasError("specification") ? formState.errors.specification[0] : null}
                label="Specification"
                name="specification"
                onChange={handleChange}
                type="text"
                value={formState.values.specification || ""}
                variant="outlined"
              />
              <TextField
                 className={classes.halftextField}
                 error={hasError('product_code')}
                 autoComplete="off"
                 helperText={
                  hasError('product_code') ? formState.errors.product_code[0] : null
                }
                label="Product Code"
                 name="product_code"
                 onChange={handleChange}
                 type="text"
                 value={formState.values.product_code || ''}
                 variant="outlined"
               />
               <TextField
                  className={classes.halftextField}
                   error={hasError('product_weight')}
                   autoComplete="off"
                   helperText={
                     hasError('product_weight') ? formState.errors.product_weight[0] : null
                   }
                   label="Product Weight (Kgs)"
                   name="product_weight"
                   onChange={handleChange}
                   type="number"
                   value={formState.values.product_weight  || ''}
                   variant="outlined"
                 />
                 <TextField
                    className={classes.halftextField}
                     error={hasError('actual_price')}
                     autoComplete="off"
                     helperText={
                       hasError('actual_price') ? formState.errors.actual_price[0] : null
                     }
                     label="Actual Price"
                     name="actual_price"
                     onChange={handleChange}
                     type="number"
                     value={formState.values.actual_price  || ''}
                     variant="outlined"
                 />
                 <TextField
                  className={classes.halftextField}
                   error={hasError('discounted_price')}
                   autoComplete="off"
                   helperText={
                     hasError('discounted_price') ? formState.errors.discounted_price[0] : null
                   }
                   label="Discounted Price"
                   name="discounted_price"
                   onChange={handleChange}
                   type="text"
                   value={formState.values.discounted_price  || ''}
                   variant="outlined"
               />
              <TextField
                 select
                 label="Category"
                 name="category"
                 className={classes.halftextField}
                 value={formState.values.category || ''}
                 onChange={handleChange}
                 helperText={ hasError('category') ? formState.errors.category[0] : null }
                 margin="normal"
                 variant="outlined"
                >
                 {formState.categories.map(option => (
                   <MenuItem key={option.id} value={option.id}>
                     {option.category_name}
                   </MenuItem>
                 ))}
                </TextField>
              <div className={classes.textField}>
                <Button variant="contained" component="label" color="primary" onChange={handleCapture}>
                  Upload Pic
                  <input type="file" name="file" accept="image/png,image/jpeg" style={{ display: "none" }} />
                </Button>
                {formState.values.file != null && <span className={classes.fileName}>{formState.values.file.name}</span>}
                <span className={classes.imgName}>Only png, jpg is allowed</span>
              </div>
              {formState.values.combinations.map((combination, index) => (
                <div key={index}>
                  <TextField
                    select
                    label="Size"
                    className={classes.halftextField}
                    value={combination.size || ""}
                    onChange={handleCombination.bind(this, index, "size")}
                    helperText={hasError("size") ? formState.errors.size[0] : null}
                    margin="normal"
                    variant="outlined"
                  >
                    {formState.sizes.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.size_name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Color"
                    className={classes.halftextField}
                    value={combination.color || ""}
                    onChange={handleCombination.bind(this, index, "color")}
                    helperText={formState.sameColorError ? "Same color cannot be selected twice." : null}
                    error={formState.sameColorError ? true : undefined}
                    margin="normal"
                    variant="outlined"
                  >
                    {formState.colors.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.color_name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label="Count"
                    className={classes.halftextField}
                    value={combination.count || ""}
                    onChange={handleCombination.bind(this, index, "count")}
                    helperText={hasError("count") ? formState.errors.count[0] : null}
                    margin="normal"
                    variant="outlined"
                  ></TextField>
                  <div className={classes.btnWrapper}>
                    <IconButton
                      variant="contained"
                      color="secondary"
                      aria-label="delete"
                      className={classes.margin}
                      onClick={cancelCombination.bind(this, index)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              ))}
              <div className={classes.btnWrapper}>
                <Button variant="contained" color="primary" disabled={formState.loading}
                  onClick={addMore.bind(this)} className={classes.mr1}>
                  Add more Combination
                </Button>
                <Button variant="contained" color="primary" disabled={formState.loading} onClick={addColor.bind(this)}>
                  Add Color
                </Button>
              </div>
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
                Create Product
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
      <Dialog
       fullWidth={fullWidth}
       maxWidth={maxWidth}
       open={open}
       onClose={handleClose}
       aria-labelledby="color-dialog"
     >
       <DialogTitle id="color-dialog">Add Color</DialogTitle>
       <DialogContent>
         <form className={classes.form} noValidate>
             <TextField
                 error={hasColorError('color_name')}
                 autoComplete="off"
                 helperText={
                   hasColorError('color_name') ? formState.errors_color.color_name[0] : null
                 }
                 fullWidth
                 label="Color name"
                 name="color_name"
                 onChange={handleColorChange}
                 type="text"
                 value={formState.color.color_name  || ''}
                 variant="outlined"
              />
         </form>
       </DialogContent>
       <DialogActions>
         <Button onClick={saveColor} color="primary" disabled={!formState.isColorValid || formState.addColorLoading}>
           Add
         </Button>
         <Button onClick={handleClose} color="primary">
           Close
         </Button>
       </DialogActions>
     </Dialog>
     <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        message={formState.message}
      />
    </div>
  );
};
export default AddProduct;
