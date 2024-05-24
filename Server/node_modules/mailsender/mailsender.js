var nodemailer = require('nodemailer');

// At the time, GMail is the only supported
// mail account system. Get one and go on from here.
//
// Basic usage:
// var mailsender = require('mailsender');
// mailsender
//  .from('user', 'pass')
//  .to('x@y.z')
//  .body('subject', 'message')
//  .send();

exports.transport = null;
exports.mailOpts = {};

// Specify gmail username and password to send a mail from.
// @username The GMail username
// @pass The plaintext password
exports.from = function(user, pass) {
  exports.transport = nodemailer.createTransport('smtps://' + user + ':' + encodeURIComponent(pass) + '@smtp.gmail.com');
  exports.mailOpts.from = user + '@gmail.com';
  return exports;
}

exports.to = function(mailAddress) {
  exports.mailOpts.to = mailAddress;
  return exports;
}

exports.subject = function(subject) {
  exports.mailOpts.subject = subject;
};

exports.text = function(textString) {
    exports.mailOpts.text = textString;
}

exports.html = function(htmlString) {
    exports.mailOpts.html = htmlString;
}

exports.body = function(subject, text, htmlEnabled) {
  exports.mailOpts.subject = subject;
  if (htmlEnabled) {
    exports.mailOpts.html = text;
  } else {
    exports.mailOpts.text = text;
  }
  return exports;
}

exports.bcc = function(mailAddress) {
  exports.mailOpts.bcc = mailAddress;
  return exports;
}

exports.replyto = function(mailAddress) {
  exports.mailOpts.replyTo = mailAddress;
  return exports;
}

exports.send = function() {
  //console.log(JSON.stringify(exports.mailOpts));

  if (!exports.transport || !exports.mailOpts.from) { throw "Call from(user, pass) before send()."; }
  if (!exports.mailOpts.to) { throw "Call to(address) before send()."; }
  if (!exports.mailOpts.subject) { throw "Call subject(s) to give message a subject before calling send()."; }
  if (!exports.mailOpts.html && !exports.mailOpts.text) { throw "Call either text(s) or html(s) to give message a text before calling send()."; }

  exports.transport.sendMail(exports.mailOpts, function(err,info) {
    if(err) { throw err; }
  });
}
