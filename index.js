const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/:username', async (req, res) => {

  try {
    const { username } = req.params;
    const response = await fetch(
      `https://api.github.com/users/${username}/gists`
    );
    const data = await response.json();
    if (data.message === 'Not Found') {
      return res.status(500).json({
        status: 'failure',
        message: 'The gists for current user not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    console.log(`Fetch error: ${error}`);
    res.status(500).json({
      status: 'failure',
      message: error,
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
