const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    //Find blog with most likes
    const blogWithMostLikes = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog, blogs[0])
    
    //Return the most liked blog
    return {
        title: blogWithMostLikes.title,
        author: blogWithMostLikes.author,
        likes: blogWithMostLikes.likes
    }
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }