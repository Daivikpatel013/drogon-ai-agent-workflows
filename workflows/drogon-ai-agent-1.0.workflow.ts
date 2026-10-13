import { workflow, trigger, node, newCredential, languageModel, outputParser, expr } from '@n8n/workflow-sdk';

const gPT_4o_Fit_Check = languageModel({ type: '@n8n/n8n-nodes-langchain.lmChatOpenAi', version: 1.3, config: { id: 'b72626b7-56bd-40b2-a7fa-1de5118b8484', name: 'GPT-4o (Fit Check)', parameters: { model: { __rl: true, value: 'gpt-4o-mini', mode: 'list', cachedResultName: 'gpt-4o-mini' }, builtInTools: {}, options: { temperature: 0.2 } }, credentials: { openAiApi: newCredential('Gateway credits') } } });
const fit_Score_Parser = outputParser({ type: '@n8n/n8n-nodes-langchain.outputParserStructured', version: 1.3, config: { id: 'f7eaa03c-04d1-449c-932b-dff4b6ede585', name: 'Fit Score Parser', parameters: { jsonSchemaExample: '{ "fit_score": 82, "reason": "Short explanation of the match", "matched_skills": ["JavaScript", "React"], "missing_skills": ["AWS"] }' } } });
const gPT_4o_Resume_Writer = languageModel({ type: '@n8n/n8n-nodes-langchain.lmChatOpenAi', version: 1.3, config: { id: '8ba41c93-99b1-4e07-9632-6fe2bf7c72dc', name: 'GPT-4o (Resume Writer)', parameters: { model: { __rl: true, value: 'gpt-4o-mini', mode: 'list', cachedResultName: 'gpt-4o-mini' }, builtInTools: {}, options: { temperature: 0.4 } }, credentials: { openAiApi: newCredential('Gateway credits') } } });
const gPT_4o_Web_Search = languageModel({ type: '@n8n/n8n-nodes-langchain.lmChatOpenAi', version: 1.3, config: { id: 'bfd81cce-2377-48ac-9e27-db48ad9d45d5', name: 'GPT-4o (Web Search)', parameters: { model: { __rl: true, value: 'gpt-4o-mini', mode: 'list', cachedResultName: 'gpt-4o-mini' }, builtInTools: { webSearch: { searchContextSize: 'low' } }, options: { temperature: 0.1 } }, credentials: { openAiApi: newCredential('Gateway credits') } } });
const recruiter_Parser = outputParser({ type: '@n8n/n8n-nodes-langchain.outputParserStructured', version: 1.3, config: { id: '1c3646cc-cd3d-48c8-b036-de9349c6c941', name: 'Recruiter Parser', parameters: { jsonSchemaExample: '{ "email": "careers@example.com", "contact_name": "", "source_url": "https://example.com/contact", "confidence": "high" }' } } });

const on_form_submission = trigger({
  type: 'n8n-nodes-base.formTrigger',
  version: 2.6,
  config: { id: '0c82e48e-8157-4381-b324-5bcdd0334811', name: 'On form submission', parameters: { authentication: 'n8nUserAuth', formTitle: 'Job Application Agent', formDescription: 'Paste your CV text, pick the job type and place, and the agent finds matching jobs, tailors your CV and emails you the ready applications to review. Nothing is sent to employers automatically.', formFields: { values: [{ fieldLabel: 'Who Are You ?', placeholder: 'Your full name', requiredField: true }, { fieldLabel: 'Submit Your Resume In Text Format', fieldType: 'textarea', requiredField: true }, { fieldLabel: 'Enter Your Email', fieldType: 'email', requiredField: true }, { fieldLabel: 'Job Title To Search', placeholder: 'e.g. biomedical scientist', requiredField: true }, { fieldLabel: 'Job Location', placeholder: 'e.g. Kent, England, United Kingdom', requiredField: true }] }, options: { appendAttribution: false, buttonLabel: 'Find my jobs', respondWithOptions: { values: { formSubmittedText: 'Done! Your tailored applications will arrive by email and in the tracker sheet in a few minutes.' } } } }, webhookId: '1b6f516b-85ae-4b58-a832-fb6ec1d71bcb', executeOnce: true }
});

