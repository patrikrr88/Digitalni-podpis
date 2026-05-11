const fileInput = document.getElementById('txtFile');
const fileName = document.getElementById('fileName');
const content = document.getElementById('content');
const certificateSelect = document.getElementById('certificateSelect');
const signBtn = document.querySelector('.sign-btn');

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  fileName.textContent = file.name;

  const reader = new FileReader();
  reader.onload = (event) => {
    content.value = event.target.result;
  };

  reader.readAsText(file);
});

async function loadCertificates() {
  const res = await fetch('getCertificates.php');
  const data = await res.json();

  certificateSelect.innerHTML = '';

  data.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.certifkey;
    opt.textContent = `${c.firstname} ${c.lastname} - ${c.certifkey}`;
    certificateSelect.appendChild(opt);
  });
}

loadCertificates();

signBtn.addEventListener('click', async () => {
  const text = content.value;
  if (!text.trim()) return;

  const enc = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest('SHA-256', enc.encode(text));

  const hash = [...new Uint8Array(hashBuffer)]
    .map(b => b.toString(16).padStart(2,'0'))
    .join('');

  const cert = certificateSelect.value;

  const signed = text +
`\n\n--- SIGN ---\nCERT: ${cert}\nHASH: ${hash}\nTIME: ${new Date().toISOString()}`;

  const blob = new Blob([signed], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'signed.txt';
  a.click();
});