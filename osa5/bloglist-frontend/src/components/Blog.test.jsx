import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { describe, test, expect, vi } from 'vitest'

//mock likeBlog function from blog service
vi.mock('../services/blogs', () => ({
  default: {
    likeBlog: vi.fn()
  }
}))

describe('Blog component', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 5,
    user: { username: 'teki', name: 'Teemu' }
  }
  test('renders title and author but not url or likes', () => {


    const mockUpdate = vi.fn()
    const mockDelete = vi.fn()
    const user = userEvent.setup()

    const { container } = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdate}
        handleDelete={mockDelete}
        user={user}
      />
    )

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent( 'Test Title Test Author')
    expect(div).not.toHaveTextContent( 'http://test.com' )
    expect(div).not.toHaveTextContent('likes: 5')
  })

  test('shows url and likes when view button is clicked', async () => {

    const mockUpdate = vi.fn()
    const mockDelete = vi.fn()
    const user = userEvent.setup()

    const { container } = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdate}
        handleDelete={mockDelete}
        user={user}
      />
    )

    const button = screen.getByText('view')
    await user.click(button)

    expect(container).toHaveTextContent('http://test.com')
    expect(container).toHaveTextContent('likes: 5')
  })

  test('calls updateBlog twice when like button is clicked twice', async () => {

    const mockUpdate = vi.fn()
    const mockDelete = vi.fn()
    const user = userEvent.setup()

    render(
      <Blog
        blog={blog}
        updateBlog={mockUpdate}
        handleDelete={mockDelete}
        user={user}
      />
    )
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdate).toHaveBeenCalledTimes(2)
  })
})