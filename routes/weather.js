let express = require("express");
let router = express.Router();
let axios = require("axios");
router.route("/:cityName").get((req, res, next) => {
  const fetchData = async () => {
    const result = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&appid=6ca067ea444823b74226618d63afc0f5`
    );

    res.send(result);
    next();
  };
  fetchData();
});
module.exports = router;
