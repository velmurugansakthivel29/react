import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, Card, CardContent, Fade, CircularProgress, Breadcrumbs } from "@material-ui/core";
import { HTTP } from "actions/apiConfig";
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  contentWrapper: {
    padding: theme.spacing(1)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  image: {
    maxWidth: "100%"
  },
  mb20: {
    marginBottom: theme.spacing(2)
  },
  loadingWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "300px",
    background: "#fff"
  }
}));

const ProductList = ({ history }) => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    isLoading: true,
    product: {}
  });
  let { id } = useParams();
  useEffect(() => {
    HTTP.get(`/retailer/getProduct/${id}`).then(res => {
      const product = res.data.result;
      if (Object.keys(product).length > 0) {
        product.image = `https://useedevs3images.s3.amazonaws.com/other_products/${unescape(product.image)}`;
        setFormState({ product, isLoading: false });
      } else {
        setFormState({ isLoading: false });
      }
    });
  }, [id]);
  const { product, isLoading } = formState;
  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="textSecondary" to="/product">
          Product
        </Link>
        {product && <Typography color="textPrimary">{product.product_name}</Typography>}
      </Breadcrumbs>
      <div className={classes.content}>
        <Card className={classes.contentWrapper}>
          <CardContent>
            {isLoading && (
              <div className={classes.loadingWrapper}>
                <Fade
                  in={isLoading}
                  style={{
                    transitionDelay: isLoading ? "200ms" : "0ms"
                  }}
                  unmountOnExit
                >
                  <CircularProgress />
                </Fade>
              </div>
            )}
            {!isLoading && product && Object.keys(product).length > 0 && (
              <Grid container spacing={4}>
                <Grid item md={4} xs={12}>
                  <img alt="Product" className={classes.image} src={product.image} />
                </Grid>
                <Grid item md={8} xs={12}>
                  <Grid className={classes.mb20} item xs={12}>
                    <Typography variant="subtitle2">Product Name</Typography>
                    <Typography variant="body1">{product.product_name}</Typography>
                  </Grid>
                  <Grid className={classes.mb20} item xs={12}>
                    <Typography variant="subtitle2">Description</Typography>
                    <Typography variant="body1">{product.description}</Typography>
                  </Grid>
                  <Grid className={classes.mb20} item xs={12}>
                    <Typography variant="subtitle2">Specification</Typography>
                    <Typography variant="body1">{product.specification}</Typography>
                  </Grid>
                  <Grid container spacing={4}>
                      <Grid item md={3} xs={3}>
                        <Typography variant="subtitle2">Product code</Typography>
                            <Typography variant="body1">
                              {product.product_code}
                            </Typography>
                      </Grid>
                      <Grid item md={3} xs={6}>
                        <Typography variant="subtitle2">Product Weight(kgs)</Typography>
                            <Typography variant="body1">
                              {product.product_weight}
                            </Typography>
                      </Grid>
                      <Grid item md={3} xs={6}>
                        <Typography variant="subtitle2">Actual price</Typography>
                            <Typography variant="body1">
                              {product.actual_price}
                            </Typography>
                      </Grid>
                      <Grid item md={3} xs={6}>
                        <Typography variant="subtitle2">Discounted price</Typography>
                            <Typography variant="body1">
                              {product.discounted_price}
                            </Typography>
                      </Grid>
                      <Grid className={classes.mb20} item md={3} xs={6}>
                        <Typography variant="subtitle2">Category</Typography>
                            <Typography variant="body1">
                              {product.category_name}
                            </Typography>
                      </Grid>
                      <Grid className={classes.mb20} item md={3} xs={6}>
                        <Typography variant="subtitle2">Total In-Stock</Typography>
                            <Typography variant="body1">
                              {product.total}
                            </Typography>
                      </Grid>
                      <Grid className={classes.mb20} item md={3} xs={6}>
                        <Typography variant="subtitle2">Status</Typography>
                            <Typography variant="body1">
                              {product.is_active}
                            </Typography>
                      </Grid>
                  </Grid>
                  {product.combinations &&
                    product.combinations.map((item, index) => (
                    <Grid container spacing={4}  key={index}>
                        <Grid className={classes.mb20} item md={3} xs={12} >
                          <Typography variant="subtitle2">Size</Typography>
                            <Typography variant="body1">
                              {item.size_name}
                            </Typography>

                        </Grid>
                        <Grid className={classes.mb20} item md={3} xs={12}>
                          <Typography variant="subtitle2">Color</Typography>
                              <Typography key={index} variant="body1">
                                {item.color_name}
                              </Typography>
                        </Grid>
                        <Grid className={classes.mb20} item md={3} xs={12}>
                          <Typography variant="subtitle2">Product in stock</Typography>
                              <Typography key={index} variant="body1">
                                {item.count}
                              </Typography>
                        </Grid>
                     </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
            {!isLoading && !product && (
              <Typography align="center" variant="h4">
                No data to display for this product
              </Typography>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductList;
