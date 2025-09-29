function randomNum() {
  let otp = '';
  for (let i = 0; i < 5; i++) {
    otp += Math.floor(Math.random() * 10); // random digit 0-9
  }
  return otp;
}

const timeGenerator = (after)=>{
  const now = new Date();
  now.setMinutes(now.getMinutes() + after);
  return now;
}

const randomCharsGen = (length = 8) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }
  return code;
};

module.exports = {randomNum,timeGenerator,randomCharsGen}