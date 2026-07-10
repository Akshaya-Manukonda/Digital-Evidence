# Digital Evidence - API Documentation

## Base URL
`http://localhost:5000/api`

## Endpoints

### Authentication
- POST /auth/register
- POST /auth/login
- POST /auth/logout

### Transactions
- POST /transactions
- GET /transactions
- GET /transactions/:id

### Face Recognition
- POST /face/verify
- POST /face/enrollment
