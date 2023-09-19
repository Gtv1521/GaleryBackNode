import express from 'express';
const router = express.Router();


router.get('/', async (req, res) => {
    res.json('<h2>welcome</h2>');
});


export default router;