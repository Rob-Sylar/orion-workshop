# Windows Event Logs & Sysmon

## Plain English
The Windows Event Log is the built-in diary of what happens on a Windows machine. Logons, services starting, accounts created, policies changed: it all gets written down. You view it in Event Viewer (eventvwr.msc) or pull it with PowerShell (Get-WinEvent).

The main logs. Security holds logons, account changes and audit events. System holds drivers, services and reboots. Application holds software messages. There are also many Applications and Services Logs, such as PowerShell/Operational and Windows Defender/Operational.

Every event has an ID, a source (provider), a timestamp, a level and a block of fields (user, IP, process and so on). The ID tells you what kind of thing happened, so learning a handful of IDs makes you quick.

The catch: out of the box, Windows doesn't log process creation with command lines, and it says very little about network connections or file hashes. That's where Sysmon comes in.

Sysmon (System Monitor) is a free Microsoft Sysinternals tool. Once installed as a service with a config file, it writes rich events to its own log (Microsoft-Windows-Sysmon/Operational): full process command lines, parent processes, file hashes, network connections, DNS queries, registry changes and more.

Why it matters: attackers live in processes, command lines and network connections. Sysmon makes those visible, and a SIEM can then collect them. The config matters a lot. A noisy default floods you, so most people start from a community config such as SwiftOnSecurity's sysmon-config or Olaf Hartong's sysmon-modular.

Forwarding: in a company, logs are usually sent to a SIEM by an agent, or by Windows Event Forwarding (WEF) to a central collector, so analysts don't have to log in to each machine.

## Key terms
- **Event ID**: A number that says what type of event it is, e.g. 4624 = successful logon.
- **Event Viewer**: The Windows GUI for browsing event logs. Run eventvwr.msc.
- **Logon Type**: A field in 4624/4625. 2 = at the keyboard, 3 = network (e.g. file share), 10 = Remote Desktop.
- **Sysmon**: Free Sysinternals service that logs process creation, network connections, hashes and more.
- **Sysmon config**: An XML file that decides what Sysmon logs and ignores. It controls the noise.
- **Parent process**: The process that started another one. Word starting PowerShell is a classic red flag.
- **Command line**: The full text used to start a process, including arguments. Gold dust for investigations.
- **Windows Event Forwarding**: Built-in way to send events from many machines to one collector.

## In a SOC
Event logs are the evidence you work from. Typical uses:
• Brute force: lots of 4625 (failed logon) from one source, then a 4624 (success). Check the Logon Type and source IP.
• New persistence or accounts: 4720 (account created), 4732 (added to local Administrators), 7045 (new service installed), 4698 (scheduled task created).
• Covering tracks: 1102 (Security log cleared) or 104 (System log cleared). Almost never innocent.
• Process activity (Sysmon): Event ID 1 process created. Look for odd parent/child pairs like winword.exe → powershell.exe, long encoded commands (-enc) and tools run from Temp or Downloads.
• Network (Sysmon): Event ID 3 network connection. Which process called out, and to where? Event ID 22 logs DNS queries.
• Other Sysmon IDs: 7 image loaded, 8 CreateRemoteThread (injection), 10 process access (e.g. touching LSASS to steal credentials), 11 file created, 13 registry value set.
A good habit: when an alert fires, pull the events either side of it for that host and user, build a timeline, and note the evidence (event ID, time, process, command line) in your ticket.

## Quiz (answers)
1. Which Windows log holds logon and account audit events? **Security**. The Security log holds logon events (4624/4625) and account changes.
2. Event ID 4625 means… **Failed logon**. 4625 is a failed logon. Many in a row can mean password guessing.
3. Logon Type 10 in a 4624 event usually means… **Remote Desktop (RDP)**. Type 10 is RemoteInteractive, i.e. RDP. Worth a look if it's unexpected.
4. Event ID 1102 tells you… **The Security log was cleared**. Clearing the Security log is a common attacker trick to hide activity.
5. Event ID 7045 (System log) records… **A new service being installed**. New services are a common persistence method, so 7045 is a favourite to check.
6. What is Sysmon? **A free Sysinternals tool that logs detailed system activity**. Sysmon is a free Microsoft Sysinternals service that writes rich telemetry.
7. Which Sysmon Event ID is 'Process Create'? **1**. Event ID 1 is process creation, with command line, parent and hashes.
8. Which Sysmon Event ID records a network connection? **3**. Event ID 3 is network connection. 22 is DNS query.
9. Why does a Sysmon config file matter? **It controls what's logged and cuts the noise**. Without a tuned config Sysmon can be very noisy, or miss the things you care about.
10. winword.exe starting powershell.exe with a long encoded command is… **Highly suspicious, a classic malicious macro pattern**. Office apps spawning PowerShell with -enc is a well-known malware delivery pattern.

## Home-lab practice
- [ ] Install Sysmon on a Windows VM (Sysinternals download) with the SwiftOnSecurity config: sysmon64 -accepteula -i sysmonconfig.xml. Open Event Viewer → Applications and Services Logs → Microsoft → Windows → Sysmon → Operational and watch events appear as you open programs.
- [ ] Generate test events and find them: fail a logon 5 times (4625), create a local user and add it to Administrators (4720, 4732), then open cmd and run whoami and find the Sysmon Event ID 1 with its command line and parent process. Practise with PowerShell: Get-WinEvent -FilterHashtable @{LogName='Security';Id=4625} -MaxEvents 10.
- [ ] Do the free TryHackMe rooms 'Windows Event Logs' and 'Sysmon', then forward your VM's logs into Wazuh or Splunk and write a mini triage note for one event: what happened, when, who, and whether it's suspicious.
