/* ===============================
   DKIM QUESTION BANK
   Used by quiz-engine.js
   =============================== */

window.DKIM_BANK = [
  {
    id: "dkim1",
    q: "What is the main purpose of DKIM?",
    o: [
      "To verify that an email was not altered in transit",
      "To encrypt email content",
      "To block spam automatically",
      "To validate the recipient’s mailbox"
    ],
    a: "To verify that an email was not altered in transit",
    e: "DKIM ensures message integrity by detecting changes after the email is sent."
  },

  {
    id: "dkim2",
    q: "Which cryptographic technique does DKIM use?",
    o: [
      "Public-key cryptography",
      "Symmetric encryption",
      "Hash chaining",
      "Token-based authentication"
    ],
    a: "Public-key cryptography",
    e: "DKIM uses a private key to sign emails and a public key published in DNS to verify them."
  },

  {
    id: "dkim3",
    q: "Where is the DKIM public key stored?",
    o: [
      "DNS as a TXT record",
      "Inside the email header",
      "On the mail server filesystem",
      "In the SMTP banner"
    ],
    a: "DNS as a TXT record",
    e: "Receiving servers retrieve the DKIM public key from DNS TXT records."
  },

  {
    id: "dkim4",
    q: "Which email header contains the DKIM signature?",
    o: [
      "DKIM-Signature",
      "Authentication-Results",
      "Received",
      "Message-ID"
    ],
    a: "DKIM-Signature",
    e: "The DKIM-Signature header includes the cryptographic signature and signing details."
  },

  {
    id: "dkim5",
    q: "What is a DKIM selector?",
    o: [
      "An identifier used to locate the public key in DNS",
      "A rule that blocks emails",
      "A spam scoring mechanism",
      "A type of hash algorithm"
    ],
    a: "An identifier used to locate the public key in DNS",
    e: "Selectors allow multiple DKIM keys to exist for the same domain."
  },

  {
    id: "dkim6",
    q: "Which part of the email does DKIM protect?",
    o: [
      "Headers and body content",
      "Only the subject line",
      "Only the sender IP",
      "Only the attachment"
    ],
    a: "Headers and body content",
    e: "DKIM signs selected headers and the message body to ensure integrity."
  },

  {
    id: "dkim7",
    q: "If DKIM verification fails, what does it usually indicate?",
    o: [
      "The email was modified after being sent",
      "The sender IP is blocked",
      "The recipient mailbox is full",
      "The email is encrypted"
    ],
    a: "The email was modified after being sent",
    e: "DKIM failure suggests content tampering or an invalid/missing key."
  },

  {
    id: "dkim8",
    q: "Which algorithm is commonly used for DKIM hashing?",
    o: [
      "RSA-SHA256",
      "MD5",
      "AES-128",
      "SHA-1 only"
    ],
    a: "RSA-SHA256",
    e: "Modern DKIM implementations use RSA with SHA-256 for stronger security."
  },

  {
    id: "dkim9",
    q: "How does DKIM differ from SPF?",
    o: [
      "DKIM verifies message integrity, SPF verifies sending IPs",
      "DKIM blocks spam, SPF encrypts emails",
      "DKIM works after delivery, SPF works on the mailbox",
      "There is no difference"
    ],
    a: "DKIM verifies message integrity, SPF verifies sending IPs",
    e: "SPF checks who sent the email, DKIM checks if it was altered."
  },

  {
    id: "dkim10",
    q: "Why is DKIM useful in digital forensics?",
    o: [
      "It helps determine if an email was tampered with",
      "It reveals the sender’s physical location",
      "It decrypts email content",
      "It recovers deleted messages"
    ],
    a: "It helps determine if an email was tampered with",
    e: "Investigators use DKIM results to assess message authenticity."
  },

  {
    id: "dkim11",
    q: "What does a 'dkim=pass' result indicate?",
    o: [
      "The signature was successfully verified",
      "The sender IP is trusted",
      "The message is encrypted",
      "The email is spam-free"
    ],
    a: "The signature was successfully verified",
    e: "A pass means the DKIM signature matches the public key in DNS."
  },

  {
    id: "dkim12",
    q: "Which protocol builds on DKIM and SPF together?",
    o: [
      "DMARC",
      "SMTP",
      "IMAP",
      "POP3"
    ],
    a: "DMARC",
    e: "DMARC uses both SPF and DKIM to enforce authentication policies."
  }
];
