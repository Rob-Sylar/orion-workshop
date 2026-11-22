# How a SIEM works

## Plain English
A SIEM (Security Information and Event Management) is the SOC's main screen. It collects logs from everywhere (PCs, servers, firewalls, email, cloud) into one place, so analysts can search them and get alerts when something looks bad.
1. Collect. Agents or forwarders on machines (e.g. the Wazuh agent, the Splunk Universal Forwarder) send logs in. Network devices usually send via syslog.
2. Parse and normalise. Every source writes logs differently. The SIEM pulls out fields (user, source IP, event ID, process name) into a common format, so 'username' means the same thing whichever source it came from.
3. Correlate and detect. Rules look for patterns across events, e.g. '10 failed logins followed by a success for the same account within 5 minutes' suggests brute force. Many SIEMs map detections to MITRE ATT&CK techniques.
4. Alert and investigate. Matches create alerts with a severity. Analysts triage them: is it real (true positive) or noise (false positive)? Then they investigate and escalate.
5. Store and report. Logs are kept for a set time (retention) for investigations, compliance and spotting long-running attacks.
Common SIEMs: Splunk, Microsoft Sentinel, Elastic, IBM QRadar, and free/open-source Wazuh (which you've got in your homelab plan).

## Key terms
- **Log source**: Anything that sends logs: Windows, firewalls, email gateways, cloud apps.
- **Parsing / normalisation**: Pulling fields out of raw logs and mapping them into a common format.
- **Correlation rule**: A detection that links multiple events to spot a pattern.
- **True / False positive**: TP: the alert is real and bad. FP: the alert fired but it's harmless.
- **Triage**: Quickly deciding whether an alert is real, how serious it is, and what to do next.
- **MITRE ATT&CK**: A public framework of attacker tactics and techniques, used to label detections.
- **Retention**: How long logs are kept before deletion.
- **SOAR**: Security Orchestration, Automation and Response: automates repeatable response steps.

## In a SOC
A Tier 1 analyst's day in a SIEM looks like this:
• Work the alert queue, highest severity first.
• For each alert: read what fired, look at the raw events, then pivot (search the same user, host or IP in the hours before and after).
• Enrich with context: is this user an admin? Is this IP known-bad? Is this normal for that server?
• Decide: close it as a false positive (with a reason), or escalate to Tier 2 with clear notes covering the timeline, IOCs and what you've already checked.
• Suggest tuning for noisy rules, so the team isn't drowning in false positives.
Key Windows event IDs you'll search constantly: 4624 (successful logon), 4625 (failed logon), 4688 (process created), 4720 (user account created), 4732 (user added to a local group) and 1102 (security log cleared, which is very suspicious).

## Quiz answers
1. What's the main job of a SIEM? → **Collect, search and alert on logs from across the organisation**. A SIEM centralises logs and detects suspicious patterns.
2. Making 'user', 'username' and 'acct' fields all mean the same thing is… → **Normalisation**. Normalisation puts different log formats into one common schema.
3. 10 failed logins then a success for one account in 5 minutes suggests… → **Brute force or password guessing**. That's a classic correlation rule for brute force.
4. Windows Event ID 4625 means… → **Failed logon**. 4624 = success, 4625 = failure.
5. Event ID 1102 (security log cleared) is… → **Highly suspicious, since attackers clear logs to hide**. Log clearing is a strong sign someone's covering their tracks.
6. An alert fired, but it was the IT team's legitimate admin script. That's a… → **False positive**. The alert fired, but the activity was harmless.
7. MITRE ATT&CK is… → **A framework of attacker tactics and techniques**. It's used to label and organise detections.
8. Which is a free, open-source SIEM/XDR you can run at home? → **Wazuh**. Wazuh is free and open-source, and great for homelabs.
9. Searching the same user or host before and after an alert is called… → **Pivoting**. Pivoting builds the bigger picture around an alert.
10. SOAR is used to… → **Automate repeatable response steps**. SOAR automates enrichment and response playbooks.

## Homelab practice
- [ ] Install Wazuh (the all-in-one OVA in VirtualBox is easiest), add a Windows VM with the agent, then fail a login 5 times and find the 4625 events on the Wazuh dashboard.
- [ ] Do the TryHackMe 'Splunk' and 'Wazuh' rooms in the SOC Level 1 path. Free practice on real SIEM interfaces.
- [ ] Create a new local user on your Windows VM and add it to Administrators. Find events 4720 and 4732 in your SIEM and write a mini triage note: what happened, when, by whom, and whether it's suspicious.
