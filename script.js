const fileInput = document.getElementById('txtFile');
const fileName = document.getElementById('fileName');
const content = document.getElementById('content');
const signBtn = document.querySelector('.sign-btn');
const certSelect = document.querySelector('select');

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];

  if (!file) return;

  fileName.textContent = file.name;

  const reader = new FileReader();

  reader.onload = function(event) {
    content.value = event.target.result;
  };

  reader.readAsText(file);
});

signBtn.addEventListener('click', async () => {
  const text = content.value;

  if (!text.trim()) {
    alert("Není načtený žádný text.");
    return;
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const hashHex = hashArray
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  const certifikat = certSelect.value;

  const podpis = `
----- PODEPSÁNO -----
Certifikát: ${certifikat}
SHA-256: ${hashHex}
Čas: ${new Date().toLocaleString()}
`;

  const finalContent = text + podpis;

  const blob = new Blob([finalContent], { type: 'text/plain' });

  const a = document.createElement('a');

  a.href = URL.createObjectURL(blob);

  a.download = 'podepsany_dokument.txt';

  a.click();
});