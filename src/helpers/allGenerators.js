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
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }
  return code;
};

function toSlug(text) {
    // Convert to lowercase
    let slug = text.toLowerCase();
    // Replace spaces and non-alphanumeric characters with hyphens
    slug = slug.replace(/[^a-z0-9]+/g, '-');
    // Remove leading/trailing hyphens
    slug = slug.replace(/^-+|-+$/g, '');
    // Generate 4 random digits
    const digits = Math.floor(1000 + Math.random() * 9000);
    // Combine slug and digits
    return `${slug}-${digits}`;
}
module.exports = {randomNum,timeGenerator,randomCharsGen,toSlug}