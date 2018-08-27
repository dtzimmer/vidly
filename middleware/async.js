module.exports = function asyncMiddleware(handler) { //Call the asyncMiddleware, pass a original route handler reference (handler),
  return async (req, res, next) => {  //return a standard express route handler, its an async function with 3 params
    try {                            //move the try catch block to a single place, so code in route handlers is more focused
      await handler(req, res); //we call the handler.
    }
    catch (ex) {
      next(ex);
    }
  };
}