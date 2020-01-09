import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
	addBlog,
	newBlog,
	newBlogAuthor,
	newBlogUrl
}) => (
	<>
		<h2>create new</h2>
		<form onSubmit={addBlog}>
			<p>title:<input
				{... newBlog.form}
			/></p>
			<p>author:<input
				{... newBlogAuthor.form}
			/></p>
			<p>url<input
				{... newBlogUrl.form}
			/></p>
			<button type="submit">create</button>
		</form>
	</>
)

BlogForm.propTypes = {
	addBlog: PropTypes.func.isRequired,
	newBlog: PropTypes.object.isRequired,
	newBlogAuthor: PropTypes.object.isRequired,
	newBlogUrl: PropTypes.object.isRequired,
}

export default BlogForm