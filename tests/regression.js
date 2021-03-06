const PercyScript = require('@percy/script');
const httpServer = require('http-server');

const PORT = process.env.PORT_NUMBER || 8000;
const TEST_URL = `http://localhost/dist/:${PORT}`;

// A script to navigate our app and take snapshots with Percy.
PercyScript.run(async (page, percySnapshot) => {
  let server = httpServer.createServer();
  server.listen(PORT);

  console.log(`Server started at ${TEST_URL}`);

  await page.goto(TEST_URL);
  await percySnapshot('NULLzuEINS home page');

  // Enter a new to-do.
  await page.type('#contact', 'Contact form');
  await page.keyboard.press('Enter');
  await percySnapshot('TodoMVC with a new todo', { widths: [768, 992, 1200] });
  server.close();
});
