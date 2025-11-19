async function sendMessage() {
  const msg = document.getElementById("msg").value;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();
  document.getElementById("response").innerText =
    data.candidates?.[0]?.content?.parts?.[0]?.text || "Sem resposta";
}
