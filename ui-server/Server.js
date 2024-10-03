const express = require('express');
const path = require('path');
const app = express();
 
const PORT = process.env.PORT || 3000;
 
// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));
 
// Serve index.html for any unknown paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
