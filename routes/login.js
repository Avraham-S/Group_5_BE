const router = express.Router();
const bcrypt = require("bcrypt");
const { checkPassword } = require("../db_models");
router.post("/", checkPassword, async (req, res) => {
  const check = await bcrypt.compare(
    `${req.body.password}`,
    `${req.result.data[0].password}`
  );
  if (check) {
    res.send(true);
  } else {
    res.send(false);
  }
});
module.exports = router;
