import React from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Divider, Drawer } from "@material-ui/core";
// import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

import { Profile, SidebarNav } from "./components";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)"
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, userReducer, className, dispatch, ...rest } = props;
  let role_name = "";
  if (Object.keys(userReducer).length > 0) {
    const { userDetails } = userReducer;
    ({ role_name } = userDetails);
  }

  const classes = useStyles();

  const pages = [
    {
      title: "Products",
      href: "/product",
      icon: <ShoppingBasketIcon />
    },
    {
      title: "Add Product",
      href: "/addproduct",
      icon: <LibraryAddIcon />
    },
    ...(role_name !== "" && role_name === "retailer"
      ? [
          {
            title: "Retailer",
            href: "/retailer",
            icon: <ListAltIcon />
          }
        ]
      : []),
    {
      title: "Account",
      href: "/account",
      icon: <AccountBoxIcon />
    }
  ];

  return (
    <Drawer anchor="left" classes={{ paper: classes.drawer }} onClose={onClose} open={open} variant={variant}>
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  userReducer: PropTypes.object
};

const mapStateToProps = state => ({
  userReducer: state.users
});

export default connect(mapStateToProps)(Sidebar);

// {
//   title: 'Dashboard',
//   href: '/dashboard',
//   icon: <DashboardIcon />
// },
