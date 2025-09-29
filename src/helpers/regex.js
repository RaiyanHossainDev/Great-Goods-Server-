const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

module.exports = {phoneRegex, passwordRegex, emailRegex}