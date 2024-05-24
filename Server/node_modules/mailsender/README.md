<br><br>
Send E-Mail from Node.js with your GMail account to any e-mail recipient.
<ul>
  <li><a href="#usage_simple">Usage explanation</a>
  <li><a href="#usage_html">Sending HTML E-Mail</a>
</ul>

<h3 id="usage_simple">Usage explanation</h3>
<ol>
  <li>Get a GMail account from Google</li>
  <li>Google is somewhat restrictive how you ought to send mails,
    but there is a way to configure automated sending capabilities.<br>
    Go to
    <ul>
      <li>"Settings"</li>
      <li>"Accounts and import"</li>
      <li>"Further Settings"</li>
      <li>"Logon and security"</li>
      <li>Activate "Less secure apps"</li>
    </ul>
  </li>
  <li>Go to your node project folder and type npm install mailsender</li>
  <li>Use mailsender in your Node.js applicaton (copy&paste):
    <pre>
    var mailsender = require('mailsender');
    mailsender
        .from('user', 'pass')
        .to('x@y.z')
        .body('subject', 'message')
        .send();
    </pre>
  </li>
</ol>

<h3 id="usage_simple">Sending HTML E-Mail</h3>
Instead of
<pre>
  .body('subject', 'message')
</pre>
above, add a boolean as last argument:
<pre>
  .body('subject', 'message', true)
</pre>
That's it: Your message will be interpreted as HTML now.
  
