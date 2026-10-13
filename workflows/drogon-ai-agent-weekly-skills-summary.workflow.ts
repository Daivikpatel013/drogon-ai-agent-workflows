import { workflow, trigger, node, newCredential, expr } from '@n8n/workflow-sdk';

const every_Monday_9am = trigger({
  type: 'n8n-nodes-base.scheduleTrigger',
  version: 1.4,
  config: { id: 'e4bab226-fcf3-4def-8a26-0ab43b4861a5', name: 'Every Monday 9am', parameters: { rule: { interval: [{ field: 'weeks', triggerAtDay: [1], triggerAtHour: 9 }] } } }
});

const read_Resume_Gaps = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: { id: 'd92b2552-edae-49ae-bb99-d91e3bbf71bb', name: 'Read Resume Gaps', parameters: { documentId: { __rl: true, mode: 'id', value: '17g1vA2_-dC7SWhd79EaU6ISQHvKlNO8N2dEHcBieymM', cachedResultName: 'Resume Gap Tracker v2' }, sheetName: { __rl: true, mode: 'id', value: '1681664743', cachedResultName: 'Gaps' }, options: {} }, credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets account', 'ZUDHWTAQ6oP0TXkg') } }
});

const top_Missing_Skills_Per_Candidate = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    id: 'bdf8295a-f61c-4a36-b36d-3617942a9ffa',
    name: 'Top Missing Skills Per Candidate',
    parameters: {
      jsCode: `const NL = String.fromCharCode(10);
const cutoff = Date.now() - 7 * 86400000;
const byEmail = {};
for (const item of $input.all()) {
  const r = item.json;
  const email = String(r['Candidate Email'] || '').trim();
  if (!email || !email.includes('@')) continue;
  const d = new Date(r['Date']).getTime();
  if (!isNaN(d) && d < cutoff) continue;
  const skills = String(r['Missing Skills'] || '').split(',').map(s => s.trim()).filter(Boolean);
  byEmail[email] = byEmail[email] || { jobs: 0, counts: {} };
  byEmail[email].jobs++;
  for (const s of skills) {
    const k = s.toLowerCase();
    byEmail[email].counts[k] = (byEmail[email].counts[k] || 0) + 1;
  }
}
return Object.entries(byEmail).map(([email, v]) => {
  const top = Object.entries(v.counts).sort((a, b) => b[1] - a[1]).slice(0, 8);
  if (!top.length) return null;
  const lines = top.map(([s, n], i) => (i + 1) + '. ' + s + ' (missing in ' + n + ' of ' + v.jobs + ' jobs)').join(NL);
  return { json: { email, subject: 'Your weekly skills gap summary', body: 'Hi,' + NL + NL + 'Across ' + v.jobs + ' jobs that did not quite fit you this week, these skills came up most often:' + NL + NL + lines + NL + NL + 'Learning or adding the top ones to your CV (if you already have them) will unlock more matches.' + NL + NL + 'Your Job Application Agent' } };
}).filter(Boolean);`
    }
  }
});

const email_Skills_Summary = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: { id: 'e493f5ad-6137-4438-9e16-1d9d38ac49c6', name: 'Email Skills Summary', parameters: { sendTo: expr('{{ $json.email }}'), subject: expr('{{ $json.subject }}'), emailType: 'text', message: expr('{{ $json.body }}'), options: { appendAttribution: false } }, credentials: { gmailOAuth2: newCredential('Gmail account', 'j89RA9XtcbmCkqvH') }, webhookId: 'ab20f0e2-fd57-49cb-aaa4-f5f755f15063' }
});

const wf = workflow('LnAxGjN3Vb1kTzhK', 'Drogon Ai Agent 1.0- Weekly Skills Summary', { executionOrder: 'v1' });

export default wf
  .add(every_Monday_9am)
  .to(read_Resume_Gaps)
  .to(top_Missing_Skills_Per_Candidate)
  .to(email_Skills_Summary)