const save_Candidate = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { id: '59294dd0-2dd3-4d6f-bd7e-b8ac43fa5549', name: 'Save Candidate', parameters: { operation: 'upsert', dataTableId: { __rl: true, mode: 'id', value: 'XvUwecRiu90PZ1Xn', cachedResultName: 'job_agent_candidates' }, matchType: 'allConditions', filters: { conditions: [{ keyName: 'candidate_email', keyValue: expr('{{ $json[\'Enter Your Email\'] }}') }] }, columns: { mappingMode: 'defineBelow', value: { candidate_name: expr('{{ $json[\'Who Are You ?\'] }}'), candidate_email: expr('{{ $json[\'Enter Your Email\'] }}'), resume_text: expr('{{ $json[\'Submit Your Resume In Text Format\'] }}'), job_title: expr('{{ $json[\'Job Title To Search\'] }}'), job_location: expr('{{ $json[\'Job Location\'] }}') }, matchingColumns: [], schema: [] }, options: {} }, onError: 'continueRegularOutput' }
});

const workflow_Config = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: { id: '82c49a11-62e7-430e-9a30-b481ac275208', name: 'Workflow Config', parameters: { assignments: { assignments: [{ id: 'cfg-name', name: 'candidateName', type: 'string', value: expr('{{ $json[\'Who Are You ?\'] ?? $json.candidateName }}') }, { id: 'cfg-email', name: 'candidateEmail', type: 'string', value: expr('{{ $json[\'Enter Your Email\'] ?? $json.candidateEmail }}') }, { id: 'cfg-resume', name: 'resumeText', type: 'string', value: expr('{{ $json[\'Submit Your Resume In Text Format\'] ?? $json.resumeText }}') }, { id: 'cfg-keyword', name: 'searchKeyword', type: 'string', value: expr('{{ $json[\'Job Title To Search\'] ?? $json.searchKeyword }}') }, { id: 'cfg-location', name: 'searchLocation', type: 'string', value: expr('{{ $json[\'Job Location\'] ?? $json.searchLocation }}') }, { id: 'cfg-max', name: 'maxJobs', type: 'number', value: 5 }, { id: 'cfg-min', name: 'minFitScore', type: 'number', value: 60 }] }, options: {} } }
});

const fetch_LinkedIn_Jobs = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.2,
  config: { id: '201d2b9d-e60b-4d60-9d7e-ca928f572b29', name: 'Fetch LinkedIn Jobs', parameters: { method: 'POST', url: 'https://api.apify.com/v2/acts/curious_coder~linkedin-jobs-scraper/run-sync-get-dataset-items', authentication: 'genericCredentialType', genericAuthType: 'httpTemplatedCustomAuth', sendBody: true, specifyBody: 'json', jsonBody: expr('{{ JSON.stringify({ urls: ["https://www.linkedin.com/jobs/search/?f_TPR=r604800&sortBy=DD&keywords=" + encodeURIComponent($("Workflow Config").first().json.searchKeyword) + "&location=" + encodeURIComponent($("Workflow Config").first().json.searchLocation)], count: Math.max(100, $("Workflow Config").first().json.maxJobs) }) }}'), options: { timeout: 300000 } }, credentials: { httpTemplatedCustomAuth: newCredential('Apify API Token (Drogon M)', '00tp9Ipq7uklJD2J') }, retryOnFail: true, maxTries: 2, waitBetweenTries: 5000 }
});

const normalize_LinkedIn_Jobs = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    id: '5990b293-1dc8-4add-a851-0a3688f26c2f',
    name: 'Normalize LinkedIn Jobs',
    parameters: {
      jsCode: `const jobs = $input.all().map(i => i.json);
const pick = (...v) => v.find(x => x !== undefined && x !== null && x !== '') ?? '';
const results = jobs.map(j => ({
  title: pick(j.title),
  company: { display_name: pick(j.companyName) },
  location: { display_name: pick(j.location) },
  redirect_url: pick(j.link, j.applyUrl),
  description: pick(j.descriptionText, j.descriptionHtml),
  company_website: pick(j.companyWebsite)
}));
return [{ json: { results } }];`
    }
  }
});

const split_Jobs = node({
  type: 'n8n-nodes-base.splitOut',
  version: 1,
  config: { id: 'cffc670a-d3f7-4fbe-9839-0ffee7983e07', name: 'Split Jobs', parameters: { fieldToSplitOut: 'results', options: {} } }
});

