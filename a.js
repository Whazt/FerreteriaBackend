import jwt from 'jsonwebtoken';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjb3JyZW9wcnVlYmFAcHJ1ZWJhLmNvbSIsInJvbCI6MiwiaWF0IjoxNzU3OTgzMjIyLCJleHAiOjE3NTg1ODgwMjJ9.N1YYybObUbHA1w7fuPdyDoHC4OIFUESxQ8dWZSQCVPg';
const secret = 'Refrescanding_tu_papi_riko';

try {
  const payload = jwt.verify(token, secret);
  console.log('✅ Verificado:', payload);
} catch (err) {
  console.error('❌ Error:', err.name, err.message);
}