export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });}
  const { job, password, pastebin, country } = req.body;
  let points = 0;
  if (password.length >= 12) points++;
  if (/\d/.test(password)) points++;
  if (/[^a-zA-Z0-9]/.test(password)) points++;
  let passwordStrength = "Weak";
  if (points === 2) passwordStrength = "Moderate";
  if (points === 3) passwordStrength = "Strong";
  let risk = 0;
  if (passwordStrength === "Weak") risk += 0.3;
  if (passwordStrength === "Moderate") risk += 0.15;
  if (pastebin === "Yes") risk += 0.25;
  const riskyJobs = ["Penetration Tester", "OSINT Investigator", "Security Analyst"];
  if (riskyJobs.includes(job)) risk += 0.15;
  const highRiskCountries = ["Nigeria", "Belize", "Anguilla"];
  if (highRiskCountries.includes(country)) risk += 0.2;
  if (risk > 1) risk = 1;
  let level = "Low";
  if (risk >= 0.45 && risk < 0.55) level = "Medium";
  if (risk >= 0.55) level = "High";
  res.status(200).json({
    probability: Math.round(risk * 100),
    riskLevel: level,
    passwordStrength
  });
}
