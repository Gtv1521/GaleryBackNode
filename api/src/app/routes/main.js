import express from "express"

const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Welcome to API REST Service')
})

export default router;