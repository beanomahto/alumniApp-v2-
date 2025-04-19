const User = require("../models/User");

const searchUsers = async (req, res) => {
  try {
    const {
      name,
      batch,
      branch,
      jobTitle,
      location,
      tags,
      sortBy,
      sortOrder = "asc",
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    if (batch) {
      filter.batch = batch;
    }
    if (branch) {
      filter.branch = branch;
    }
    if (jobTitle) {
      filter.jobTitle = { $regex: jobTitle, $options: "i" };
    }
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }
    if (tags) {
      const tagsArray = tags.split(",").map((tag) => tag.trim());
      filter.tags = { $in: tagsArray };
    }

    const sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    console.log("FILTER BEING USED:", filter);

    const users = await User.find(filter)
      .select("-password")
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    res.status(200).json({
      users,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserProfile = async (req, res) => {
  const allUsers = await User.find({});
  console.log("All users:", allUsers); // Log all users to check if the user exists

  try {
    const user = await User.findById(req.user.id).select("-password");
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        // Add more fields as needed
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error fetching profile" });
  }
};

const getUserProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    console.log(id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        // Add more fields as needed
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error fetching profile" });
  }
};

// const Post = require("../models/Post");

// const createPost = async (req, res) => {
//   try {
//     const { content, tags } = req.body;
//     const post = new Post({
//       user: req.user.id,
//       content,
//       tags,
//     });
//     await post.save();
//     res.status(201).json(post);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to create post" });
//   }
// };

// const getUserPost = async (req, res) => {
//   const allUsers = await Post.find({});
//   console.log("All users:", allUsers); // Log all users to check if the user exists

//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     if (user) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         // Add more fields as needed
//       });
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     res.status(500).json({ message: "Server error fetching profile" });
//   }
// };

module.exports = {
  searchUsers,
  getUserProfile,
  getUserProfileById,
  // createPost,
  // other functions
};
