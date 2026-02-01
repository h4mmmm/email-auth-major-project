document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
    setupUpload();
    setupBuilder();
    setupPasteAnalysis();
    setupOnboarding();
});

function setupOnboarding() {
    const panels = document.querySelectorAll('.onboarding-panel');
    const closeBtn = document.getElementById('closeOnboarding');

    // Check if previously dismissed
    if (localStorage.getItem('header-analyzer-onboarding-dismissed') === 'true') {
        panels.forEach(p => p.style.display = 'none');
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            panels.forEach(p => p.style.display = 'none');
            // Save preference
            localStorage.setItem('header-analyzer-onboarding-dismissed', 'true');
        });
    }
}

/* ================= TABS ================= */
function setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    if (!tabs.length) return;

    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            // Deactivate all
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            // Activate clicked
            btn.classList.add('active');
            const targetId = btn.dataset.target;
            document.getElementById(targetId).classList.add('active');
        });
    });
}

/* ================= PASTE ANALYSIS ================= */
function setupPasteAnalysis() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const clearBtn = document.getElementById('clearBtn');
    const sampleBtn = document.getElementById('sampleBtn');
    const input = document.getElementById('headerInput');

    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', () => {
            const content = input.value.trim();
            if (!content) return alert("Please paste a header first.");
            runAnalysis(content);
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            input.value = '';
            document.getElementById('results').style.display = 'none';
        });
    }

    if (sampleBtn) {
        sampleBtn.addEventListener('click', () => {
            input.value = getSampleHeader();
        });
    }
}

/* ================= UPLOAD ================= */
function setupUpload() {
    const dropZone = document.getElementById('uploadDropZone');
    const fileInput = document.getElementById('fileInput');

    if (!dropZone || !fileInput) return;

    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#00c6ff';
        dropZone.style.background = 'rgba(255,255,255,0.1)';
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'rgba(255,255,255,0.2)';
        dropZone.style.background = 'transparent';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'rgba(255,255,255,0.2)';
        dropZone.style.background = 'transparent';

        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    });
}

function handleFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const content = e.target.result;
        // If it's an EML, we might need to separate header from body, 
        // but for now we just treat the top part as header for analysis.
        runAnalysis(content);
    };
    reader.readAsText(file);
}

/* ================= BUILDER ================= */
function setupBuilder() {
    const buildBtn = document.getElementById('buildBtn');
    if (!buildBtn) return;

    buildBtn.addEventListener('click', () => {
        const scenario = document.getElementById('scenarioSelect').value;
        const builtHeader = generateScenarioHeader(scenario);

        // Switch to Paste tab and fill it
        document.querySelector('[data-target="tab-paste"]').click();
        document.getElementById('headerInput').value = builtHeader;

        // Auto run
        runAnalysis(builtHeader);
    });
}

function generateScenarioHeader(type) {
    const common = `To: victim@target.com\nDate: ${new Date().toUTCString()}`;

    switch (type) {
        case 'legit':
            return `Authentication-Results: mx.google.com; spf=pass; dkim=pass; dmarc=pass\nReceived: from mail.google.com\nFrom: support@google.com\nSubject: Security Alert\n${common}`;

        case 'spf-fail':
            return `Authentication-Results: mx.google.com; spf=fail (1.2.3.4 not authorized)\nReceived: from unknown-server.com\nFrom: support@bank.com\nSubject: Urgent: Update Details\n${common}`;

        case 'dkim-fail':
            return `Authentication-Results: mx.google.com; dkim=fail (signature invalid)\nFrom: service@paypal.com\nSubject: Invoice #99232\n${common}`;

        case 'dmarc-fail':
            return `Authentication-Results: mx.google.com; spf=pass; dkim=pass; dmarc=fail (alignment mismatch)\nFrom: ceo@company.com\nReturn-Path: attacker@evil.com\nSubject: Wire Transfer Request\n${common}`;

        case 'phishing':
            return `Authentication-Results: mx.google.com; spf=none; dkim=none\nFrom: security@apple-id-verify.com\nReply-To: hacker@secure-verify.net\nSubject: Your account is locked\n${common}`;

        default:
            return getSampleHeader();
    }
}

/* ================= CORE ANALYSIS ================= */
async function runAnalysis(rawText) {
    // Show Loading
    document.getElementById('results').style.display = 'none';
    document.getElementById('loadingOverlay').style.display = 'flex';

    // Simulate processing
    await new Promise(r => setTimeout(r, 800));

    document.getElementById('loadingOverlay').style.display = 'none';
    document.getElementById('results').style.display = 'block';

    const header = parseHeader(rawText);
    renderResults(header, rawText);
}

function parseHeader(raw) {
    // Normalize newlines
    const text = raw.replace(/\r\n/g, '\n');

    const getVal = (name) => {
        const match = text.match(new RegExp(`^${name}:\\s*(.*)$`, 'im'));
        return match ? match[1].trim() : null;
    };

    const authRes = getVal('Authentication-Results') || '';

    // Extract SPF/DKIM/DMARC from Auth-Results
    const extractAuth = (type) => {
        const m = authRes.match(new RegExp(`${type}=([a-z]+)`, 'i'));
        return m ? m[1].toLowerCase() : 'none';
    };

    return {
        from: getVal('From') || 'Unknown',
        to: getVal('To') || 'Unknown',
        subject: getVal('Subject') || '(No Subject)',
        date: getVal('Date') || 'Unknown',
        returnPath: getVal('Return-Path'),
        replyTo: getVal('Reply-To'),
        messageId: getVal('Message-ID'),
        spf: extractAuth('spf'),
        dkim: extractAuth('dkim'),
        dmarc: extractAuth('dmarc'),
        received: getVal('Received') || 'Unknown'
    };
}

