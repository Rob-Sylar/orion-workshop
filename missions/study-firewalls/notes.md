# Firewalls

## Plain English
A firewall is a bouncer for network traffic. Every connection trying to get in or out is checked against a list of rules, and the firewall either lets it through (allow) or turns it away (deny or drop).
Rules usually look at five things, called the 5-tuple: source IP, destination IP, source port, destination port and protocol (TCP or UDP). For example, 'allow any internal PC to reach any web server on TCP port 443' lets people browse HTTPS websites.
Firewalls read rules from the top down and stop at the first match. At the bottom there's normally an 'implicit deny', meaning anything not explicitly allowed gets blocked. That's the default deny idea, and it's best practice.
Most modern firewalls are stateful: they remember connections. If your PC starts a connection out to a website, the firewall automatically allows the reply back in, without needing a separate rule.
Next-generation firewalls (NGFW) go further. They can recognise applications (e.g. 'this is Dropbox', even on port 443), check traffic against known attack signatures (IPS), and filter by user or website category.
You'll also meet host-based firewalls (like Windows Defender Firewall), which protect one machine, as opposed to network firewalls, which protect a whole network edge or segment.

## Key terms
- **Allow / Deny / Drop**: Allow lets traffic through. Deny blocks it and tells the sender. Drop silently discards it, which gives an attacker less information.
- **5-tuple**: Source IP, destination IP, source port, destination port and protocol. These are the fields most rules match on.
- **Stateful**: The firewall tracks connections, so reply traffic is allowed automatically.
- **Implicit deny**: The hidden final rule that blocks anything not explicitly allowed.
- **Ingress / Egress**: Ingress is traffic coming in. Egress is traffic going out. Egress filtering helps stop malware phoning home.
- **DMZ**: A separate network zone for public-facing servers (like a web server), kept apart from the internal network.
- **NGFW**: Next-generation firewall: application awareness, IPS and user-based rules on top of normal filtering.
- **NAT**: Network Address Translation: lets many internal private IPs share one public IP. It's usually done on the firewall.

## In a SOC
Firewall logs are one of the main data sources in a SIEM. Analysts look for things like:
• Port scans: one source hitting lots of ports or IPs in a short time, with mostly denies.
• Beaconing: an internal PC connecting out to the same external IP at regular intervals (e.g. every 60 seconds), which is a classic sign of malware command-and-control (C2).
• Unusual egress: a PC talking out on odd ports, or a big data transfer to an unknown destination late at night (possible data theft).
• Allowed traffic to known-bad IPs: matched against threat intelligence lists.
When an alert fires, a junior analyst checks the source host, the destination's reputation (e.g. on VirusTotal or AbuseIPDB), what else that host has done, and whether it's a false positive (like a backup server legitimately moving lots of data).

## Quiz answers
1. What does a firewall do when traffic matches no rule, under best practice? → **Blocks it (implicit deny)**. Default deny: anything not explicitly allowed is blocked.
2. Which is NOT part of the 5-tuple? → **MAC address**. The 5-tuple is source/destination IP, source/destination port and protocol. MAC addresses are layer 2.
3. A stateful firewall… → **Tracks connections and allows reply traffic automatically**. Stateful means it remembers established connections.
4. What's the difference between deny and drop? → **Drop silently discards; deny rejects and tells the sender**. Dropping gives an attacker less information.
5. Rules are usually processed… → **Top down, first match wins**. Order matters, which is why a broad 'allow any' near the top is dangerous.
6. A PC connects to the same external IP every 60 seconds, all night. This suggests… → **Beaconing to a C2 server**. Regular, timed outbound connections are a classic C2 beacon pattern.
7. Where would you put a public web server? → **In a DMZ**. A DMZ keeps public-facing servers apart from internal systems.
8. Egress filtering means… → **Filtering outgoing traffic**. Egress is outbound. It's useful for stopping malware calling home and data being stolen.
9. One IP hits 1,000 different ports on a server in 30 seconds, mostly denied. What's happening? → **A port scan**. Lots of ports in a short time from one source means scanning.
10. What can an NGFW do that a basic firewall can't? → **Identify applications and run IPS signatures**. Application awareness and IPS are what make it 'next-gen'.

## Homelab practice
- [ ] Open Windows Defender Firewall with Advanced Security (search 'wf.msc'). Look at the inbound rules, then create a rule that blocks ping (ICMPv4) and test it from another device.
- [ ] In your homelab, install pfSense or OPNsense in a VM as a firewall between two virtual networks. Write an allow rule for HTTPS only and test what's blocked.
- [ ] Run an Nmap scan from Kali against a lab VM, then find the scan in the firewall or Wazuh logs. Spotting your own scan is great SOC practice.
