// /assets/js/banks/detection.bank.js
// Question bank for Certimailer "Detection Tool" / phishing & email-auth detection concepts.
// Exposes: window.DETECTION_BANK (array of { id, q, o, a, e })

(() => {
  const DETECTION_BANK = [
    {
      id: "det1",
      q: "What is the main goal of an email detection tool in Certimailer?",
      o: [
        "Identify warning signs of spoofing/phishing using headers and authentication results",
        "Encrypt every email automatically",
        "Block all incoming emails from unknown senders",
        "Replace your email provider’s spam filter completely"
      ],
      a: "Identify warning signs of spoofing/phishing using headers and authentication results",
      e: "Certimailer focuses on explaining SPF/DKIM/DMARC outcomes and header indicators to assess trust."
    },
    {
      id: "det2",
      q: "Which authentication result is MOST closely linked to the sender IP being authorized?",
      o: ["SPF", "DKIM", "DMARC", "S/MIME"],
      a: "SPF",
      e: "SPF checks whether the sending server’s IP is allowed to send for the domain."
    },
    {
      id: "det3",
      q: "Which authentication method uses a digital signature to verify message integrity?",
      o: ["DKIM", "SPF", "DMARC", "SMTP"],
      a: "DKIM",
      e: "DKIM uses a cryptographic signature to validate the message wasn’t altered and came from a signing domain."
    },
    {
      id: "det4",
      q: "DMARC is MOST useful because it…",
      o: [
        "Adds alignment + a policy on what to do when SPF/DKIM fail",
        "Replaces DNS records",
        "Encrypts messages by default",
        "Guarantees the sender is a human"
      ],
      a: "Adds alignment + a policy on what to do when SPF/DKIM fail",
      e: "DMARC tells receivers how to handle failures and provides reporting, based on SPF/DKIM alignment."
    },
    {
      id: "det5",
      q: "If DMARC passes, what is true?",
      o: [
        "SPF or DKIM passed AND aligned with the From: domain",
        "SPF and DKIM both failed",
        "The email is guaranteed to be safe",
        "The email has no links"
      ],
      a: "SPF or DKIM passed AND aligned with the From: domain",
      e: "DMARC requires a pass + alignment; it reduces spoofing risk but does not guarantee no phishing."
    },
    {
      id: "det6",
      q: "Which header commonly shows SPF evaluation results?",
      o: ["Received-SPF", "Subject", "To", "MIME-Version"],
      a: "Received-SPF",
      e: "Many mail systems add Received-SPF to indicate pass/fail and the evaluated identity."
    },
    {
      id: "det7",
      q: "A common sign of display-name spoofing is…",
      o: [
        "The display name looks trusted but the actual From email domain is different",
        "The email has a short subject line",
        "The email is plain text only",
        "The email is sent during office hours"
      ],
      a: "The display name looks trusted but the actual From email domain is different",
      e: "Attackers often mimic a brand name while using a lookalike or unrelated domain."
    },
    {
      id: "det8",
      q: "What does a mismatched 'From' domain vs 'Return-Path' domain often indicate?",
      o: [
        "Possible third-party sending or spoofing attempt (needs alignment checks)",
        "A guaranteed phishing email",
        "The email is encrypted",
        "The email is safe"
      ],
      a: "Possible third-party sending or spoofing attempt (needs alignment checks)",
      e: "Legitimate services may differ, but DMARC alignment helps decide if it’s acceptable."
    },
    {
      id: "det9",
      q: "Why is 'p=none' in DMARC not a strong protection?",
      o: [
        "It monitors but doesn’t instruct receivers to quarantine/reject failing mail",
        "It blocks all spoofed emails automatically",
        "It disables SPF checks",
        "It forces DKIM signing"
      ],
      a: "It monitors but doesn’t instruct receivers to quarantine/reject failing mail",
      e: "p=none is used for reporting and rollout; enforcement comes with quarantine/reject."
    },
    {
      id: "det10",
      q: "Which outcome is MOST suspicious when assessing an email’s authenticity?",
      o: [
        "DMARC fail with From domain alignment not satisfied",
        "SPF pass and DKIM pass",
        "DMARC pass with alignment satisfied",
        "DKIM pass and aligned"
      ],
      a: "DMARC fail with From domain alignment not satisfied",
      e: "DMARC fail suggests the visible From domain wasn’t authenticated/aligned, increasing spoofing risk."
    },
    {
      id: "det11",
      q: "What does a DKIM 'pass' indicate?",
      o: [
        "The DKIM signature validated and the message content wasn’t altered after signing",
        "The sender IP is always authorized",
        "The user is verified by password",
        "The email contains no malware"
      ],
      a: "The DKIM signature validated and the message content wasn’t altered after signing",
      e: "DKIM pass is about signature validity and integrity; it doesn’t guarantee no malicious intent."
    },
    {
      id: "det12",
      q: "Why might SPF fail even for a legitimate email?",
      o: [
        "The sender uses a third-party service not included in SPF, or the sending IP changed",
        "The email was encrypted",
        "The email had an attachment",
        "The recipient mailbox is full"
      ],
      a: "The sender uses a third-party service not included in SPF, or the sending IP changed",
      e: "Legitimate mail can fail if DNS records are misconfigured or not updated for all senders."
    },
    {
      id: "det13",
      q: "Which is a good next step if your detection tool flags DMARC fail?",
      o: [
        "Inspect the From domain, Return-Path, and authentication results; treat links/attachments with caution",
        "Immediately forward the email to everyone",
        "Reply with your password to confirm identity",
        "Disable your spam filter"
      ],
      a: "Inspect the From domain, Return-Path, and authentication results; treat links/attachments with caution",
      e: "Use multiple signals: alignment, domain lookalikes, and content cues before interacting."
    },
    {
      id: "det14",
      q: "What is the best explanation of 'alignment' in email authentication?",
      o: [
        "SPF/DKIM authenticated domains should match (or align with) the visible From domain",
        "The subject line matches the sender name",
        "The attachment name matches the invoice number",
        "The email is delivered quickly"
      ],
      a: "SPF/DKIM authenticated domains should match (or align with) the visible From domain",
      e: "Alignment is the core of DMARC—it ties what users see (From) to what was authenticated."
    },
    {
      id: "det15",
      q: "Which header is MOST useful for tracing the path an email took between servers?",
      o: ["Received", "Content-Type", "CC", "Reply-To"],
      a: "Received",
      e: "Received headers form a hop-by-hop chain that investigators use to trace routing."
    },
    {
      id: "det16",
      q: "A URL that uses a misspelled domain (e.g., paypaI.com with a capital i) is an example of…",
      o: ["A lookalike (typosquatting) domain", "DKIM alignment", "SPF include", "DMARC reporting"],
      a: "A lookalike (typosquatting) domain",
      e: "Lookalike domains are a common phishing tactic; authentication may still pass for the attacker’s domain."
    },
    {
      id: "det17",
      q: "Why can a phishing email sometimes PASS SPF and DKIM?",
      o: [
        "Because the attacker is sending from a domain they control with proper authentication",
        "Because SPF/DKIM always allow phishing",
        "Because the recipient turned off security",
        "Because DMARC is irrelevant"
      ],
      a: "Because the attacker is sending from a domain they control with proper authentication",
      e: "Authentication proves domain control, not intent; users still need content and link checks."
    },
    {
      id: "det18",
      q: "What does DMARC 'p=quarantine' suggest receivers should do with failing mail?",
      o: [
        "Treat as suspicious (often send to spam/junk)",
        "Always reject at SMTP",
        "Always deliver to inbox",
        "Ignore SPF and DKIM results"
      ],
      a: "Treat as suspicious (often send to spam/junk)",
      e: "Quarantine is a middle-ground enforcement policy."
    },
    {
      id: "det19",
      q: "Which combination provides the strongest spoofing protection for a domain?",
      o: [
        "SPF + DKIM configured correctly, plus DMARC with enforcement (quarantine/reject)",
        "Only SPF with ?all",
        "Only DKIM without DMARC",
        "No DNS records"
      ],
      a: "SPF + DKIM configured correctly, plus DMARC with enforcement (quarantine/reject)",
      e: "DMARC enforces alignment and receiver actions; SPF/DKIM alone can be bypassed via lookalike domains."
    },
    {
      id: "det20",
      q: "What should a user do if a message is flagged but claims urgency (e.g., 'Pay now' or 'Reset immediately')?",
      o: [
        "Pause, verify via official channels, and avoid clicking links directly",
        "Click quickly to avoid penalties",
        "Reply with personal info to confirm identity",
        "Forward it to friends to ask"
      ],
      a: "Pause, verify via official channels, and avoid clicking links directly",
      e: "Urgency is a social-engineering tactic; verification through trusted channels reduces risk."
    }
  ];

  window.DETECTION_BANK = DETECTION_BANK;
})();
