const asyncHandler = (handler) => {
return (req, res , next) => {
    Promise.resolve(handler(req ,res, next)).reject((error) =>  next(error))
}
}

export default asyncHandler