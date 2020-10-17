import React from 'react';
import '../index.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Message = ({ message }) => (
  <div className="info-message self-center">
    {message}
  </div>
);

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  message: state.message,
});

export default connect(mapStateToProps)(Message);
