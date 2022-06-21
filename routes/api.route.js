const router = require("express").Router()
const prisma = require("../helpers/init_prisma")

router.get("/products", async (req, res, next) => {
	try {
		const products = await prisma.product.findMany({
			include: { Category: true },
		})

		const categories = await prisma.category.findMany({
			include: { products: true },
		})
		res.json({ products, categories })
	} catch (error) {
		next(error)
	}
})

router.post("/products", async (req, res, next) => {
	try {
		const product = await prisma.product.create({ data: req.body })
		res.json(product)
	} catch (error) {
		next(error)
	}
})

router.get("/products/:id", async (req, res, next) => {
	try {
		const { id } = req.params
		const product = await prisma.product.findUnique({
			where: {
				id: parseInt(id),
			},
			include: {
				Category: true,
			},
		})

		res.json(product)
	} catch (error) {
		next(error)
	}
})

router.patch("/products/:id", async (req, res, next) => {
	try {
		const { id } = req.params
		const product = await prisma.product.update({
			data: req.body,
			where: { id: parseInt(id) },
			include: {
				Category: true,
			},
		})
		res.json(product)
	} catch (error) {
		next(error)
	}
})

router.delete("/products/:id", async (req, res, next) => {
	try {
		const { id } = req.params
		const deletedProduct = await prisma.product.delete({
			where: { id: parseInt(id) },
		})
		res.json(deletedProduct)
	} catch (error) {
		next(error)
	}
})

module.exports = router
