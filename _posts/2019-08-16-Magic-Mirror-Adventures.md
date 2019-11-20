---
layout: post
title: 8 Lessons Learned While Building A Magic Mirror
type: "diy"
featured: true
tags:
- MagicMirror
- Smart Mirror
- Raspberry Pi
- DIY
---


<img src="{{ site.url }}/assets/img/posts/magic_mirror/magic_mirror.jpg" class="rotate-img180" style="alignment: center">


### 1) When it is your first time stick with what works

Initially, my plan had involved using an AOC USB External Monitor. However,
upon trying to use it with the Raspberry Pi 2b I ran into a power consumption issue.
The RPi 2b USB 2.0 ports were not strong enough to power the monitor. I did find a [tutorial](https://imkiyoung.wordpress.com/2012/09/18/raspberry-pi-and-aoc-e1649fwu-usb-powered-led-monitor/)
by someone who got it to work but it still involved using a USB Power Bank.

### 2) Research is invaluable

After resolving that I was not going to be able to get the AOC monitor to work with the RPi 2b I did some research and found that the RPi 4 
had just been released and it contained 2xUSB 3.0 ports and 2xUSB 2.0 ports which served my needs perfectly.
However, immediately after installing the latest raspbian image I encountered problems. It seemed to be overheating and the 
USB ports were underpowered. I finally did find a supposed fix online but it seemed to be a long shot and I still would have a lot of configuration to do.
Ironically if I had done a little more research I wouldn't have pursued this avenue and gone with something more conventional to begin with.

### 3) Be flexible to changes in circumstance

So, with the AOC monitor and 2 Raspberry Pi's I had to decide what to next and I opted to try and go more traditional, buying a 
30 dollar used monitor off of ebay that had the right dimensions for the 2 way Acrylic Mirror that was collecting dust. Luckily I was right and the
Acrylic sheet fit almost perfectly over the the monitor save for being about 1 inch too wide and 1 inch too short. But this only led
to the outside case being exposed so I was ok with that error margin. 

### 4) When possible it is better to integrate than build

So after I got the acrylic sheet and got my raspberry pi running with a copy of [MagicMirror](https://github.com/MichMich/MagicMirror/), just laying the 
acrylic on the monitor created an undesirable ghosting effect because of the distance between the LCD screen and the mirror caused by the thickness of the monitor case.
So ultimately I was going to have to remove the monitor case. and it was my original intention to put it all inside a pine or maple box. However, after confering with my girlfriend,
I decided to try and trim the acrylic on one side and enclose it within the existing monitor case. This ultimately made access to the monitor buttons and mounting much, much easier.
 

### 5) Double and Triple Check Labels 

My biggest mistake came after trimming the acrylic. I was able to successfully cut it using a Dremel such that any imperfections would be concealed however, after I cut it I decided to try and 
clean it one last time. I used some Windex wipes that I frequently use with my computer and I was wiping away wondering why it only looked to be worsening until I saw some gray on the wipe.
The mirror "paint" was coming off creating dead spots. In the end, I ordered another acrylic sheet (~28 dollars) and on the new sheet I noticed a label that specifically warned against the use of cleaning
chemicals. Definitely something I wish I would have taken care to read the first time around.

### 6) Following tutorials only takes you so far

One of the issues I had even after abandoning the RPi 4 was that the latest rapsbian image
I had installed for whatever reason was having issues with the wpa_supplicant driver. I spent a whole 
evening going through a variety of walkthroughs and tutorials to try and get it to work when ultimately 
I ended up downloading the previous version Jessie. I wish that I had done this from the start as there was
no functionality with the latest release that I really needed and the previous version was entirely sufficient.

I also found that configuring my pi to not suspend or go blank was somewhat different than was described in a few tutorials.
Ultimately, I got it to work but it is better to know when to move-on when a tutorial isn't working or is outdated.


### 7) Have a set of target features and don't expand it

In the past I have occasionally suffered from "analysis paralysis" or whatever the 
functional equivalent would be for 'hands-on' projects. It would happen when half-way through
the project I would get an idea of how to integrate an additional feature and stuck trying to 
complete that instead of standing up a prototype. What helped prevent that for this project
was my girlfriend who I designed the smart mirror for. Her set of desired features really kept my
project bounded. 

### 8) Its always better to follow a timeline

This project took far longer to put together than I would have liked. My next project would 
definitely benefit from a defined timeline.  


Parts List:

    - *Raspberry Pi 2b [link](https://www.raspberrypi.org/products/raspberry-pi-2-model-b/)
    - *VGA to VGA cable [link](https://www.amazon.com/Rankie-VGA-Cable-Feet/dp/B01KRLYPNE/ref=pd_lpo_sbs_147_t_0?_encoding=UTF8&psc=1&refRID=KXJ70S6PR0H4Z0FPVWDJ)
    - VGA to HDMI Adapter [link](https://www.amazon.com/gp/product/B016HL4CAY/ref=ppx_yo_dt_b_asin_title_o07_s00?ie=UTF8&psc=1)
    - *MicroUSB Cable & 2.5A/5V Charger [link](https://www.amazon.com/Raspberry-Supply-Certified-Compatible-Adapter/dp/B075XMTQJC/ref=sr_1_9?crid=GV6ULW6R9MX&keywords=canakit+raspberry+pi+micro+usb+power+supply%2Fadapter%2Fcharger&qid=1567056472&s=electronics&sprefix=micro+usb++charger+rasp%2Celectronics%2C209&sr=1-9)
    - Wall socket extension cord [link](https://www.amazon.com/gp/product/B01I0176MK/ref=ppx_yo_dt_b_asin_title_o07_s00?ie=UTF8&psc=1)
    - *Universal power cord [link](https://www.amazon.com/Cable-Matters-2-Pack-Heavy-Extension/dp/B0153T1NF8/ref=sr_1_5?keywords=extension+cord&pd_rd_r=d6300b95-da45-4b4c-8798-3ef85a413308&pd_rd_w=hJ8pU&pd_rd_wg=JyRY7&pf_rd_p=67c9d84c-d98a-4415-a549-dd3360e9d207&pf_rd_r=X6BMRQGXYJ730BRYCES5&qid=1567056556&s=gateway&sr=8-5)
    - *MicroSD Card [link](https://www.amazon.com/dp/B073K14CVB/ref=twister_B07B3MFBHY?_encoding=UTF8&psc=1)
    - Two-Way Mirror Acrylic [link](https://www.amazon.com/0-04-Acrylic-See-Through-Mirror-Transparent/dp/B07CWG8DRK/ref=sr_1_3?keywords=2%2Bway%2Bmirror&pd_rd_r=a7692666-ff8f-4e5f-b0cc-3584243b309a&pd_rd_w=iuQHz&pd_rd_wg=pHCY3&pf_rd_p=67c9d84c-d98a-4415-a549-dd3360e9d207&pf_rd_r=T27P4AB39AAVD5F21FSH&qid=1567056850&s=gateway&sr=8-3&th=1)
    - DELL E2010H LCD Monitor (used)  [link](https://www.ebay.com/itm/Dell-E2010H-LCD-Monitor-20-Tested-NO-Stand/163731793645?ssPageName=STRK%3AMEBIDX%3AIT&_trksid=p2057872.m2749.l2649)
    - Fixed Position Wall Mount [link](https://www.amazon.com/gp/product/B000VKCIJU/ref=ppx_yo_dt_b_asin_title_o01_s00?ie=UTF8&psc=1)
    
