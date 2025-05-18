# False Positive Check

**Role:** L1/2 SOC Analyst

**Objective:** Determine if a triggered alert is a false positive using Splunk searches and contextual information.

**Template:**
```
You are an L1/2 SOC analyst. Investigate alert {alert_id} by running the provided Splunk search:
{splunk_query}
Document whether the alert is a true or false positive. Note indicators that support your decision and recommend action if required.
```