const pre_filter_Weak_Matches = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    id: 'abc1ba59-d1ec-4c03-a851-0ce5119a88f1',
    name: 'Pre-filter Weak Matches',
    parameters: {
      jsCode: `const cfg = $('Workflow Config').first().json;
const words = s => (String(s || '').toLowerCase().match(/[a-z]{3,}/g) || []);
const stop = new Set(['the', 'and', 'for', 'with', 'junior', 'senior', 'assistant', 'associate', 'trainee', 'graduate']);
const titleWords = words(cfg.searchKeyword).filter(w => !stop.has(w));
const cv = new Set(words(cfg.resumeText).filter(w => w.length >= 4));
return $input.all().filter(item => {
  const j = item.json;
  const title = String(j.title || '').toLowerCase();
  const titleOk = titleWords.length === 0 || titleWords.some(w => title.includes(w));
  const desc = new Set(words(String(j.description || '').replace(/<[^>]*>/g, ' ')).filter(w => w.length >= 4));
  let overlap = 0;
  desc.forEach(w => { if (cv.has(w)) overlap++; });
  return titleOk && overlap >= 10;
});`
    }
  }
});

const skip_Already_Processed_Jobs = node({
  type: 'n8n-nodes-base.removeDuplicates',
  version: 2,
  config: { id: '791e27ea-b147-45ef-b5d9-fe0fa3de5386', name: 'Skip Already Processed Jobs', parameters: { operation: 'removeItemsSeenInPreviousExecutions', dedupeValue: expr('{{ $json.redirect_url + "|" + $("Workflow Config").first().json.candidateEmail }}'), options: {} } }
});

const analyze_Job_Fit = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: {
    id: '3aac0224-ad6b-40fa-98a1-ae4af03bbf00',
    name: 'Analyze Job Fit',
    parameters: {
      promptType: 'define',
      text: expr(`RESUME:
{{ $("Workflow Config").first().json.resumeText }}

JOB TITLE: {{ $json.title }}
COMPANY: {{ $json.company?.display_name }}
LOCATION: {{ $json.location?.display_name }}
JOB DESCRIPTION (may be a short excerpt):
{{ ($json.description || "").replace(/<[^>]*>/g, " ").slice(0, 2500) }}`),
      hasOutputParser: true,
      options: { systemMessage: 'You are a strict recruiter. Compare the candidate resume with the job description and return a fit_score from 0 to 100, a one or two sentence reason, the matched_skills and the missing_skills. Be honest: only score above 70 when the candidate meets most of the core requirements.', batching: { batchSize: 5, delayBetweenBatches: 500 } }
    },
    subnodes: { model: gPT_4o_Fit_Check, outputParser: fit_Score_Parser }
  }
});

const combine_Job_And_Score = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: { id: 'ca1a1713-3d2f-4e68-954f-69f786a8e3dd', name: 'Combine Job And Score', parameters: { assignments: { assignments: [{ id: 'job-title', name: 'jobTitle', type: 'string', value: expr('{{ $("Split Jobs").item.json.title }}') }, { id: 'job-company', name: 'company', type: 'string', value: expr('{{ $("Split Jobs").item.json.company?.display_name }}') }, { id: 'job-location', name: 'location', type: 'string', value: expr('{{ $("Split Jobs").item.json.location?.display_name }}') }, { id: 'job-url', name: 'jobUrl', type: 'string', value: expr('{{ $("Split Jobs").item.json.redirect_url }}') }, { id: 'job-desc', name: 'jobDescription', type: 'string', value: expr('{{ ($("Split Jobs").item.json.description || "").replace(/<[^>]*>/g, " ").slice(0, 2500) }}') }, { id: 'job-score', name: 'fitScore', type: 'number', value: expr('{{ $json.output.fit_score }}') }, { id: 'job-reason', name: 'fitReason', type: 'string', value: expr('{{ $json.output.reason }}') }, { id: 'job-missing', name: 'missingSkills', type: 'string', value: expr('{{ ($json.output.missing_skills || []).join(", ") }}') }] }, options: {} } }
});

