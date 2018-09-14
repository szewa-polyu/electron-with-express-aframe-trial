const express = require("express"),
  router = express.Router();

//GET home page.
router.get("/", function(req, res) {
  res.render("index", { title: "Express" });
});

router.get("/pageTwo", function(req, res) {
  res.render("pageTwo", { title: "Page 2" });
});

router.get("/pageThree", function(req, res) {
  res.render("pageThree", { title: "Page 3" });
});

router.get("/pageFour", function(req, res) {
  res.render("pageFour", { title: "Page 4" });
});

// Serve static files from the AFrame folder
router.get("/aframe/:resource", (req, res) => {
  const resource = req.params.resource;
  const options = {
    root: __dirname + "/progressive-texture-trial/",
  };
  res.sendFile(resource, options);

  console.log(resource, options);  
});

module.exports = router;
