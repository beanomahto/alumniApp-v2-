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

// const getAllPosts = async (req, res) => {
//   try {
//     const posts = await Post.find({}).populate("user", "name email"); // Populate user details
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch posts"});
//   }
// }

const getAllPosts = async (req, res) => {
  try {
    // Get page and limit from query, default to page 1, 4 posts per page
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    // Find posts, sort by createdAt ascending, paginate, and populate user info
    const posts = await Post.find({})
      .sort({ createdAt: 1 }) // Ascending order
      .skip(skip)
      .limit(limit)
      .populate("user", "name email");

    const total = await Post.countDocuments();

    res.status(200).json({
      posts,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
}


// Like a post
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Prevent duplicate likes
    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({ message: "You already liked this post" });
    }

    post.likes.push(req.user.id);
    await post.save();
    res.status(200).json({ message: "Post liked", likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: "Failed to like post" });
  }
};

// Add a comment to a post
const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = {
      user: req.user.id,
      text,
      createdAt: new Date(),
    };

    post.comments.push(comment);
    await post.save();
    res.status(201).json({ message: "Comment added", comments: post.comments });
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};


module.exports = {
  searchUsers,
  getUserProfile,
  getUserProfileById,
  createPost,
  getUserPost,
  getAllPosts,
  likePost,
  commentOnPost,
  // other functions
};