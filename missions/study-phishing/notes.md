# Phishing

## Plain English
Phishing is tricking someone into doing something harmful: clicking a link, opening an attachment, typing in a password or sending money. It's done by pretending to be someone trustworthy. It's still the number one way attackers get in.
Types you need to know: regular phishing (mass emails), spear phishing (targeted at one person or team, using real details), whaling (targeting execs), smishing (by text), vishing (by phone call) and BEC (Business Email Compromise, e.g. a fake 'CEO' asking finance to pay an invoice).
Red flags: urgency or fear ('your account will be closed today'), a sender address that doesn't match the display name, look-alike domains (amaz0n-support.co.uk, paypa1.com), links where the real URL doesn't match the text, unexpected attachments (especially .zip, .html, .iso, or Office files asking you to 'enable content'), and requests for passwords, gift cards or bank detail changes.
Email has technical defences: SPF (which servers can send for a domain), DKIM (a digital signature proving the email wasn't changed) and DMARC (what to do if SPF or DKIM fail). Analysts check these in the email headers.
Modern phishing often steals logins with fake Microsoft 365 pages, sometimes even capturing the MFA code in real time (an adversary-in-the-middle attack). That's why phishing-resistant MFA (like passkeys) matters.

## Key terms
- **Spear phishing**: Targeted phishing using details about the victim to look convincing.
- **BEC**: Business Email Compromise: impersonating a boss or supplier to get money or data.
- **SPF**: A DNS record listing which mail servers are allowed to send for a domain.
- **DKIM**: A cryptographic signature on emails proving they came from the domain and weren't altered.
- **DMARC**: A policy telling receivers what to do when SPF/DKIM fail (none, quarantine or reject).
- **Typosquatting**: Registering look-alike domains (micros0ft.com) to fool people.
- **IOC**: Indicator of Compromise: e.g. a malicious URL, sender, domain, IP or file hash.
- **Credential harvesting**: A fake login page built to steal usernames and passwords.

## In a SOC
A huge part of junior SOC work is triaging reported phishing emails. A typical workflow:
1. Get the original email (as an .eml file with full headers), not a forwarded copy.
2. Check the headers: the real 'From' and 'Return-Path', the SPF/DKIM/DMARC results, and the sending IP.
3. Check the IOCs safely: put URLs and attachment hashes into VirusTotal or URLscan.io. Never open links or attachments on your own machine.
4. Scope it: search the mail logs for who else got the same email, and whether anyone clicked or replied.
5. Respond: block the sender, domain and URL, pull the email from every mailbox, reset passwords for anyone who entered credentials, and check their sign-ins for anything suspicious.
6. Document it and let the reporter know. Thanking people who report phishing keeps them reporting.

## Quiz answers
1. An email from 'Microsoft Support' comes from support@micros0ft-help.com. The red flag is… → **A look-alike domain**. micros0ft-help.com is not Microsoft's domain. That's typosquatting.
2. A fake 'CEO' email asks finance to urgently pay a new supplier. This is… → **Business Email Compromise**. Impersonating a boss to get a payment is classic BEC.
3. Phishing by text message is called… → **Smishing**. SMS plus phishing = smishing.
4. Which record lists the servers allowed to send email for a domain? → **SPF**. SPF is the Sender Policy Framework.
5. DKIM proves… → **The email is signed by the domain and wasn't altered**. DKIM is a cryptographic signature check.
6. What's the SAFEST way to check a suspicious link? → **Submit it to URLscan.io or VirusTotal**. Use sandboxes and reputation tools, and never click it yourself.
7. A user entered their password on a phishing page. First priority? → **Reset their password, revoke sessions and check their sign-ins**. Contain first: reset credentials, kill sessions and look for attacker activity.
8. Spear phishing differs from normal phishing because it's… → **Targeted at a specific person using real details**. Targeted, researched and more convincing.
9. Why search mail logs after one phishing report? → **To find everyone else who received it**. Scoping finds other recipients, and anyone who clicked.
10. Which file types are common phishing attachment tricks? → **.zip, .html, .iso, and Office files asking to enable macros**. Attackers use these to get past filters or run code.

## Homelab practice
- [ ] Do the free TryHackMe phishing rooms (search 'Phishing' in the SOC Level 1 path). They give you real .eml files to analyse.
- [ ] Open a spam email in your own Gmail and click ⋮ then 'Show original'. Find the SPF, DKIM and DMARC results and the real sending server.
- [ ] Take 5 suspicious links from your spam folder (don't click them!) and run them through URLscan.io. Write a mini incident note for each one: verdict, IOCs and what action you'd take.
