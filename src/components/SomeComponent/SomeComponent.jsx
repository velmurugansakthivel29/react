import React from 'react';
import { connect } from 'react-redux';

const SomeComponent = (props) => {
  const { userName } = props;
  return (
    <div>
      Component 1 <br />
      Hi {userName}
    </div>
  );
}

const mapStateToProps = state => ({
  userName: state.authenticatedState.userName
});


export default connect(mapStateToProps)(SomeComponent);
