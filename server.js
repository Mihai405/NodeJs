const express = require('express')
const app = express()
const port = 3000

const sequelize = require("./sequelize");

// Import created models
const FavouriteList = require("./models/FavouriteList");
const Video = require("./models/Video");

const { application, response } = require("express");

// Express middleware
app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(express.json());

// Define the model relationship.
FavouriteList.hasMany(Video);

// Kickstart the Express aplication
app.listen(port, async () => {
    console.log("The server is running on http://localhost:" + port);
    try {
      await sequelize.authenticate();
      console.log("Connection created!");
    } catch(error) {
      console.error("Unable to connect to the database: ", error)
    }
  });


 // Create a middleware to handle 500 status errors.
app.use((err, req, res, next) => {
    console.error("[ERROR]:" + err);
    res.status(500).json({ message: "500 - Server Error" });
  });


/**
 * Create a special GET endpoint so that when it is called it will
 * sync our database with the models.
 */
 app.get("/create", async (req, res, next) => {
    try {
      await sequelize.sync({ force: true });
      res.status(201).json({ message: "Database created with the models." });
    } catch (err) {
      next(err);
    }
  });
  

/**
 * POST a new Video to the database.
 */
 app.post("/video", async (req, res, next) => {
    try {
      await Video.create(req.body);
      res.status(201).json({ message: "Video is created!" });
    } catch (err) {
      next(err);
    }
  });

/**
 * GET all the videos from the database.
 */
 app.get("/video", async (req, res, next) => {
    try {
      const video = await Video.findAll();
      res.status(200).json(video);
    } catch (err) {
      next(err);
    }
  });


/**
 * GET a specific video
 */
 app.get("/video/:videoId", async (req, res, next) => {
    try {
      const video = await Video.findByPk(req.params.videoId);
        if (video) {
          res.status(200).json(video);
        } else {
          res.status(404).json({ message: "404 - Video Not Found!" });
        }
  
    } catch (err) {
      next(err);
    }
  });


/**
 * Update a specific video
 */
 app.put("/video/:videoId", async (req, res, next) => {
      try {
        const video = await Video.findByPk(req.params.videoId);
          if (video) {
            video.description = req.body.description
            video.title = req.body.title
            video.url = req.body.url
            await video.save()
            res.status(202).json({ message: 'Video updated!'})
          } else {
            res.status(404).json({ message: "404 - Video Not Found!" });
          }
    
      } catch (err) {
        next(err);
      }
  });


/**
 * Delete a specific video
 */
 app.delete("/video/:videoId", async (req, res, next) => {
    try {
      const video = await Video.findByPk(req.params.videoId);
        if (video) {
          await video.destroy()
          res.status(202).json({ message: 'Video deleted!'})
        } else {
          res.status(404).json({ message: "404 - Video Not Found!" });
        }
  
    } catch (err) {
      next(err);
    }
});


// Get allFavouriteList
 app.get("/list", async (req, res, next) => {
    try {
      const favouritList = await FavouriteList.findAll();
      res.status(200).json(favouritList);
    } catch (err) {
      next(err);
    }
  });
  
/**
 * POST a new FavouriteList to the database.
 */
 app.post("/list", async (req, res, next) => {
    try {
      await FavouriteList.create(req.body);
      res.status(201).json({ message: "FavouriteList is created!" });
    } catch (err) {
      next(err);
    }
  });