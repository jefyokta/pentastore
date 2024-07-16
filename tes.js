const fetch = require('node-fetch');
const https = require('https');
// Opsi untuk mengabaikan verifikasi sertifikat
const fetchOptions = {
    method: 'POST',
    body: JSON.stringify({
        name: 'jepi',
        nohp: "08223239324",
        email: 'jepi',
        ktp: 'erwer',
        kk: 'erwerew'
    }),
};

fetch('https://jefyokta.net/kamelapermai/api/addtamu', fetchOptions)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Fetch failed:', error));
