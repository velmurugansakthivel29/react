import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, CardActions, Typography, Grid, Divider } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import moment from "moment";
const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: "0 auto",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "5px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: "100%"
  },
  statsItem: {
    display: "flex",
    alignItems: "center"
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  strike: {
    textDecoration: "line-through",
    color: "red",
    display: "inline-flex",
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  productName:{
    width:'100%',
    whiteSpace:'nowrap',
    overflow:'hidden',
    textOverflow:'ellipsis'
  }
}));

const ProductCard = props => {
  const { className, product, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.imageContainer}>
          <img alt="Product" className={classes.image} src={product.image} />
        </div>
        <Typography align="center" gutterBottom variant="h4" className={classes.productName}>
          {product.product_name}
        </Typography>
        <Typography align="center" variant="body1">
          {product.description}
        </Typography>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <Typography display="inline" variant="body2">
              <b>{product.product_code}</b>
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
            <Typography display="inline" variant="body2">
              Price:
              <b>
                <span className={classes.strike}>{product.actual_price}</span>
              </b>
              <b>
                <span>{product.discounted_price}</span>
              </b>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">
              {moment(product.DtCreated).format("DD/MM/YYYY")}
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
            <Typography display="inline" variant="body2">
              <b>{product.is_active === "Y" ? "Active" : "Inactive"}</b>
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;
