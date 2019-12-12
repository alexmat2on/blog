---
title: "Integrating Hyperledger Ursa into Hyperledger Iroha"
date: 2019-12-12
tags: ["hyperledger", "blockchain", "cryptography"]
images: ["/images/integration_overview.png"]
---

I originally wrote this reflection for the official [Hyperledger blog](https://www.hyperledger.org/blog/2019/12/12/2019-summer-mentee-project-update-hyperledger-ursa-integration-into-hyperledger-iroha), and decided to repost it here.

---

This year, I had the amazing opportunity to contribute to the open source Hyperledger community as part of the 2019 Hyperledger Mentorship program. Participating in the program also gave me valuable experience in working on open source projects!

## What I worked on
I primarily contributed to Hyperledger Iroha, a permissioned decentralized ledger technology. Iroha is capable of creating and managing assets, identity, and more. Behind the scenes, the efficient ed25519 signature scheme is used for securing transactions, blocks, and consensus votes.

I also worked with Ursa, a Hyperledger project that aims to provide a reusable cryptographic library for other projects in the Hyperledger ecosystem.

Working with both the Iroha and Ursa communities was a very rewarding experience. After completing this project, the thought of making contributions to open source projects no longer feels daunting. Additionally, I had extraordinary guidance from my mentor, Andrei Lebedev, who is part of the Iroha team. Without his mentoring, I do not believe my project would have been as successful as it turned out!

## What I accomplished
### Goal
The main goal of my work was to enable Iroha to call Ursa for verifying and creating cryptographic signatures. 

Accomplishing this goal required the following major steps:

* Integrating Ursa into Iroha’s build process
* Interfacing with Ursa’s ed25519 signature functions 
* Maintaining support for both the original Iroha crypto and Ursa crypto
* Making it easy to choose a cryptography provider through the configuration file

### Challenges
The primary challenge we faced was a slight difference in the original Iroha ed25519 code and the Ursa ed25519 code, preventing Ursa from being a simple drop-in replacement. Overcoming this challenge meant maintaining compatibility with both the existing Iroha crypto library and the Ursa library.

### Integration Overview
{{< figurethemed name="integration_overview" caption="The architectural design of the Ursa integration." >}}

## What comes next
I’m very excited about the potential of this integration. Moving Hyperledger projects onto a standard cryptographic library is beneficial for increasing security, reducing duplicated efforts, and improving the overall ecosystem. I also hope that my work may serve as a reference for other Hyperledger projects that may be interested in integrating Ursa cryptography.

The internship project can be extended in the following ways:

* Support compiling Ursa through Iroha’s build system in non-Unix environments
* Improve documentation for using Ursa cryptography provider
* Support Ursa-compatible ed25519 in Iroha’s client libraries 

As someone interested in working on distributed systems, cryptography, and other areas related to core blockchain development, this was the perfect internship for me. Working on it only solidified my passion for these areas of software engineering, and I plan to continue my career working on blockchain systems and security. 

More details about the implementation of my project are available [here](https://wiki.hyperledger.org/display/INTERN/Hyperledger+Ursa+integration+into+Hyperledger+Iroha); I encourage anybody interested to read more about it!

