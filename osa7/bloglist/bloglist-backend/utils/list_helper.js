const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const blogWithMostLikes = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog, blogs[0])
    
    return {
        title: blogWithMostLikes.title,
        author: blogWithMostLikes.author,
        likes: blogWithMostLikes.likes
    }
}

const mostBlogs = (blogs) => {
  // Count blogs for each author
  const authorBlogCount = blogs.reduce((count, blog) => {
    count[blog.author] = (count[blog.author] || 0) + 1
    return count
  }, {})

  // Find author with most blogs
  const authorWithMostBlogs = Object.keys(authorBlogCount).reduce((max, author) => authorBlogCount[max] > authorBlogCount[author] ? max : author, Object.keys(authorBlogCount)[0])

  // Return author with most blogs and the number of blogs
  return {
    author: authorWithMostBlogs,
    blogs: authorBlogCount[authorWithMostBlogs]
  }   
}

const mostLikes = (blogs) => {
  // Count likes for each author
  const authorLikeCount = blogs.reduce((count, blog) => {
    count[blog.author] = (count[blog.author] || 0) + blog.likes
    return count
  }, {})

  // Find author with most likes
  const authorWithMostLikes = Object.keys(authorLikeCount).reduce((max, author) => authorLikeCount[max] > authorLikeCount[author] ? max : author, Object.keys(authorLikeCount)[0])

  // Return author with most likes and the number of likes
  return {
    author: authorWithMostLikes,
    likes: authorLikeCount[authorWithMostLikes]
  }
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }