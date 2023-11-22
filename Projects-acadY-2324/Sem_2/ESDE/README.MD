# ESDE

## 1. Introduction
This course is about learning how to ethically hack computers and at the same time learning how to protect your own computer from being hacked.

## Chapter 1 

- CIA Triad
    - Confidentiality
    - Integrity
    - Availability

Integrity of the data - data is not modified
Confidentiality of the data - data is not read by unauthorized people
Availability of the data - data is available when needed


- impact of cyber attacks
    - physical/digital damage 
        -identity theft 
    - reputation damage
        - loss of trust
    - economic damage
        - loss of money

- Types of Hackers 
    - Black Hat Hacker 
    - White Hat Hacker
    - Grey Hat Hacker

- White Box Pen testing
  - full access to source code
  - full access to documentation
  - Use Static Application Security Testing (SAST) tools
    - They can scan the source code for vulnerabilities
    - without having to run it
- Black Box Pen testing
  - No access to the source code 
  - No access to documentation
  - Use Dynamic Application Security Testing (DAST) tools
    - They can scan the application for vulnerabilities
    - Test all http and html access points 
    - emulates random actions and user behaviors to find vulnerabilities
- Grey Box Pen testing
  - placed in the role of a user of the system
  - Know what the internal components of the system are but not how those components are interact , reflect the actual experience of a potential hacker
  - use a combination of SAST and DAST tools to find vulnerabilities
    - they are able to focus their efforts on the most vulnerable parts of the system, increasing the attack coverage and efficiency of the test

# Chapter 2

## OWASP Top 10

  - ## [A1:Injection](https://github.com/LohJunHao1127/Project-Notes/tree/main/Projects-acadY-2324/Sem_2/ESDE/#a12017-injection)
  - ## [A2:Broken Authentication](https://github.com/LohJunHao1127/Project-Notes/tree/main/Projects-acadY-2324/Sem_2/ESDE/#a22017-broken-authentication)
  - ## [A3:Sensitive Data Exposure](https://github.com/LohJunHao1127/Project-Notes/tree/main/Projects-acadY-2324/Sem_2/ESDE/#a22017-broken-authentication)
  - ## [A4:XML External Entities (XXE)](https://github.com/LohJunHao1127/Project-Notes/tree/main/Projects-acadY-2324/Sem_2/ESDE/#a42017-xml-external-entities-xxe)
  - ## [A5:Broken Access Control](https://github.com/LohJunHao1127/Project-Notes/tree/main/Projects-acadY-2324/Sem_2/ESDE/#a52017-broken-access-control)
  - ## [A6:Security Misconfiguration](https://github.com/LohJunHao1127/Project-Notes/tree/main/Projects-acadY-2324/Sem_2/ESDE/#a62017-security-misconfiguration)
  - ## [A7:Cross-Site Scripting (XSS)](https://github.com/LohJunHao1127/Project-Notes/tree/main/Projects-acadY-2324/Sem_2/ESDE/#a72017-cross-site-scripting-xss)
  - ## [A8:Insecure Deserialization](https://github.com/LohJunHao1127/Project-Notes/tree/main/Projects-acadY-2324/Sem_2/ESDE/#a82017-insecure-deserialization)
  - ## [A9:Using Components with Known Vulnerabilities](https://github.com/LohJunHao1127/Project-Notes/tree/main/Projects-acadY-2324/Sem_2/ESDE/#a92017-using-components-with-known-vulnerabilities)
  - ## [A10:Insufficient Logging&Monitoring](https://github.com/LohJunHao1127/Project-Notes/tree/main/Projects-acadY-2324/Sem_2/ESDE/#a102017-insufficient-loggingmonitoring)



# How To minimize the risk of these flaws

- ## A1:2017-Injection
  - use prepared statements
  - use an ORM
    - Object Relational Mapping
    - a programming technique for converting data between incompatible type systems using object-oriented programming languages
    - this prevents SQL injection attacks by automatically escaping special characters
    
  - use a safe API which avoids the use of the interpreter entirely or provides a parameterized interface


- ## A2:2017-Broken Authentication
  - use multi-factor authentication
  - use a strong hashing algorithm
  - use a strong password policy
  - use a strong session management

- ## A3:2017-Sensitive Data Exposure
  - classify sensitive data
  - Don't store sensitive data unnecessarily
  - Make sure to encrypt or hash all sensitive data at rest and in transit 


- ## A4:2017-XML External Entities (XXE)
  - Use less complex data format such as JSON and avoid serialization of sensitive data
  - Patch or upgrade all XML processors and libraries in use by the application or on the underlying operating system
  - Disable XML external entity and DTD processing in all XML parsers in the application

- ## A5:2017-Broken Access Control
  - Adopt a policy of least privilege or "deny by default" mentality 
  - validate the user's access rights on the server side every time the user requests a resource or performs an action



- ## A6:2017-Security Misconfiguration
  - A minimal platform with only the required components installed should be used , remove all unnecessary features, frameworks, and libraries
  - An automated process to verify the configuration and settings of the application in all environments should be used

- ## A7:2017-Cross-Site Scripting (XSS)
  - Sanitize and validate all client-supplied input data
  - Use frameworks that automatically escape XSS by design such as React, Vue.js, and Angular


- ## A8:2017-Insecure Deserialization
  - Do not accept serialized objects from untrusted sources or tot use sericalization mediums thatonly permit  primitive data types
  - if the above is not possible :
    - implement integrity checks such as digital signatures on any serialized objects to prevent hostile object creation or data tampering
    - Sanitize the data of a serialized through filtering or validation 

- ## A9:2017-Using Components with Known Vulnerabilities
  - Continuously inventorise all componanents used and monitior know security vulnerabilities and patch/ remove the when they have known vulnerabilities
  - Only obtian components from official sources over secure links and prefre signed packages to reduce the chance of including a malicious component

- ## A10:2017-Insufficient Logging&Monitoring 
    - Ensure all login , access control failures and input validation are logged to identify suspicious or malicious accounts and held for enough time to allow forensic analysis









# Chapter 3

### XSS- cross site scripting
1) reflected XSS
2) stored XSS
3) DOM based XSS




### 2 Situations where XSS can be used











