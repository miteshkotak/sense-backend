import { createApp } from './app'

const port = 3000

async function main() {
  const app = await createApp()


  app.listen(port, async () => {
    return console.log(`Express is listening at http://localhost:${port}`);
    });
}


main()