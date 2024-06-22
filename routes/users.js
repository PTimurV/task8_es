const express = require('express')
const router = express.Router()

let users = [
	{ id: 1, name: 'Иван', email: 'первый@example.com', age: 30 },
	{ id: 2, name: 'Петр', email: 'второй@example.com', age: 25 },
	{ id: 3, name: 'Евгений', email: 'третий@example.com', age: 20 },
	{ id: 4, name: 'Алексей', email: 'четвертый@mail.com', age: 25 },
]

router.get('/', (req, res) => {
	res.json(users)
})

router.get('/sorted', (req, res) => {
	const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name))
	res.json(sortedUsers)
})

router.get('/:id', (req, res) => {
	const user = users.find(u => u.id === parseInt(req.params.id))
	if (!user) return res.status(404).send('User not found')
	res.json(user)
})

router.post('/', (req, res) => {
	const { name, email, age } = req.body
	if (!name || !email || !age) {
		return res.status(400).send('Name, email, or age are required')
	}

	const newUser = {
		id: users.length + 1,
		name,
		email,
		age,
	}
	users.push(newUser)
	res.status(201).json(newUser)
})

router.put('/:id', (req, res) => {
	const user = users.find(u => u.id === parseInt(req.params.id))
	if (!user) return res.status(404).send('User not found')

	const { name, email, age } = req.body
	if (!name || !email || !age) {
		return res.status(400).send('Name, email, or age are required')
	}

	user.name = name
	user.email = email
	user.age = age
	res.json(user)
})

router.delete('/:id', (req, res) => {
	const userIndex = users.findIndex(u => u.id === parseInt(req.params.id))
	if (userIndex === -1) return res.status(404).send('User not found')

	users.splice(userIndex, 1)
	res.status(204).send()
})

// Дополнительные задания
router.get('/age/:age', (req, res) => {
	const age = parseInt(req.params.age)
	const result = users.filter(user => user.age > age)
	res.json(result)
})

router.get('/domain/:domain', (req, res) => {
	const domain = req.params.domain
	const result = users.filter(user => user.email.endsWith(`@${domain}`))
	res.json(result)
})

module.exports = router
