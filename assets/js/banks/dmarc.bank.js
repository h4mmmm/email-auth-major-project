// /assets/js/banks/dmarc.bank.js
// DMARC question bank for Certimailer quizzes.
// Exposes: window.DMARC_BANK (array of { id, q, o, a, e })

(() => {
  const DMARC_BANK = [
    {
      id: "dmarc1",
      q: "What is the main purpose of DMARC?",
      o: [
        "To tell receivers what to do when SPF/DKIM fail and provide reporting",
        "To encrypt email messages end-to-end",
        "To replace DNS with a secure directory",
        "To block all attachments by default"
      ],
      a: "To tell receivers what to do when SPF/DKIM fail and provide reporting",
      e: "DMARC builds on SPF and DKIM by adding alignment + a policy (none/quarantine/reject) and reports."
    },
    {
      id: "dmarc2",
      q: "Where is a DMARC policy published?",
      o: [
        "As a DNS TXT record at _dmarc.<domain>",
        "Inside the email header",
        "As an MX record",
        "On the website homepage"
      ],
      a: "As a DNS TXT record at _dmarc.<domain>",
      e: "DMARC is stored in DNS as a TXT record at the _dmarc subdomain."
    },
    {
      id: "dmarc3",
      q: "Which tag sets the DMARC policy action?",
      o: ["p=", "rua=", "adkim=", "fo="],
      a: "p=",
      e: "The p= tag sets the policy: none, quarantine, or reject."
    },
    {
      id: "dmarc4",
      q: "What does p=reject mean?",
      o: [
        "Emails that fail DMARC should be rejected at SMTP",
        "Emails should be delivered but flagged",
        "DMARC is disabled",
        "Only DKIM is checked"
      ],
      a: "Emails that fail DMARC should be rejected at SMTP",
      e: "reject is the strictest DMARC policy and tells receivers to refuse failing messages."
    },
    {
      id: "dmarc5",
      q: "What does p=quarantine typically do?",
      o: [
        "Send failing emails to spam/junk or apply extra filtering",
        "Reject all emails from the domain",
        "Ignore SPF and DKIM results",
        "Encrypt the email"
      ],
      a: "Send failing emails to spam/junk or apply extra filtering",
      e: "quarantine is a middle policy—receivers often place failing mail into spam/junk."
    },
    {
      id: "dmarc6",
      q: "What does p=none mean?",
      o: [
        "Monitor only (collect reports) without requesting enforcement",
        "Reject failing emails",
        "Quarantine failing emails",
        "Disable SPF checks"
      ],
      a: "Monitor only (collect reports) without requesting enforcement",
      e: "none is usually used during rollout to observe authentication and alignment via reports."
    },
    {
      id: "dmarc7",
      q: "DMARC 'alignment' mainly checks what?",
      o: [
        "Whether the From: domain matches SPF/DKIM-authenticated domains",
        "Whether the email has an attachment",
        "Whether the subject line contains a keyword",
        "Whether the recipient clicked a link"
      ],
      a: "Whether the From: domain matches SPF/DKIM-authenticated domains",
      e: "DMARC requires SPF and/or DKIM to pass AND align with the visible From: domain."
    },
    {
      id: "dmarc8",
      q: "Which header domain does DMARC focus on for alignment?",
      o: ["The From: header domain", "The To: header domain", "The Subject line", "The Message-ID domain only"],
      a: "The From: header domain",
      e: "DMARC is about protecting the visible From: domain users see in mail clients."
    },
    {
      id: "dmarc9",
      q: "Which DMARC tag controls the percentage of messages the policy applies to?",
      o: ["pct=", "sp=", "rf=", "ri="],
      a: "pct=",
      e: "pct= lets you roll out gradually (e.g., pct=25 applies policy to about 25% of failing mail)."
    },
    {
      id: "dmarc10",
      q: "Which DMARC tag is used for aggregate reports?",
      o: ["rua=", "ruf=", "p=", "v="],
      a: "rua=",
      e: "rua= specifies where receivers send aggregate (daily/periodic) XML reports."
    },
    {
      id: "dmarc11",
      q: "Which DMARC tag is used for forensic (failure) reports?",
      o: ["ruf=", "rua=", "pct=", "adkim="],
      a: "ruf=",
      e: "ruf= is for failure/forensic reports (availability and content vary by receiver)."
    },
    {
      id: "dmarc12",
      q: "What does the DMARC tag 'sp=' control?",
      o: [
        "Policy for subdomains",
        "SPF evaluation mode",
        "SMTP port settings",
        "The reporting interval"
      ],
      a: "Policy for subdomains",
      e: "sp= lets you set a different policy for subdomains than the main domain policy (p=)."
    },
    {
      id: "dmarc13",
      q: "What is required for a message to PASS DMARC?",
      o: [
        "SPF or DKIM must pass AND align with the From: domain",
        "Both SPF and DKIM must fail",
        "The email must be encrypted",
        "The email must contain a DKIM signature only"
      ],
      a: "SPF or DKIM must pass AND align with the From: domain",
      e: "DMARC passes if either SPF-aligned pass OR DKIM-aligned pass is true."
    },
    {
      id: "dmarc14",
      q: "If SPF passes but does NOT align with the From: domain, DMARC will…",
      o: [
        "Only pass if DKIM passes and aligns; otherwise fail",
        "Automatically pass because SPF passed",
        "Always quarantine",
        "Ignore DKIM completely"
      ],
      a: "Only pass if DKIM passes and aligns; otherwise fail",
      e: "Alignment matters: SPF pass alone is not enough if it doesn't align to the From: domain."
    },
    {
      id: "dmarc15",
      q: "What does 'adkim=s' mean?",
      o: [
        "Strict DKIM alignment (exact domain match required)",
        "Relaxed DKIM alignment (subdomain match allowed)",
        "Disable DKIM",
        "Force DKIM to use SHA-1"
      ],
      a: "Strict DKIM alignment (exact domain match required)",
      e: "adkim=s enforces strict alignment; adkim=r is relaxed (default for most)."
    },
    {
      id: "dmarc16",
      q: "What does 'aspf=r' mean?",
      o: [
        "Relaxed SPF alignment (subdomains may align)",
        "Strict SPF alignment (exact match only)",
        "SPF is ignored",
        "SPF must use IPv6 only"
      ],
      a: "Relaxed SPF alignment (subdomains may align)",
      e: "aspf=r allows relaxed alignment; aspf=s is strict."
    },
    {
      id: "dmarc17",
      q: "Which tag is the DMARC version identifier?",
      o: ["v=DMARC1", "v=spf1", "k=rsa", "ver=1"],
      a: "v=DMARC1",
      e: "DMARC records start with v=DMARC1 (similar to SPF’s v=spf1)."
    },
    {
      id: "dmarc18",
      q: "What is one key benefit of DMARC aggregate reports (rua=)?",
      o: [
        "Visibility into who is sending on behalf of your domain and pass/fail rates",
        "It encrypts inbound mail automatically",
        "It blocks all phishing links",
        "It replaces the need for DKIM"
      ],
      a: "Visibility into who is sending on behalf of your domain and pass/fail rates",
      e: "Aggregate reports help you discover legitimate senders, misconfigurations, and abuse."
    },
    {
      id: "dmarc19",
      q: "A DMARC record should include which minimum tags to be valid?",
      o: [
        "v=DMARC1 and p=",
        "rua= and ruf=",
        "aspf= and adkim=",
        "pct= and ri="
      ],
      a: "v=DMARC1 and p=",
      e: "At minimum you need the DMARC version and a policy (p=)."
    },
    {
      id: "dmarc20",
      q: "Why might an organization start with p=none?",
      o: [
        "To monitor and fix SPF/DKIM/alignment issues before enforcing",
        "Because it blocks all spoofing immediately",
        "Because it disables reports",
        "Because it forces DKIM to pass"
      ],
      a: "To monitor and fix SPF/DKIM/alignment issues before enforcing",
      e: "p=none is commonly used during rollout to avoid breaking legitimate mail."
    }
  ];

  // Expose for your quiz engine
  window.DMARC_BANK = DMARC_BANK;
})();

