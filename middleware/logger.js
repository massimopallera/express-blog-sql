const logger =  (req,res, next) => {
  console.warn(`${req.method} request to ${req.baseUrl}. Time: [${new Date().toString()}]`);
  next()
}

module.exports = logger