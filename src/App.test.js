import React from 'react'
import {
	render, waitForElement, cleanup
} from '@testing-library/react'
jest.mock('./services/blogs')
import '@testing-library/jest-dom/extend-expect'
import App from './App'

describe('<App />', () => {

	afterEach(cleanup)

	test('if no user logged, blogs are not rendered', async () => {
		const component = render(
			<App />
		)
		component.rerender(<App />)

		await waitForElement(
			() => component.getByText('login')
		)

		expect(component.container).not.toHaveTextContent('test title')
	})

	test('when logged blogs rendered', async () => {
		const user = {
			username: 'tester',
			token: '1231231214',
			name: 'Donald Tester'
		}

		localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

		const component = render(
			<App />
		)
		component.rerender(<App />)

		await waitForElement(() => component.container.querySelector('.bloglist'))

		expect(component.container).toHaveTextContent('test title')
	})
})