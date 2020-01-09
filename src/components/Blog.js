import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, handleRemove, user }) => {


	const [blogExpand, setBlogExpand] = useState(false)
	const [likes, setLikes] = useState('')

	useEffect(() => {
		if (blog.likes === undefined) {
			setLikes(0)
		} else {
			setLikes(blog.likes)
		}
	}, [blog.likes])

	const handleClick = () => {
		blogExpand ? setBlogExpand(false) : setBlogExpand(true)
	}

	const handleLike = () => {

		let newLikes = likes + 1

		const newObject = { ...blog, likes: newLikes }

		blogService.update(blog.id, newObject)

		setLikes(newLikes)
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const handleRemoveButton = () => {
		if (window.confirm('remove blog ' + blog.title)) {
			handleRemove(blog)
		}
	}

	const RemoveButton = () => {
		if (blog.user.username === user.username) {
			return (
				<button onClick={handleRemoveButton}>remove</button>
			)
		} else {
			return (<></>)
		}
	}

	if (blogExpand) {
		return (
			<div style={blogStyle} className='expandedBlog'>
				<div onClick={handleClick} className='blogTitle'>
					{blog.title} {blog.author}
				</div>
				<br />{blog.url}
				<br />{likes} likes <button onClick={handleLike}>like</button>
				<br />added by {blog.user.name}
				<br /><RemoveButton/>
			</div>
		)
	} else {
		return (
			<div style={blogStyle} className='collapsedBlog'>
				<div onClick={handleClick} className='blogTitle'>
					{blog.title} {blog.author}
				</div>
			</div>
		)
	}
}

export default Blog