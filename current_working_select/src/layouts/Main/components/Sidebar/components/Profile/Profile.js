import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import PersonIcon from "@material-ui/icons/Person";
import { Avatar, Typography } from "@material-ui/core";
import { HTTP } from "actions/apiConfig";
import { setUserDetails } from "../../../../../../actions";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content"
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, setUserDetails, ...rest } = props;

  const classes = useStyles();
  const [user, setUser] = useState({
    name: "",
    avatar: "/images/avatars/avatar_11.png",
    contact_number: ""
  });

  useEffect(() => {
    HTTP.get("/retailer")
      .then(res => {
        let data = res.data.result;
        setUser(user => ({
          ...user,
          name: data.name,
          contact_number: data.contact_number
        }));
        setUserDetails(data);
      })
      .catch(err => {
        // console.log(err);
      });
  }, [setUserDetails]);
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar alt="Person" className={classes.avatar} component={RouterLink} to="/account">
        <PersonIcon />
      </Avatar>
      <Typography className={classes.name} variant="h4">
        {user.name}
      </Typography>
      <Typography variant="body2">{user.contact_number}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  setUserDetails: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  setUserDetails: payload => dispatch(setUserDetails(payload))
});

export default connect(null, mapDispatchToProps)(Profile);
