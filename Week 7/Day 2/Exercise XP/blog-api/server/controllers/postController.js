const postModel = require('../models/postModel')

function parsePostId(value) {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

function isValidPost(title, content) {
  return typeof title === 'string' && Boolean(title.trim()) &&
    typeof content === 'string' && Boolean(content.trim())
}

async function getPosts(req, res, next) {
  try {
    res.status(200).json(await postModel.getAll())
  } catch (error) {
    next(error)
  }
}

async function getPost(req, res, next) {
  try {
    const id = parsePostId(req.params.id)
    const post = id ? await postModel.getById(id) : null

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}

async function createPost(req, res, next) {
  try {
    const { title, content } = req.body || {}

    if (!isValidPost(title, content)) {
      return res.status(400).json({ message: 'title and content are required' })
    }

    const post = await postModel.create({ title: title.trim(), content: content.trim() })
    res.status(201).json(post)
  } catch (error) {
    next(error)
  }
}

async function updatePost(req, res, next) {
  try {
    const id = parsePostId(req.params.id)
    const { title, content } = req.body || {}

    if (!id) {
      return res.status(404).json({ message: 'Post not found' })
    }
    if (!isValidPost(title, content)) {
      return res.status(400).json({ message: 'title and content are required' })
    }

    const post = await postModel.update(id, {
      title: title.trim(),
      content: content.trim(),
    })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}

async function deletePost(req, res, next) {
  try {
    const id = parsePostId(req.params.id)
    const deleted = id ? await postModel.delete(id) : false

    if (!deleted) {
      return res.status(404).json({ message: 'Post not found' })
    }

    res.status(200).json({ message: 'Post deleted successfully' })
  } catch (error) {
    next(error)
  }
}

module.exports = { getPosts, getPost, createPost, updatePost, deletePost }