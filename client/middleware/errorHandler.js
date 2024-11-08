export function errorHandler(error, req, res, next) {
    console.error(error);
  
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation Error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
  
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Duplicate field value entered'
      });
    }
  
    return res.status(500).json({
      message: 'Internal server error'
    });
  }