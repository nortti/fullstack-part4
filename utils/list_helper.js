const dummy = () => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce((bestSoFar, blog) => {
    return bestSoFar.likes > blog.likes ? bestSoFar : blog
  })
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return null

  return blogs.reduce((authorLikeCounts, blog) => {
    const authorBlogCount = authorLikeCounts.find(authorBlogCount => authorBlogCount.author === blog.author)
    if (!authorBlogCount) {
      authorLikeCounts.push({
        'author': blog.author,
        'blogs': 1
      })
    } else {
      authorBlogCount.blogs += 1
    }
    return authorLikeCounts
  }, []).reduce((bestSoFar, authorBlogCount) => {
    return bestSoFar.blogs > authorBlogCount.blogs ? bestSoFar : authorBlogCount
  })
}

const mostLikes = blogs => {
  if (blogs.length === 0) return null

  return blogs.reduce((authorLikeCounts, blog) => {
    const authorLikeCount = authorLikeCounts.find(authorLikeCount => authorLikeCount.author === blog.author)
    if (!authorLikeCount) {
      authorLikeCounts.push({
        'author': blog.author,
        'likes': blog.likes
      })
    } else {
      authorLikeCount.likes += blog.likes
    }
    return authorLikeCounts
  }, []).reduce((bestSoFar, authorLikeCount) => {
    return bestSoFar.likes > authorLikeCount.likes ? bestSoFar : authorLikeCount
  })
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
