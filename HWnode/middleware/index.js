const middleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (!error) {
      next();
    } else {
      const { details, message } = error;
      console.log('error', details);
      return res.status(422).json({ error: message });
    }
  };
};
module.exports = middleware;
