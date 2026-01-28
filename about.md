---
title: About
layout: page
class: header--dark
permalink: /about/
redirect_from:
- /resources/about/


### Hero
hero:
  animated: true
  heading: Why Diode Collab?
  subheading: Diode Collab is different - it uses blockchain technology to protect identities and to keep data off of servers.
  image: hero/about.webp


### Headline below Hero
headline:
  animated: false
  title: Our team is determined to protect privacy
  text: We believe privacy is a fundamental human right, and that technology should help humans thrive.


### Top Story
story:
  animated: false
  title: Not your keys, not your data
  heading: Why blockchain?
  content: |
    Blockchain allows every individual to have full custody (aka "self custody") of their digital assets.  Diode extends this technology to communications.  
    
    In Diode Collab, every device has an encrypted-on-disk key that proves its authority to communicate on your account's behalf to others using Diode Collab. 
    
    No data is on-chain, only proofs of membership.  Diode's Oasis partnership ensures that even these proofs are opaque to everyone except the members.  
  image:
    src: story/about.svg

### Article: Our desire
article:
  animated: false
  heading: Diode Collab - the world's most secure team collaboration app
  content: |
    Diode Collab is end to end encrypted, it stores no data on servers, it requires no phone numbers (or other PII), and blockchain contracts automate how the app works.

    Not only is Diode Collab ISO 27001 and SOC-2 compliant, the tech is actually secure.  

    Diode Collab is protecting team and organizations around the world.  We hope you will come along and experience the peace of mind and satisfaction of having full sovereignty over your data, identities, and relationships.



### Article: About Diode
article2:
  animated: false
  heading: Who is Diode?
  content: |
    Diode is a blockchain secured networking company that specializes in enterprise grade "zero trust" communications that do not rely on centralized third party components (e.g. PKI or DNS).

    Diode Collab was created by Diode to provide highly secure communication for teams, families, and organizations.  

    The Diode Network is a permissionless worldwide automated communication network - anyone can use it without creating an account with Diode.  All that is required is to create a blockchain defined network and to sponsor the traffic of devices belonging to the network.  The devices can be IoT systems, servers, consumer devices, or SaaS applications (like Diode Collab).

    Diode's other products include Self Custody WireGuard (ZTNA Console) and a suite of Protected AI Solutions.

    If you'd like to chat with one of the team, please
  buttons:
  - title: Visit Diode
    url: "https://diode.io"
    target: _blank

---

{%- include hero.liquid -%}

{%- include headline.liquid -%}

{%- include article.liquid data="article" -%}

{%- include story.liquid -%}

{%- include team.liquid -%}

{%- include article.liquid data="article2" -%}
