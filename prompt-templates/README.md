# Prompt Templates for SOC Analyst Agent

This folder contains example prompt templates for guiding an L1/2 SOC analyst agent. Each template focuses on a common task that a first or second level analyst may need to perform when using Splunk and web research.

## Available Templates

- `alert-triage.md` - Initial review of a new alert.
- `false-positive-check.md` - Verify whether an alert is a false positive.
- `splunk-search.md` - Craft or explain Splunk search queries.
- `web-research.md` - Steps to research indicators on the web.
- `incident-documentation.md` - Record actions taken during an investigation.
- `escalation.md` - Provide information required to escalate an incident.
- `threat-hunting.md` - Conduct hypothesis-driven hunting in Splunk.
- `dashboards.md` - Review Splunk dashboards for anomalies.
- `daily-summary.md` - Summarize notable events for the day.
- `ioc-investigation.md` - Investigate a specific indicator of compromise.

These templates can be customized with variables such as `{alert_id}`, `{splunk_query}`, or `{indicator}` to generate clear instructions for the analyst agent.
