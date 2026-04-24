const WHATSAPP_NUMBER = '918438255947'

export const redirectToWhatsApp = (productName = '', productPrice = '', quantity = null) => {
  let message

  if (productName && productPrice) {
    message = `Hi Vikas Silks!\n\nI'm interested in the following product:\n\nProduct: ${productName}\nPrice: ${productPrice}${quantity ? `\nQuantity: ${quantity}` : ''}\n\nPlease share more details.`
  } else if (productName) {
    message = `Hi Vikas Silks!\n\nI'm interested in: ${productName}\n\nPlease share more details.`
  } else {
    message = `Hi Vikas Silks!\n\nI'd like to know more about your saree collections.`
  }

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}
