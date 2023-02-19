import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

try {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on  http://localhost:${process.env.PORT}`);
  });
} catch (error) {
  console.log(error);
}