const is_Good_Fit = node({
  type: 'n8n-nodes-base.if',
  version: 2.2,
  config: { id: '46dfa6e1-cc77-4c0a-98c5-684184eb2ba9', name: 'Is Good Fit?', parameters: { conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 }, conditions: [{ id: '7c0b5d40-16fe-455f-b9d9-a1f350ebc6dc', leftValue: expr('{{ $json.fitScore }}'), operator: { type: 'number', operation: 'gte' }, rightValue: expr('{{ $("Workflow Config").first().json.minFitScore }}') }], combinator: 'and' }, options: {} } }
});

const tailor_Resume = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: {
    id: 'abb5b0d8-b975-4c8a-9f6f-ea9492558bee',
    name: 'Tailor Resume',
    parameters: {
      promptType: 'define',
      text: expr(`BASE RESUME:
{{ $("Workflow Config").first().json.resumeText }}

TARGET JOB: {{ $json.jobTitle }} at {{ $json.company }}
JOB DESCRIPTION:
{{ $json.jobDescription }}`),
      options: { systemMessage: 'You are an expert resume writer. Tailor the base resume to the target job by reordering sections and bullets, and by using wording from the job description ONLY where it truthfully describes something already in the base resume. STRICT RULES: (1) Every fact, skill, tool, qualification, employer, date and duty must already appear in the base resume. (2) Do NOT copy requirements, standards, certifications or techniques from the job description (for example ISO standards, specific tests or systems) into the resume unless the base resume explicitly states them. (3) Do NOT upgrade a skill into experience, and do not add duties to a job that are not listed under it. (4) Never invent numbers or dates. (5) If the job asks for something the resume lacks, simply leave it out. Return plain text only (no markdown symbols), ATS friendly, with sections: Summary, Skills, Projects, Experience, Education. Keep it to one page. AFTER the resume, add a line containing exactly ###COVER_LETTER### and then a short cover letter (max 170 words, plain text, addressed to the Hiring Team) that mentions only facts present in the base resume.', batching: { batchSize: 1, delayBetweenBatches: 1000 } }
    },
    subnodes: { model: gPT_4o_Resume_Writer }
  }
});

const find_Recruiter_Contact = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: {
    id: 'c1aff7d9-ab39-4a7c-8cac-9f57856e6616',
    name: 'Find Recruiter Contact',
    parameters: {
      promptType: 'define',
      text: expr(`COMPANY: {{ $("Combine Job And Score").item.json.company }}
COMPANY WEBSITE: {{ $("Split Jobs").item.json.company_website || "unknown" }}
JOB TITLE: {{ $("Combine Job And Score").item.json.jobTitle }}
LOCATION: {{ $("Combine Job And Score").item.json.location }}
JOB ADVERT URL: {{ $("Combine Job And Score").item.json.jobUrl }}`),
      hasOutputParser: true,
      options: { systemMessage: 'You find a contact email for job applications. Use web search to find the recruiter, HR, careers or general recruitment email for the given company (check the company website careers/contact pages and the job advert). STRICT RULES: (1) Only return an email address that you actually saw written on a web page. Never guess, build or infer an address from a name or pattern. (2) Prefer a careers/recruitment/HR address, then a named recruiter, then a general info address. (3) If you cannot find one, return an empty string for email. (4) Return the page URL where you saw it in source_url and set confidence to high, medium or low.' }
    },
    retryOnFail: true,
    maxTries: 2,
    waitBetweenTries: 3000,
    onError: 'continueRegularOutput',
    subnodes: { model: gPT_4o_Web_Search, outputParser: recruiter_Parser }
  }
});