/* ================= RENDERING ================= */
function renderResults(data, rawHeader) {
    // Basic Details
    document.getElementById('subjectVal').textContent = data.subject;
    document.getElementById('fromVal').textContent = data.from;
    document.getElementById('toVal').textContent = data.to;
    document.getElementById('dateVal').textContent = data.date;
    document.getElementById('msgIdVal').textContent = data.messageId || '—';
    document.getElementById('returnPathVal').textContent = data.returnPath || '—';
    document.getElementById('replyToVal').textContent = data.replyTo || '—';

    // Auth Cards
    updateAuthCard('spf', data.spf);
    updateAuthCard('dkim', data.dkim);
    updateAuthCard('dmarc', data.dmarc);

    // Score & Verdict
    const score = calculateScore(data);
    document.getElementById('trustScore').textContent = score;
    updateVerdict(score);

    // Advanced Sections (New from Forensics)
    renderFindings(data);
    renderTimeline(data);
    renderRemediation(data);

    // Raw Header
    document.getElementById('rawHeader').textContent = rawHeader;
}

function updateAuthCard(type, status) {
    const el = document.getElementById(`${type}Status`);
    el.textContent = status.toUpperCase();
    el.className = `status ${getStatusClass(status)}`;

    const explain = document.getElementById(`${type}Explain`);
    if (status === 'pass') explain.textContent = 'Authenticated successfully.';
    else if (status === 'fail') explain.textContent = 'Check failed.';
    else explain.textContent = 'Not found or neutral.';
}

function getStatusClass(status) {
    if (status === 'pass') return 'ok';
    if (status === 'fail') return 'bad';
    return 'warn';
}

function calculateScore(data) {
    let score = 50; // Base

    if (data.spf === 'pass') score += 15; else if (data.spf === 'fail') score -= 15;
    if (data.dkim === 'pass') score += 15; else if (data.dkim === 'fail') score -= 15;
    if (data.dmarc === 'pass') score += 20; else if (data.dmarc === 'fail') score -= 20;

    // Penalty for Reply-To mismatch
    if (data.replyTo && !data.from.includes(data.replyTo)) score -= 10;

    return Math.max(0, Math.min(100, score));
}

function updateVerdict(score) {
    const title = document.getElementById('verdictTitle');
    const summary = document.getElementById('plainSummary');

    if (score >= 80) {
        title.textContent = "Likely Legitimate";
        title.style.color = "#4ade80";
        summary.textContent = "This email passed most authentication checks.";
    } else if (score >= 50) {
        title.textContent = "Suspicious";
        title.style.color = "#facc15";
        summary.textContent = "Some checks passed, but proceed with caution.";
    } else {
        title.textContent = "High Risk";
        title.style.color = "#f87171";
        summary.textContent = "This email failed multiple checks. Likely spoofed.";
    }
}

/* ================= NEW SECTIONS (From Forensics) ================= */

function renderFindings(data) {
    const container = document.getElementById('findingsList');
    container.innerHTML = '';

    const addFinding = (type, title, msg) => {
        container.innerHTML += `
            <div class="analysis-card ${type}">
                <h4 class="card-title">${title}</h4>
                <p class="card-content">${msg}</p>
            </div>
        `;
    };

    if (data.spf !== 'pass') addFinding('error', 'SPF Issues', 'Sender IP not authorized.');
    if (data.dkim !== 'pass') addFinding('warning', 'DKIM Issues', 'Signature invalid or missing.');
    if (data.dmarc === 'fail') addFinding('error', 'DMARC Fail', 'Email rejected by DMARC policy.');

    if (data.replyTo && data.from && !data.from.includes(data.replyTo)) {
        addFinding('warning', 'Reply-To Mismatch', 'Reply address differs from Sender.');
    }

    if (container.innerHTML === '') {
        addFinding('success', 'No Critical Issues', 'Authentication looks good.');
    }
}

function renderRemediation(data) {
    const container = document.getElementById('remediationList');
    let html = '<ul class="learn-card-list">';

    if (data.spf !== 'pass') html += '<li>Add sending IP to SPF record.</li>';
    if (data.dkim !== 'pass') html += '<li>Rotate DKIM keys or check selector.</li>';
    if (data.dmarc === 'none') html += '<li>Enable DMARC monitoring (p=none).</li>';

    html += '<li>Always verify "From" and "Reply-To" alignment.</li>';
    html += '</ul>';

    container.innerHTML = html;
}

function renderTimeline(data) {
    const container = document.getElementById('emailTimeline');
    container.innerHTML = `
        <div class="timeline-item">
            <div class="timeline-time">Step 1: Origin</div>
            <div class="timeline-content">Sent from: <strong>${data.received.split(' ')[0]}</strong></div>
        </div>
        <div class="timeline-item">
            <div class="timeline-time">Step 2: Transit</div>
            <div class="timeline-content">Passed through MTAs...</div>
        </div>
        <div class="timeline-item">
            <div class="timeline-time">Step 3: Verification</div>
            <div class="timeline-content">
                SPF: <b>${data.spf.toUpperCase()}</b> | DKIM: <b>${data.dkim.toUpperCase()}</b>
            </div>
        </div>
    `;
}

function getSampleHeader() {
    return `Authentication-Results: mx.google.com;
 spf=pass smtp.mailfrom=example.com;
 dkim=pass header.i=@example.com;
 dmarc=pass header.from=example.com

Received: from mail.example.com (203.0.113.5)
From: Example <test@example.com>
To: User <user@example.net>
Subject: Test email
Date: Tue, 1 Jan 2025 12:00:00 +0800`;
}
