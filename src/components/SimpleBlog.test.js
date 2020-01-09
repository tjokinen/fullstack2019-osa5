import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders title, author and likes', () => {
	const blog = {
		title: 'test title',
		author: 'test author',
		likes: '10'
	}

	const component = render(
		<SimpleBlog blog={blog}/>
	)

	expect(component.container).toHaveTextContent(
		'test title'
	)
	expect(component.container).toHaveTextContent(
		'test author'
	)
	expect(component.container).toHaveTextContent(
		'10 likes'
	)
})


test('clicking the button twice calls event handler twice', async () => {
	const blog = {
		title: 'test title',
		author: 'test author',
		likes: '10'
	  }
  
	const mockHandler = jest.fn()
  
	const { getByText } = render(
	  <SimpleBlog blog={blog} onClick={mockHandler} />
	)
  
	const button = getByText('like')
	fireEvent.click(button)
	fireEvent.click(button)

	expect(mockHandler.mock.calls.length).toBe(2)
})