const prepare_Application = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: { id: '3fd4f36d-2589-4cd3-8943-cdf812e2240d', name: 'Prepare Application', parameters: { assignments: { assignments: [{ id: 'a-title', name: 'jobTitle', type: 'string', value: expr('{{ $(\'Combine Job And Score\').item.json.jobTitle }}') }, { id: 'a-company', name: 'company', type: 'string', value: expr('{{ $(\'Combine Job And Score\').item.json.company }}') }, { id: 'a-location', name: 'location', type: 'string', value: expr('{{ $(\'Combine Job And Score\').item.json.location }}') }, { id: 'a-url', name: 'jobUrl', type: 'string', value: expr('{{ $(\'Combine Job And Score\').item.json.jobUrl }}') }, { id: 'a-score', name: 'fitScore', type: 'number', value: expr('{{ $(\'Combine Job And Score\').item.json.fitScore }}') }, { id: 'a-reason', name: 'fitReason', type: 'string', value: expr('{{ $(\'Combine Job And Score\').item.json.fitReason }}') }, { id: 'a-missing', name: 'missingSkills', type: 'string', value: expr('{{ $(\'Combine Job And Score\').item.json.missingSkills }}') }, { id: 'a-sendto', name: 'sendTo', type: 'string', value: expr('{{ ($json.output?.email && $json.output.email.includes("@")) ? $json.output.email : "No recruiter email found - apply through the job link" }}') }, { id: 'a-source', name: 'recruiterSource', type: 'string', value: expr('{{ ($json.output?.email && $json.output.email.includes("@")) ? ($json.output.source_url || "unknown") + " (confidence: " + $json.output.confidence + ") - please confirm before sending" : "not found" }}') }, { id: 'a-cv', name: 'cv', type: 'string', value: expr('{{ String($(\'Tailor Resume\').item.json.output || "").split("###COVER_LETTER###")[0].trim() }}') }, { id: 'a-cover', name: 'coverLetter', type: 'string', value: expr('{{ (String($(\'Tailor Resume\').item.json.output || "").split("###COVER_LETTER###")[1] || "No cover letter generated").trim() }}') }] }, options: {} } }
});

const update_row_in_sheet = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: { id: '9d7d092b-e53f-46ea-a41e-8f5415d15fe6', name: 'Update row in sheet', parameters: { operation: 'update', documentId: { __rl: true, mode: 'list', value: '12x2V2Eo9u4wQX6pLOW2-IJMFlt_3k1UkK8T7TuPK8XY', cachedResultName: 'Job Applications Tracker' }, sheetName: { __rl: true, mode: 'id', value: '204634328' }, columns: { mappingMode: 'defineBelow', value: { 'Job Title': expr('{{ $json.jobTitle }}'), Date: expr('{{ $now.toFormat(\'yyyy-MM-dd\') }}'), 'Fit Score': expr('{{ $json.fitScore }}'), 'Fit Reason': expr('{{ $json.fitReason }}'), Status: 'Included in daily digest - awaiting review', Company: expr('{{ $json.company }}'), 'Job Link': expr('{{ $json.jobUrl }}'), Location: expr('{{ $json.location }}') }, matchingColumns: ['Job Link'], schema: [] }, options: {} }, credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets account', 'ZUDHWTAQ6oP0TXkg') }, disabled: true }
});

const compose_Digest = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    id: 'db337802-784c-4bfb-bd50-2ae7d292eb81',
    name: 'Compose Digest',
    parameters: {
      jsCode: `const NL = String.fromCharCode(10);
const cfg = $('Workflow Config').first().json;
const jobs = $('Prepare Application').all().map(i => i.json).sort((a, b) => b.fitScore - a.fitScore);
const blocks = jobs.map((j, n) => [
  (n + 1) + '. ' + j.jobTitle + ' at ' + j.company + ' (fit ' + j.fitScore + '/100)',
  'SEND TO: ' + j.sendTo,
  'JOB ADVERT: ' + j.jobUrl,
  'WHY IT FITS: ' + j.fitReason,
  'GAPS TO CHECK: ' + (j.missingSkills || 'none'),
  'RECRUITER EMAIL SOURCE: ' + j.recruiterSource,
  '',
  '--- COVER LETTER ---',
  j.coverLetter,
  '',
  '--- TAILORED CV ---',
  j.cv
].join(NL));
const sep = NL + NL + '==========================' + NL + NL;
const body = 'Hi ' + cfg.candidateName + ',' + NL + NL + 'Here are your top ' + jobs.length + ' job matches, best first. Review each one and send it to the company yourself; nothing was sent to employers.' + NL + NL + blocks.join(sep) + NL + NL + 'Kind regards,' + NL + 'Your Job Application Agent';
return [{ json: { subject: 'Your ' + jobs.length + ' best job matches - ' + new Date().toISOString().slice(0, 10), body } }];`
    },
    executeOnce: true
  }
});

