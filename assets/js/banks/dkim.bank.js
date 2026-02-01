const DKIM_BANK = [
  {
    id: "dkim1",
    q: "What does DKIM protect?",
    o: [
      "Email content integrity",
      "Sender IP address",
      "Mailbox storage",
      "Spam filtering"
    ],
    a: "Email content integrity",
    e: "DKIM ensures the email content was not altered in transit."
  },
  {
    id: "dkim2",
    q: "Where is the DKIM public key stored?",
    o: [
      "DNS TXT record",
      "Email header",
      "SMTP server",
      "Mail client"
    ],
    a: "DNS TXT record",
    e: "DKIM public keys are published in DNS."
  }
];
