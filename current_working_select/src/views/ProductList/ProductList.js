import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { IconButton, Grid, Fade, CircularProgress } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { HTTP } from "actions/apiConfig";
import { ProductCard } from "./components";
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  title: {
    paddingBottom: theme.spacing(2),
    fontSize: "20px",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  },
  content: {
    marginTop: theme.spacing(1)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  loadingWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "300px",
    background: "#fff"
  }
}));

const ProductList = () => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    products: [],
    page: -1,
    limit: 12,
    total: 0,
    isLoading: true
  });
  async function getProducts(isNext) {
    let page = formState.page;
    page = isNext ? page + 1 : page - 1;
    let offset = parseInt(page) * parseInt(formState.limit);
    setFormState(formState => ({
      ...formState,
      page
    }));
    let data = { offset, limit: formState.limit };
    HTTP.post("/retailer/getProduct", JSON.stringify(data)).then(res => {
      const products = res.data.products;
      const total = res.data.total;
      const isLoading = false;
      const mappedProducts =
        products &&
        products.map(item => {
          item.image = `https://useedevs3images.s3.amazonaws.com/other_products/${unescape(item.image)}`;
          return item;
        });

      setFormState(formState => ({
        ...formState,
        products: mappedProducts || [],
        isLoading,
        total
      }));
    });
  }
  useEffect(() => {
    getProducts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {formState.isLoading && (
          <div className={classes.loadingWrapper}>
            <Fade
              in={formState.isLoading}
              style={{
                transitionDelay: formState.isLoading ? "200ms" : "0ms"
              }}
              unmountOnExit
            >
              <CircularProgress />
            </Fade>
          </div>
        )}
        {!formState.isLoading && formState.products.length > 0 && (
          <div>
            <h1 className={classes.title}>Products ({formState.total})</h1>
            <Grid container spacing={4}>
              {formState.products.map((product, id) => (
                <Grid item key={product.id} lg={4} md={6} xs={12}>
                  <Link
                    to={{
                      pathname: `/product/${product.id}`
                    }}
                  >
                    <ProductCard product={product} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </div>
      <div className={classes.pagination}>
        <IconButton disabled={formState.page === 0} onClick={getProducts.bind(this, false)}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton disabled={formState.total < formState.page * formState.limit + formState.limit} onClick={getProducts.bind(this, true)}>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ProductList;
