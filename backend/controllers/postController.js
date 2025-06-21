import Post from '../models/Post.js';
import User from '../models/User.js';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
  try {
    const { category, search, status = 'approved' } = req.query;
    let query = { status };

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search by title or content
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const posts = await Post.find(query)
      .populate('author', 'name')
      .populate('likes', 'name')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name')
      .populate('likes', 'name')
      .populate('comments.author', 'name');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const { title, content, category, image, tags } = req.body;

    const post = new Post({
      title,
      content,
      category,
      image,
      tags,
      author: req.user.userId,
      status: req.user.role === 'admin' ? 'approved' : 'pending'
    });

    await post.save();

    const populatedPost = await Post.findById(post._id)
      .populate('author', 'name');

    res.status(201).json({
      message: 'Post created successfully',
      post: populatedPost
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is author or admin
    if (post.author.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('author', 'name');

    res.json({
      message: 'Post updated successfully',
      post: updatedPost
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is author or admin
    if (post.author.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Like/Unlike post
// @route   POST /api/posts/:id/like
// @access  Private
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const likeIndex = post.likes.indexOf(req.user.userId);
    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1);
    } else {
      // Like
      post.likes.push(req.user.userId);
    }

    await post.save();

    const updatedPost = await Post.findById(req.params.id)
      .populate('author', 'name')
      .populate('likes', 'name');

    res.json({
      message: likeIndex > -1 ? 'Post unliked' : 'Post liked',
      post: updatedPost
    });
  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add comment
// @route   POST /api/posts/:id/comments
// @access  Private
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({
      content,
      author: req.user.userId
    });

    await post.save();

    const updatedPost = await Post.findById(req.params.id)
      .populate('author', 'name')
      .populate('likes', 'name')
      .populate('comments.author', 'name');

    res.json({
      message: 'Comment added successfully',
      post: updatedPost
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete comment
// @route   DELETE /api/posts/:id/comments/:commentId
// @access  Private
export const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const post = await Post.findById(id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user is comment author or admin
    if (comment.author.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    comment.deleteOne();
    await post.save();

    const updatedPost = await Post.findById(id)
      .populate('author', 'name')
      .populate('likes', 'name')
      .populate('comments.author', 'name');

    res.json({
      message: 'Comment deleted successfully',
      post: updatedPost
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Moderate post (Admin/Moderator only)
// @route   PUT /api/posts/:id/moderate
// @access  Private/Admin
export const moderatePost = async (req, res) => {
  try {
    const { status, reason } = req.body;
    const { id } = req.params;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const post = await Post.findByIdAndUpdate(
      id,
      { 
        status,
        moderationReason: reason,
        moderatedBy: req.user.userId,
        moderatedAt: new Date()
      },
      { new: true }
    ).populate('author', 'name');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({
      message: 'Post moderated successfully',
      post
    });
  } catch (error) {
    console.error('Moderate post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get pending posts (Admin/Moderator only)
// @route   GET /api/posts/pending
// @access  Private/Admin
export const getPendingPosts = async (req, res) => {
  try {
    const posts = await Post.find({ status: 'pending' })
      .populate('author', 'name')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error('Get pending posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 