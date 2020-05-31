const { Router } = require("express")
const router = Router()
const controllers = require("../controllers")

// home
router.get("/", (req, res) => {
  const queryTest = req.query.test
  res.send("This is root!" + (queryTest ? ` Your query was ${queryTest}` : ''))
})

// get all events 
router.get("/events", (req, res) => controllers.getLibraries)

// get one event 
router.get("/events/:id", (req, res) => controllers.getEvent)

module.exports = router