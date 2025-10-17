import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { describe, test, expect, vi } from 'vitest'

describe('BlogForm component', () => {

  test('calls createBlog with correct details when a blog is created', async () => {
    const mockCreateBlog = vi.fn()
    const user = { id: '123', name: 'Test User', username: 'testuser' }
    const userEventSetup = userEvent.setup()

    const { container } = render(<BlogForm createBlog={mockCreateBlog} user={user} />)
    const titleInput = container.querySelector('input[name="Title"]')
    const authorInput = container.querySelector('input[name="Author"]')
    const urlInput = container.querySelector('input[name="Url"]')
    const createButton = container.querySelector('button[type="submit"]')

    await userEventSetup.type(titleInput, 'New Blog Title')
    await userEventSetup.type(authorInput, 'New Blog Author')
    await userEventSetup.type(urlInput, 'http://newblog.com')
    await userEventSetup.click(createButton)

    expect(mockCreateBlog).toHaveBeenCalledTimes(1)
    expect(mockCreateBlog).toHaveBeenCalledWith({
      user: {
        id: '123',
        name: 'Test User',
        username: 'testuser'
      },
      title: 'New Blog Title',
      author: 'New Blog Author',
      url: 'http://newblog.com',
      likes: 0,
    })
  })
})