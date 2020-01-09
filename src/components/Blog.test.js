import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
	let component

	beforeEach(() => {

		const blog = {
			title: 'test title',
			author: 'test author',
			url: 'test url',
			likes: '10',
			user: {
				name: 'test name',
				username: 'test user'
			}
		}

		const user = {
			name: 'test name',
			username: 'test user'
		}

		component = render(
			<Blog blog={blog} user={user}/>
		)
	})

	test('renders title and author', () => {
		expect(component.container).toHaveTextContent(
			'test title'
		)
		expect(component.container).toHaveTextContent(
			'test author')
	})

	test('at start the children are not displayed', () => {
		const collapsed = component.container.querySelector('.collapsedBlog')
		expect(collapsed).toHaveClass('collapsedBlog')
	})

	test('after clicking the button, children are displayed', () => {
		const button = component.container.querySelector('.blogTitle')
		fireEvent.click(button)

		component.container.querySelector('.expandedBlog')
	})

})