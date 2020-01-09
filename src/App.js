import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import PropTypes from 'prop-types'
import { useField } from './hooks'

function App() {
	const [blogFormVisible, setBlogFormVisible] = useState(false)
	const [blogs, setBlogs] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [user, setUser] = useState(null)

	const username = useField('text')
	const password = useField('password')

	const newBlog = useField('text')
	const newBlogAuthor = useField('text')
	const newBlogUrl = useField('text')

	useEffect(() => {
		blogService
			.getAll()
			.then(initialBlogs => setBlogs(initialBlogs))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	Blog.propTypes = {
		blog: PropTypes.object.isRequired
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username: username.form.value, password: password.form.value
			})

			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
		} catch (exception) {
			setErrorMessage('wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const handleLogOut = (event) => {
		event.preventDefault()
		window.localStorage.clear()
		setUser(null)
	}

	const addBlog = (event) => {
		event.preventDefault()
		const blogObject = {
			title: newBlog.form.value,
			author: newBlogAuthor.form.value,
			url: newBlogUrl.form.value
		}

		blogService
			.create(blogObject)
			.then(data => {
				setBlogs(blogs.concat(data))
				newBlog.reset()
				newBlogAuthor.reset()
				newBlogUrl.reset()
				setErrorMessage('a new blog added')
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
			})
	}

	const removeBlog = async (blog) => {
		try {
			await blogService.remove(blog)
			const newBlogs = blogs.filter((x) => x.id !== blog.id)
			setBlogs(newBlogs)
		} catch (error) {
			console.log(error)
		}
	}

	const loginForm = () => (
		<>
			<h2>log in to application</h2>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						{... username.form}
					/>
				</div>
				<div>
					password
					<input
						{... password.form}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</>
	)

	const blogForm = () => {
		const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
		const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

		return (
			<div>
				<div style={hideWhenVisible}>
					<button onClick={() => setBlogFormVisible(true)}>new blog</button>
				</div>
				<div style={showWhenVisible}>
					<BlogForm
						addBlog={addBlog}
						newBlog={newBlog}
						newBlogAuthor={newBlogAuthor}
						newBlogUrl={newBlogUrl}
					/>
					<button onClick={() => setBlogFormVisible(false)}>cancel</button>
				</div>
			</div>
		)
	}

	const blogList = () => (
		<div className='bloglist'>
			<h2>blogs</h2>
			<p>{user.name} logged in <button onClick={handleLogOut}>logout</button></p>
			{blogForm()}
			{blogs
				.sort((a, b) => b.likes - a.likes)
				.map(blog => <Blog key={blog.id} blog={blog} handleRemove={removeBlog} user={user} className='blog' />)}
		</div>
	)

	return (
		<div>
			<p>{errorMessage}</p>

			{user === null && loginForm()}
			{user !== null && blogList()}
		</div>
	)
}

export default App
