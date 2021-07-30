import "./setup";
import app, { init } from "./app";
init().then(()=>{
  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port 4000.`);
  });
})
