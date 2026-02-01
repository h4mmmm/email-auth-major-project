window.SPF_BANK = [
  {
    id: "spf1",
    q: "What does SPF primarily verify?",
    o: ["The sender's IP address", "The email body content", "The subject line", "The recipient server"],
    a: "The sender's IP address",
    e: "SPF checks if the sending IP is authorised by the domain."
  },
  {
    id: "spf2",
    q: "Where is an SPF record published?",
    o: ["DNS TXT record", "SMTP banner", "IMAP settings", "Email signature"],
    a: "DNS TXT record",
    e: "SPF is stored in DNS as a TXT record."
  },
  {
    id: "spf3",
    q: "What does '-all' mean in SPF?",
    o: ["Fail unauthorised senders", "Always pass", "Neutral policy", "Temporary error"],
    a: "Fail unauthorised senders",
    e: "-all means only listed senders are allowed; others should fail."
  },
  {
    id: "spf4",
    q: "What does '~all' generally mean?",
    o: ["Softfail", "Hard fail", "Always pass", "No policy"],
    a: "Softfail",
    e: "~all is a soft fail: receivers may accept but mark as suspicious."
  },
  {
    id: "spf5",
    q: "Which attack does SPF help reduce?",
    o: ["Email spoofing", "SQL injection", "DDoS", "Ransomware"],
    a: "Email spoofing",
    e: "SPF limits who can send mail on behalf of a domain."
  }
];
