const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Todo List App!');
});

module.exports = router;
