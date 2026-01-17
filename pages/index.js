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
    <div style={{ padding: "2rem", maxWidth: "500px" }}>
      <h1>Prediccion de brecheado</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Puesto de trabajo:
          <br />
          <input
            name="job"
            placeholder="Ej: Analista de Ciberseguridad"
            required
          />
        </label>
        <br /><br />
        <label>
          Contraseña:
          <br />
          <input
            name="password"
            placeholder="Introduce la contraseña"
            required
          />
        </label>
        <br /><br />
        <label>
          Aparece en un Public Pastebin?
          <br />
          <select name="pastebin">
            <option>No</option>
            <option>Si</option>
          </select>
        </label>
        <br /><br />
        <label>
          País:
          <br />
          <input
            name="country"
            placeholder="Ej: España"
            required
          />
        </label>
        <br /><br />
        <button type="submit">Predecir riesgo</button>
      </form>
      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Resultado</h3>
          <p><strong>Fuerza de la contraseña:</strong> {result.passwordStrength}</p>
          <p><strong>Probabilidad de brecha:</strong> {result.probability}%</p>
          <p><strong>Nivel de riesgo:</strong> {result.riskLevel}</p>
        </div>
      )}
    </div>
  );
}

