# Database Schema

## Collections

### Users
- email (unique)
- password (hashed)
- role (lender/borrower/intermediary)
- faceEnrollmentStatus
- isVerified

### Transactions
- transactionId
- lenderId
- borrowerId
- intermediaryId
- amount
- status
- createdAt

### Digital Signatures
- transactionId
- userId
- signature
- timestamp

### Face Verification
- userId
- transactionId
- matchScore
- timestamp
