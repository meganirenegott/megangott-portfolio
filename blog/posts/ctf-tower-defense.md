Most cybersecurity education is abstract. Read about firewalls. Memorize port numbers. Take a quiz. Our campus takes a different approach: the campus *is* a computer network, and you defend it by playing tower defense.

## The campus as a network

The CTF Tower Defense system maps campus infrastructure onto network concepts:

**Ports** are network entry points — HTTP/80, HTTPS/443, SSH/22, DNS/53, SMTP/25, FTP/21, MQTT/1883, Custom/8080. Each port is a physical location on the campus map where attacks arrive.

**Defenses** are cybersecurity tools placed as towers: turrets for basic threat elimination, firewalls with iptables-style rule configuration, IDS sensors for threat detection, honeypots that trap and analyze attackers, encryption zones that slow attacks, backup servers for recovery, and decoys that redirect traffic.

**Bots** are threat types that march through the campus: script kiddies (weak, numerous), trojans (disguised as normal traffic), phishing attacks (target specific NPCs), ransomware (locks buildings), APTs (persistent, stealthy), worms (self-replicating), rootkits (invisible to basic detection), and DDoS swarms (overwhelming volume).

The game runs on a 100ms tick loop with 200ms state broadcasts, typically across 10 waves of increasing difficulty.

![The campus reimagined as a network — buildings labeled with port numbers (HTTP :80, SSH :22, DNS :53, SMTP :25), neon data streams connecting them, script kiddies and trojans marching through entry points while firewalls, IDS sensors, and honeypots defend the paths. Wave 3/10 in progress.](images/ctf-campus-network.png)

## The real tradeoff

Here's what makes it educational instead of just fun: **essential ports must stay open.** You can't just close everything and turtle. HTTP/80 serves the campus website. SSH/22 lets administrators in. Closing a port drains resources because the campus "services" stop working.

This teaches the core security tradeoff that every real sysadmin faces: you can't secure a system by turning it off. You have to keep services running while defending against attacks that use those same services. The game makes this physical and immediate — close too many ports and your resources bleed out. Leave too many open and the bots pour through.

![The port management UI — toggle switches for HTTP :80 (open), SSH :22 (warning: 3 bots incoming), DNS :53 (closed, draining -5/sec), FTP :21 (closed, draining -3/sec). Campus Resources at 67% and falling. A tooltip warns: "Essential ports must stay open — closing drains resources."](images/ctf-port-tradeoff.png)

## The CTF layer

Overlaid on the tower defense is a Capture The Flag social deduction game:

**Red team** earns CVEs (Common Vulnerabilities and Exposures) through learning and quizzes — yes, you literally have to answer cybersecurity questions to unlock attack tools. Red team can prompt-inject campus NPCs, form APT cohorts, deploy hack scripts, capture capybaras (yes, the capybaras), tag graffiti, and hack the student records terminal.

**Blue team** deploys scanners (SIEM, vulnerability scanner, network monitor, log analyzer, packet sniffer), runs forensic investigations, cleanses compromised NPCs, rescues captured capybaras, and fortifies network segments.

Team assignment is **hidden** — neither side knows who's on which team. The social deduction element means you can't trust anyone. The student asking helpful questions in chat might be red team, mapping your defenses.

![Red Team vs Blue Team — on the red side, a hooded attacker deploys scripts while a prompt-injected NPC glitches and a capybara sits in a neon cage. On the blue side, a defender cleanses a compromised NPC with a healing beam while a SIEM dashboard tracks network traffic. A "VS?" in the center represents hidden team assignments.](images/ctf-red-vs-blue.png)

## The Glitch Contagion bridge

The CTF system connects to other campus features through Glitch Contagion — a cross-system status effect:

- Compromised NPCs spread glitch corruption to nearby players
- Corruption level 15+: visual glitch effects overlay your screen
- Corruption level 30+: your pet mutates into a glitch variant (24 variants across 12 pet types)
- Corruption level 60+: you get noclipped into the Backrooms

The contagion creates stakes that extend beyond the game. Getting corrupted during CTF affects your pet, your screen, and might send you into the Backrooms. The game world and the campus world aren't separate — they're the same world, and the consequences of the security game ripple outward.

![Four stages of Glitch Contagion — Level 0-14: normal student and pet on a clean campus. Level 15-29: scan lines and pixel displacement distort the view. Level 30-59: the pet mutates into a glitch variant with corrupted pixels and extra limbs. Level 60+: the screen tears apart and the student is noclipped into the Backrooms' yellow hallways.](images/ctf-glitch-contagion.png)

## Why play teaches better than study

A student who plays three rounds of CTF Tower Defense understands port management, firewall rules, IDS placement, and the open-port tradeoff at an intuitive level. Not because they memorized it — because they *experienced* it. They felt the panic of a DDoS swarm hitting an open port. They felt the satisfaction of a honeypot catching an APT. They felt the resource drain of closing SSH.

Games teach through consequence. Textbooks teach through description. For something as fundamentally experiential as cybersecurity — where the whole discipline is about adversarial thinking and real-time response — the game is the better teacher.
