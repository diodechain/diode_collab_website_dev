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
  heading: Diode Collab - the world's most secure collaboration app
  content: |
    Diode Collab is end to end encrypted, it stores no data on servers, it requires no phone numbers (or other PII), and blockchain contracts automate how the app works.

    Not only is Diode Collab ISO 27001 and SOC-2 compliant, the tech is actually secure.  

    Diode Collab is protecting team and organizations around the world.  We hope you will come along and experience the peace of mind and satisfaction of having full sovereignty over your data, identities, and relationships.

    If you'd like to chat with one of the team, please
  buttons:
  - title: Get in Touch
    url: "https://contactdiode.paperform.co/"
    target: _blank

---

{%- include hero.liquid -%}

{%- include headline.liquid -%}

{%- include story.liquid -%}

{%- include team.liquid -%}

{%- include article.liquid data="article" -%}
