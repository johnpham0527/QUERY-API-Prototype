const { Router } = require("express")
const router = Router()
const controllers = require("../controllers")

// home
router.get("/", (req, res) => {
  const queryTest = req.query.test
  res.send("This is root!" + (queryTest ? ` Your query was ${queryTest}` : ''))
})

// get all libraries 
router.get("/libraries", (req, res) => controllers.getLibraries(req, res))

// get all presenters 
router.get("/presenters", (req, res) => controllers.getPresenters(req, res))

// get all programs based on library name 
// can do case insensitive and spaces replaced by dashes or underscores 
// can take limit as a query "/libraries/name/:libraryName?limit=2"
router.get("/libraries/name/:libraryName", (req, res) => controllers.getLibraryPrograms(req, res))

// get all programs based on library id 
// can take limit as a query "/libraries/name/:libraryName?limit=2"
router.get("/libraries/id/:libraryId", (req, res) => controllers.getLibraryProgramsId(req, res))

// post a new program 
router.post("/libraries/new", (req, res) => controllers.postProgram(req, res))

module.exports = router