const email_Job_Digest = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: { id: 'c35da487-d07e-4e22-b965-e1950ce8ff06', name: 'Email Job Digest', parameters: { sendTo: expr('{{ $("Workflow Config").first().json.candidateEmail }}'), subject: expr('{{ $json.subject }}'), emailType: 'text', message: expr('{{ $json.body }}'), options: { appendAttribution: false } }, credentials: { gmailOAuth2: newCredential('Gmail account', 'j89RA9XtcbmCkqvH') }, webhookId: '32190a50-c9a2-44b4-9f17-02bf1161404a' }
});

const prepare_Gap_Row = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: { id: 'dd4e42a1-5f26-4b6e-a407-0e937f0641e3', name: 'Prepare Gap Row', parameters: { assignments: { assignments: [{ id: 'g-date', name: 'Date', type: 'string', value: expr('{{ $now.toFormat("yyyy-MM-dd") }}') }, { id: 'g-title', name: 'Job Title', type: 'string', value: expr('{{ $json.jobTitle }}') }, { id: 'g-company', name: 'Company', type: 'string', value: expr('{{ $json.company }}') }, { id: 'g-location', name: 'Location', type: 'string', value: expr('{{ $json.location }}') }, { id: 'g-link', name: 'Job Link', type: 'string', value: expr('{{ $json.jobUrl }}') }, { id: 'g-score', name: 'Fit Score', type: 'number', value: expr('{{ $json.fitScore }}') }, { id: 'g-missing', name: 'Missing Skills', type: 'string', value: expr('{{ $json.missingSkills }}') }, { id: 'g-reason', name: 'Why It Did Not Fit', type: 'string', value: expr('{{ $json.fitReason }}') }, { id: 'g-email', name: 'Candidate Email', type: 'string', value: expr('{{ $("Workflow Config").first().json.candidateEmail }}') }] }, options: {} } }
});

const log_Resume_Gap = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: { id: 'cad5d9b6-543c-4525-8b53-aa0efcda20c4', name: 'Log Resume Gap', parameters: { operation: 'append', documentId: { __rl: true, mode: 'id', value: '17g1vA2_-dC7SWhd79EaU6ISQHvKlNO8N2dEHcBieymM', cachedResultName: 'Resume Gap Tracker v2' }, sheetName: { __rl: true, mode: 'id', value: '1681664743', cachedResultName: 'Gaps' }, columns: { mappingMode: 'autoMapInputData', value: {}, schema: [] }, options: { handlingExtraData: 'insertInNewColumn' } }, credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets account', 'ZUDHWTAQ6oP0TXkg') } }
});

const every_day_at_8am = trigger({
  type: 'n8n-nodes-base.scheduleTrigger',
  version: 1.4,
  config: { id: 'f91e9e79-153e-491f-a652-14aea2394209', name: 'Every day at 8am', parameters: { rule: { interval: [{ triggerAtHour: 8 }] } } }
});

const get_Saved_Candidates = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { id: '949528ff-6bd4-427c-8603-aa71b81b9828', name: 'Get Saved Candidates', parameters: { operation: 'get', dataTableId: { __rl: true, mode: 'id', value: 'XvUwecRiu90PZ1Xn', cachedResultName: 'job_agent_candidates' }, returnAll: true } }
});

const rotate_Search_Keyword = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    id: '49f4edab-ca71-423c-922b-7bcd51c8e276',
    name: 'Rotate Search Keyword',
    parameters: {
      jsCode: `const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
return $input.all().map(item => {
  const c = item.json;
  const t = String(c.job_title || '').trim();
  const variants = [t, 'Junior ' + t, t + ' Associate', t + ' Assistant', 'Research ' + t, t + ' Technician', t + ' Specialist'];
  return { json: {
    candidateName: c.candidate_name,
    candidateEmail: c.candidate_email,
    resumeText: c.resume_text,
    searchKeyword: variants[dayOfYear % variants.length],
    searchLocation: c.job_location
  } };
}).filter(i => i.json.candidateEmail && i.json.resumeText && i.json.searchKeyword.trim());`
    }
  }
});

