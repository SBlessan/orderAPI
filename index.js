const express = require('express')
const app = express()
const Shopify = require('shopify-api-node');

const PORT = 5000


index.get('/',async(req,res)=> {

  const headers = req.headers;
      const shopName = headers['shopname'];
      const accessToken = headers['accesstoken'];
      const id = headers['id'];

  const shopify = new Shopify({
    shopName: shopName,
    accessToken: accessToken
  });

  
  console.log("id is", id);
  
  const query = `{
    order(id: "gid://shopify/Order/5514302259495") {
      currencyCode
      discountCode
      displayFulfillmentStatus
      fullyPaid
      paymentGatewayNames
      createdAt
      totalShippingPrice
      totalTax
      paymentCollectionDetails {
        additionalPaymentCollectionUrl
      }
    }
  }  
  `;

  const products = await shopify.graphql(query);
  res.json(products);

})

app.listen(PORT, () =>{
    console.log(`Server is running at ${PORT}.....`)
})



