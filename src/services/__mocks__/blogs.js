const blogs = [
	{
		id: '5a451df7571c224a31b5c8ce',
		title: 'test title',
		author: 'test author',
		url: 'test url',
		user: {
			_id: '5a437a9e514ab7f168ddf138',
			username: 'test username',
			name: 'test name'
		}
	},
	{
		id: '5a451e21e0b8b04a45638211',
		title: 'test title 2',
		author: 'test author 2',
		url: 'test url 2',
		user: {
			_id: '5a437a9e514ab7f168ddf138',
			username: 'test username',
			name: 'test name'
		}
	}
]
  
const getAll = () => {
	return Promise.resolve(blogs)
}

let token

const setToken = (val) => {
	token = val
}
  
export default { getAll, setToken }