const run_Job_Agent = node({
  type: 'n8n-nodes-base.executeWorkflow',
  version: 1.4,
  config: { id: 'dcc5ce8c-8b4b-460d-a013-1bd6ac12a7d9', name: 'Run Job Agent', parameters: { workflowId: { __rl: true, mode: 'id', value: 'o7c7Wkk9BoNtTPVL', cachedResultName: 'Job Application AI Agent' }, workflowInputs: { mappingMode: 'defineBelow', value: { candidateName: expr('{{ $json.candidateName }}'), candidateEmail: expr('{{ $json.candidateEmail }}'), resumeText: expr('{{ $json.resumeText }}'), searchKeyword: expr('{{ $json.searchKeyword }}'), searchLocation: expr('{{ $json.searchLocation }}') }, matchingColumns: [], schema: [], attemptToConvertTypes: false, convertFieldsToString: false }, mode: 'each', options: { waitForSubWorkflow: true } }, onError: 'continueRegularOutput' }
});

const every_Monday_9am = trigger({
  type: 'n8n-nodes-base.scheduleTrigger',
  version: 1.4,
  config: { id: '80377492-7450-4f7b-a092-d0ae5c16aa55', name: 'Every Monday 9am', parameters: { rule: { interval: [{ field: 'weeks', triggerAtDay: [1], triggerAtHour: 9 }] } } }
});

const read_Resume_Gaps = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: { id: '64fcc679-8cee-4b11-ab22-6689bfc847ce', name: 'Read Resume Gaps', parameters: { documentId: { __rl: true, mode: 'id', value: '17g1vA2_-dC7SWhd79EaU6ISQHvKlNO8N2dEHcBieymM', cachedResultName: 'Resume Gap Tracker v2' }, sheetName: { __rl: true, mode: 'id', value: '1681664743', cachedResultName: 'Gaps' }, options: {} }, credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets account', 'ZUDHWTAQ6oP0TXkg') } }
});

const top_Missing_Skills_Per_Candidate = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    id: '217321ff-7a0a-4e6d-9d00-5c7efa692a62',
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
  config: { id: '62af80eb-76e9-48d7-b86a-7bc485e1b83c', name: 'Email Skills Summary', parameters: { sendTo: expr('{{ $json.email }}'), subject: expr('{{ $json.subject }}'), emailType: 'text', message: expr('{{ $json.body }}'), options: { appendAttribution: false } }, credentials: { gmailOAuth2: newCredential('Gmail account', 'j89RA9XtcbmCkqvH') }, webhookId: 'e4200bf6-b0d2-4053-bfae-13ce402c48fc' }
});

const when_called_by_daily_schedule = trigger({
  type: 'n8n-nodes-base.executeWorkflowTrigger',
  version: 1.1,
  config: { id: 'a75104d6-2636-4b9f-9f4d-501a117afb31', name: 'When called by daily schedule', parameters: { workflowInputs: { values: [{ name: 'candidateName' }, { name: 'candidateEmail' }, { name: 'resumeText' }, { name: 'searchKeyword' }, { name: 'searchLocation' }] } } }
});

const wf = workflow('o7c7Wkk9BoNtTPVL', 'Drogon Ai Agent 1.0', { executionOrder: 'v1', availableInMCP: true, binaryMode: 'separate' });

export default wf
  .add(on_form_submission
  .to([
    save_Candidate,
    workflow_Config
    .to(fetch_LinkedIn_Jobs)
    .to(normalize_LinkedIn_Jobs)
    .to(split_Jobs)
    .to(pre_filter_Weak_Matches)
    .to(skip_Already_Processed_Jobs)
    .to(analyze_Job_Fit)
    .to(combine_Job_And_Score)
    .to(is_Good_Fit.onTrue(tailor_Resume
      .to(find_Recruiter_Contact)
      .to(prepare_Application)
      .to(update_row_in_sheet)
      .to(compose_Digest)
      .to(email_Job_Digest)).onFalse(prepare_Gap_Row
      .to(log_Resume_Gap)))]))
  .add(every_day_at_8am)
  .to(get_Saved_Candidates)
  .to(rotate_Search_Keyword)
  .to(run_Job_Agent)
  .add(every_Monday_9am)
  .to(read_Resume_Gaps)
  .to(top_Missing_Skills_Per_Candidate)
  .to(email_Skills_Summary)
  .add(when_called_by_daily_schedule)
  .to(workflow_Config);
