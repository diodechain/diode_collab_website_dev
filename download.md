---
title: Download Center
layout: page
class: header--dark
permalink: /download/
redirect_from:
- /resources/download/


### Hero
hero:
  animated: true
  class: hero--right
  heading: Download
  subheading: Get Diode Collab
  scroll: "#app"
  image: hero/download.webp


### Popup: App (used by download popup)
popup:
  title: Diode Collab


### Download: Network
network:
  animated: false
  title: Connect secure assets to your team's Diode Collab environment
  heading: Unlock the Network
  buttons:
  - title: Open ZTNA Console
    url: "https://ztna.diode.io"
    class: "btn--blank btn--arrow"
    target: _blank
  - title: Learn More
    url: "https://diode.io/products/cli/"
    target: _blank
  - title: Try Private AI
    url: "https://ztna.diode.io"
    class: "btn--blank btn--arrow"
    target: _blank

---

{%- include hero.liquid -%}
{%- include download-app-section.liquid -%}
{%- include download.liquid id="network" data="network" -%}
