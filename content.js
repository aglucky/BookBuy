function addFormatsToCart() {
    const paperbackButton = document.evaluate('//a[./span/span[text()="Paperback"]]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    const hardcoverButton = document.evaluate('//a[./span/span[text()="Hardcover"]]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    const kindleButton = document.evaluate('//a[./span/span[text()="Kindle"]]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    const audiobookButton = document.evaluate('//a[.//span[text()=" Audiobook "]]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    
    const baseUrl = "https://www.amazon.com/gp/aws/cart/add.html";

    const form = document.createElement('form');
    form.method = 'GET';
    form.action = baseUrl;
    form.target = '_blank';

    const extractASIN = (url) => {
        if (!url.includes('http')) {
            url = window.location.href;
        }
        const match = url.match(/\/dp\/(\w{5,14})\//);
        return match ? match[1] : null
    };

    const buttons = [paperbackButton, audiobookButton, kindleButton, hardcoverButton];
    const products = buttons.map(button => {
        const asin = button ? extractASIN(button.href) : null;
        return { ASIN: asin, Quantity: '1' };
    }).filter(product => product.ASIN !== null);

    products.forEach((product, index) => {
        const asinInput = document.createElement('input');
        asinInput.type = 'text';
        asinInput.name = `ASIN.${index + 1}`;
        asinInput.value = product.ASIN;
        form.appendChild(asinInput);

        const quantityInput = document.createElement('input');
        quantityInput.type = 'text';
        quantityInput.name = `Quantity.${index + 1}`;
        quantityInput.value = product.Quantity;
        form.appendChild(quantityInput);
    });

    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Add to Cart';
    form.appendChild(submitButton);

    document.body.appendChild(form);
    form.submit();
}

function addAllFormatsButton() {
    const target = document.getElementById('buybox');

    if (target) {
        const button = document.createElement('button');
        button.innerText = 'Add All Versions to Cart';
        button.id = 'addAllVersionsBtn';
        button.style.cssText = `
            background-color: #FF9900; /* Bright yellow background */
            color: white; /* White text */
            padding: 10px 20px; /* Padding around the text */
            margin-top: 10px; /* Margin on the top */
            border: none; /* No border */
            cursor: pointer; /* Pointer cursor on hover */
            font-weight: bold; /* Bold text */
            border-radius: 5px; /* Rounded corners */
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Subtle shadow */
            font-size: 16px; /* Larger font size */
        `;
        target.parentNode.insertBefore(button, target.nextSibling);

        button.addEventListener('click', function () {
            addFormatsToCart();
        });
    }
}

addAllFormatsButton();