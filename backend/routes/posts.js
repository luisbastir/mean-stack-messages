const express = require("express");
const multer = require("multer");
const router = express.Router();

const Post = require("../models/post");
const checkAuth = require("../middleware/check-auth");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime_type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name  = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

// Create post
router.post("/", checkAuth, multer({storage: storage}).single("image"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  post.save().then(created => {
    res.status(201).json({
      message: "Post added successfully!",
      post: {
        id: created._id,
        title: created.title,
        content: created.content,
        imagePath: created.imagePath
      }
    });
  }).catch(err => {ç
    res.status(500).json({
      message: "Creating a post failed"
    })
  });
});

// Get all posts
router.get("/", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery.then((posts) => {
    fetchedPosts = posts
    return Post.count();
  }).then(count => {
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: fetchedPosts,
      maxPosts: count
    });
  }).catch(err => {
    res.status(500).json({
      message: "Fetching posts failed!"
    })
  });
});

// Get post by id
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: "Post not found"});
    }
  }).catch(err => {
    res.status(500).json({
      message: "Fetching post failed!"
    })
  });
});

// Update post by id
router.put("/:id", checkAuth, multer({storage: storage}).single("image"), (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then((result) => {
    if (result.nModified > 0) {
      res.status(200).json({message: "Update successful!"});
    } else {
      res.status(401).json({message: "not authorized!"});
    }
  }).catch(err => {
    res.status(500).json({
      message: "Couldn't update post!"
    })
  });
});

// Delete post by id
router.delete("/:id", checkAuth, (req, res, next) => {
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then((result) => {
    if (result.n > 0) {
      res.status(200).json({message: "Deletion successful!"});
    } else {
      res.status(401).json({message: "not authorized!"});
    }
  }).catch(err => {
    res.status(500).json({
      message: "Deleting post failed!"
    })
  });
});

module.exports = router;
