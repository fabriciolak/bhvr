import { useState } from "react";
import beaver from "./assets/beaver.svg";
import { ApiResponse } from "shared";
import "./App.css";
 
function App() {
  const [data, setData] = useState<ApiResponse | undefined>();
 
  async function sendRequest() {
    try {
      // Use relative path - works in both dev and production
      const req = await fetch("/api/v1/health");
      const res: ApiResponse = await req.json();
      setData(res);
    } catch (error) {
      console.log(error);
    }
  }
 
  return (
    <>
      <div>
        <a href='https://github.com/stevedylandev/bhvr' target='_blank'>
          <img src={beaver} className='logo' alt='beaver logo' />
        </a>
      </div>
      <h1>bhvr</h1>
      <h2>Bun + Hono + Vite + React</h2>
      <p>A typesafe fullstack monorepo</p>
      <div className='card'>
        <button onClick={sendRequest}>Call API</button>
        {data && (
          <pre className='response'>
            <code>
              Message: {data.message} <br />
              Success: {data.success.toString()}
            </code>
          </pre>
        )}
      </div>
      <p className='read-the-docs'>Click the beaver to learn more</p>
    </>
  );
}
 
export default App;
