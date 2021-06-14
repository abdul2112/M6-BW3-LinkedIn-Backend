export const badRequestErrorHandler = (err, req, res, next) => {
  if (err.status === 400 || err.name === 'ValidationError') {
    res.status(400).send(err.errors);
  } else {
    next(err);
  }
};

export const notFoundErrorHandler = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send(err.message || 'Error not found!');
  } else {
    next(err); // I need to pass the error to the next error middleware
  }
};

export const catchAllErrorHandler = (err, req, res, next) => {
  // if (err.name === 'ValidationError') {
  // res.status(400).send(err);
  // } else {
  res.status(500).send('Generic Server Error');
  // }
};
