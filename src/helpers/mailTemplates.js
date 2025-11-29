const linkVerifyTemplates = (username,email,link)=>(`
<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="x-apple-disable-message-reformatting">
    <title>Voyager Email Verification</title>
  </head>
  <body style="margin:0; padding:0; background-color:#0b0e23; color:#ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

    <center role="article" aria-roledescription="email" lang="en" style="width:100%; background-color:#0b0e23;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse; background-color:#0b0e23;">
        <tr>
          <td align="center" style="padding:24px 12px;">

            <!-- Container -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px; max-width:600px; background-color:#11142a; border-radius:14px; overflow:hidden; box-shadow:0 0 24px rgba(0,0,0,0.8); background-color:#11142a;">

              <!-- Header / Icon -->
              <tr>
                <td align="center" style="padding:28px 24px 12px 24px;">
                  <!-- Rocket Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="white" style="display:block; margin:0 auto;">
                    <path d="M12 2c-2.5 1.5-4.5 4.5-5 8l-3 3 3 1-1 3 3-1 1 3 3-3c3.5-.5 6.5-2.5 8-5-.5-4-3.5-7.5-9-9zM5 19c-1 1-1 2 0 3s2 1 3 0c.5-.5.8-1.3.8-2s-.3-1.5-.8-2c-1-1-2-1-3 1z"/>
                  </svg>
                  <h1 style="margin:12px 0 0 0; font-size:26px; line-height:32px; font-weight:700; color:#ffffff;">Voyager Email Verification</h1>
                  <!-- Stars row -->
                  <p style="margin:8px 0 0 0;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#ffd43b" viewBox="0 0 24 24" style="margin:0 4px;">
                      <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#ffd43b" viewBox="0 0 24 24" style="margin:0 4px;">
                      <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#ffd43b" viewBox="0 0 24 24" style="margin:0 4px;">
                      <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  </p>
                </td>
              </tr>

              
              <!-- Main Content -->
              <tr>
              <td style="padding:24px; font-size:16px; line-height:24px; color:#d0d6f2;">
              <p style="margin:0;">Hello, <strong style="color:#ffffff;">${username}</strong> 👩‍🚀</p>
              <p style="margin:12px 0 0 0;">We need to confirm your email address <span style="color:#ffffff;">${email}</span> before you can dock with the Voyager space station.</p>
              </td>
              </tr>
              
              <table border="0" cellspacing="0" cellpadding="0" align="center" role="presentation">
                <tr>
                    <td align="center" bgcolor="#4F46E5" style="border-radius:30px;">
                    <a href="${link}" target="_blank"
                        style="font-size:16px; font-weight:bold; font-family:Arial, sans-serif;
                                color:#ffffff; text-decoration:none; padding:14px 28px; display:inline-block;">
                        VERIFY YOUR EMAIL 🚀
                    </a>
                    </td>
                </tr>
              </table>
              <!-- Fallback Link -->
              <tr>
                <td style="padding:0 24px 24px 24px; font-size:14px; line-height:22px; color:#d0d6f2;">
                  <p style="margin:0;">if the button doesn't work , use the link given below:</p>
                  <p style="margin:8px 0 0 0; font-family:monospace; background:#0b0e23; padding:12px; border-radius:6px; color:#4dabf7; word-break:break-all;">
                    ${link}
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" style="padding:16px 24px 24px 24px; font-size:12px; line-height:18px; color:#8c99b3;">
                  <!-- Planet Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#8c99b3" viewBox="0 0 24 24" style="vertical-align:middle; margin-bottom:-4px;">
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/>
                  </svg>
                  <p style="margin:8px 0 0 0;">This cosmic message was sent to <span style="color:#ffffff;">${email}</span> by Voyager 🚀</p>
                </td>
              </tr>

            </table>
            <!-- /Container -->

          </td>
        </tr>
      </table>
    </center>
  </body>
</html>


`)

const purchaseDetailsTemplate = (orderId,orderDate,name,address,items,total,subTotal,shippingCost,discount)=>(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Order Summary</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f6ff;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 0;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(90deg, #1e3c72, #2a5298);
      color: #ffffff;
      padding: 30px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .header p {
      margin: 5px 0 0;
      font-size: 14px;
    }
    .content {
      padding: 20px;
    }
    .order-summary h2 {
      color: #2c5879;
      border-bottom: 2px solid #1e90ff;
      padding-bottom: 8px;
    }
    .order-info {
      margin-bottom: 15px;
      font-size: 14px;
      color: #1b3a57;
    }
    .item {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #dddddd;
      padding: 10px 0;
    }
    .total {
      font-weight: bold;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      color: #1b3a57;
    }
    .delivery-info {
      background-color: #eaf3ff;
      border-left: 4px solid #1e90ff;
      padding: 15px;
      border-radius: 5px;
      margin-top: 25px;
      color: #1b3a57;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding: 20px;
      background-color: #f0f6ff;
      color: #888888;
      font-size: 12px;
      border-top: 1px solid #dddddd;
      border-radius: 0 0 8px 8px;
    }
    .btn {
      display: inline-block;
      padding: 12px 20px;
      margin-top: 20px;
      background-color: #1e90ff;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Your Purchase!</h1>
      <p>Order #${orderId}</p>
    </div>

    <div class="content">
      <div class="order-summary">
        <h2>Order Summary</h2>
        <div class="order-info">
          <p><strong>Order Date:</strong> ${orderDate}</p>
        </div>
        ${
          items.map(item => (`
            <div class="item">
              <span>${item.productId.productName} (Qty: ${item.qty}) <b>:</b> </span>
              <span> $${item.productId.discountPrice || item.productId.productPrice}</span>
            </div>
          `))
        }
        <div class="subtotal" style="display:flex; justify-content:space-between; margin-top:15px;">
        <span>Subtotal <b>:</b> </span>
        <span> $${subTotal}</span>
      </div>
      <div class="shipping" style="display:flex; justify-content:space-between; margin-top:5px;">
        <span>Shipping <b>:</b> </span>
        <span> $${shippingCost}</span>
      </div>
      <div class="discount" style="display:flex; justify-content:space-between; margin-top:5px;">
        <span>Coupon Discount <b>:</b> </span>
        <span> -$${discount}</span>
      </div>
      <div class="total" style="font-weight:bold; display:flex; justify-content:space-between; margin-top:15px;">
        <span>Total <b>:</b> </span>
        <span> $${total}</span>
      </div>
      </div>

      <div class="delivery-info">
        <h3>Delivery Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Address:</strong> ${address}</p>
      </div>

      <a href="https://yourwebsite.com" class="btn">View Your Order</a>
    </div>

    <div class="footer">
      <p>If you have any questions, reply to this email or contact us at support@yourwebsite.com</p>
      <p>© 2025 Your Company Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>

`)


module.exports = {linkVerifyTemplates, purchaseDetailsTemplate}