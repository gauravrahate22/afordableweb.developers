document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    emailjs.sendForm('gaurav22052003', 'YOUR_TEMPLATE_ID', this)
      .then(() => alert('Message sent!'))
      .catch((err) => alert('Failed to send message: ' + err));
  });
  