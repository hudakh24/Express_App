const responseHandler = (data, res) => {
  try {
    if (data.error) {
      return res.send({
        error: data.error,
      });
    }
    return res.send({
      response: data.response,
    });
  } catch (error) {
    console.error(error);
    return res.send({
      error: error,
    });
  }
};

module.exports = responseHandler;
