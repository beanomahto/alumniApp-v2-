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
        branch: user.branch,
        jobTitle: user.jobTitle,
        company: user.company,
        location: user.location,
        bio: user.bio,
        profilePicture: user.profilePicture,
        socialLinks: user.socialLinks,
        tags: user.tags,
        batch: user.batch,
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

const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const { content, tags } = req.body;
    const post = new Post({
      user: req.user.id,
      content,
      tags,
      likes: [],
      comments: [],
      createdAt: new Date(),

    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to create post" });
  }
};

// const getUserPost = async (req, res) => {
//   const allUsers = await Post.find({});
//   console.log("All users:", allUsers); // Log all users to check if the user exists

//   try {
//     // const user = await Posts.findById(req.user.id).select("-password");
//     const user= await Post.find({ user: req.user.id });
//     if (user) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         content: user.content,
//         tags: user.tags,
//         comments: user.comments,
//         likes: user.likes,
//         createdAt: user.createdAt,
//         // Add more fields as needed
//       });
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     res.status(500).json({ message: "Server error fetching profile"});
//   }
// };

const getUserPost = async (req, res) => {
  try {
    const userPosts = await Post.find({ user: req.user.id }).populate("user", "name email");

    if (userPosts.length > 0) {
      res.json(userPosts);
    } else {
      res.status(404).json({ message: "No posts found for this user" });
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Server error fetching posts" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user", "name email"); // Populate user details
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
}
module.exports = {
  searchUsers,
  getUserProfile,
  getUserProfileById,
  createPost,
  getUserPost,
  getAllPosts,
  // other functions
};
