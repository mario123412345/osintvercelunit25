import { useState } from "react";
export default function Home() {
  const [result, setResult] = useState(null);
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      job: e.target.job.value,
      password: e.target.password.value,
      pastebin: e.target.pastebin.value,
      country: e.target.country.value
    };
    const res = await fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    setResult(json);
  }
  return (
    <div style={{ padding: "2rem" }}>
      <h1>OSINT Breach Risk Predictor</h1>
      <form onSubmit={handleSubmit}>
        <input name="job" placeholder="Job Title" required /><br />
        <input name="password" placeholder="Password" required /><br />
        <select name="pastebin">
          <option>No</option>
          <option>Yes</option>
        </select><br />
        <input name="country" placeholder="Country" required /><br />
        <button type="submit">Predict</button>
      </form>
      {result && (
        <div>
          <p>Password strength: {result.passwordStrength}</p>
          <p>Probability: {result.probability}%</p>
          <p>Risk level: {result.riskLevel}</p>
        </div>
      )}
    </div>
  );
}
