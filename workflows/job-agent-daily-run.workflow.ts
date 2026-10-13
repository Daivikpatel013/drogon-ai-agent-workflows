import { workflow, trigger, node, expr } from '@n8n/workflow-sdk';

const every_day_at_8am = trigger({
  type: 'n8n-nodes-base.scheduleTrigger',
  version: 1.4,
  config: { id: '39e724c9-f05f-4182-b324-8ce465060299', name: 'Every day at 8am', parameters: { rule: { interval: [{ field: 'days', daysInterval: 1, triggerAtHour: 8, triggerAtMinute: 0 }] } } }
});

const get_Saved_Candidates = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { id: '6a17357b-aeea-4826-9ab8-686e5cabe02c', name: 'Get Saved Candidates', parameters: { resource: 'row', operation: 'get', dataTableId: { __rl: true, mode: 'id', value: 'XvUwecRiu90PZ1Xn', cachedResultName: 'job_agent_candidates' }, returnAll: true } }
});

const rotate_Search_Keyword = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    id: '25d73eb3-145e-4aac-9910-ec68e97778ad',
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
  config: { id: 'b179edbd-2268-43e5-a6aa-4436e0e13fd9', name: 'Run Job Agent', parameters: { mode: 'each', source: 'database', workflowId: { __rl: true, mode: 'id', value: 'o7c7Wkk9BoNtTPVL', cachedResultName: 'Job Application AI Agent' }, workflowInputs: { mappingMode: 'defineBelow', value: { candidateName: expr('{{ $json.candidateName }}'), candidateEmail: expr('{{ $json.candidateEmail }}'), resumeText: expr('{{ $json.resumeText }}'), searchKeyword: expr('{{ $json.searchKeyword }}'), searchLocation: expr('{{ $json.searchLocation }}') }, matchingColumns: [], schema: [], attemptToConvertTypes: false, convertFieldsToString: false }, options: { waitForSubWorkflow: true } }, onError: 'continueRegularOutput' }
});

const wf = workflow('RsBNRZA5ayOL8mWc', 'Job Agent - Daily Run', { executionOrder: 'v1' });

export default wf
  .add(every_day_at_8am)
  .to(get_Saved_Candidates)
  .to(rotate_Search_Keyword)
  .to(run_Job_Agent)
