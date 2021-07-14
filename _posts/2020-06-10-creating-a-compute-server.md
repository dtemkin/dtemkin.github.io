---
layout: post
title: Creating a personal compute and database server
author: Dan Temkin
excerpt: Successes and pitfalls in my attempt to take an old Mac Pro Workstation and convert it into an 'all-in-one' personal server.   
excerpt_separator: <!-- more -->
type: project
comments: false
tags:
- Home Server
- Python
- Jupyter
- Ubuntu
- Hackintosh
- Tensorflow
- SQL
- Database Server
- DDNS
- Port Forwarding
---

### Motivation
   Recently, I have been exploring tensorflow as a means to 'level-up' my Data Science 
   knowledge and I found out that my old W520 while definitely suped up in terms of ram and cpu
   has a GPU that only runs CUDA 3.0 whereas tensorflow requires a minimum of CUDA 3.5.
   So I decided why not convert this old Mac Pro 3,1 I found next to the dumpster into a
   'compute' server (or single-node computing cluster) which I could use to train and run more complex 
   machine learning models and/or perform passive data collection.
            
   There are other reasons to do this DIY like it affords one the opportunity to learn how
   the resources are configured and constructed but more that anything I was simply worried that if I tried to run any tests using EC2 or another cloud service
   I would end up with a 3000+ dollar bill from Amazon because of some mistaken loop in my code.
            
   While re-building the server I encountered some interesting obstacles and interesting articles
   which provided advice with varying degrees of utility but I thought 
   others may find a more concise guide useful if they are attempting a similar project.


### Lessons

#### 1) Selecting the appropriate device for the use-case


#### 2) Pay attention to model numbers 

#### 3) 



## Steps

### II. Setup (Hardware)

##### a. <b>Choosing a computer</b> <em>(optional)</em>


##### b. <b>Upgrading RAM and CPU</b>
    
Originally, I had been under the impression that I was using a Mac Pro 1,1 
this is because I was dumb and went off the model written on the case rather 
than the model number printed on the motherboard. Luckily it didn't matter but
I wasn't able to purchase the best available upgrades. I upgraded the CPU from two
Intel Core Duos 2.66 ghz to two Intel Xeon X5355 2.66 ghz Quad-Core Processors. Technically,
the max upgrade for the Mac Pro 1,1 was Xeon X5365 3.0 ghz but on ebay they were upwards of
40-50 dollars more. So I went with the slightly lower clock speed because it is hard
to say no when it is only 12 dollars. 

I also bought a load of (8x) 667 mhz 2 GB FB-DIMM RAM Modules to replace the 4 GB 
that was in there. I had some issues installing this but more on that below.

##### c. <b>Replace broken components</b>
     
After installing the new RAM, the 2 'new' CPUs and dressing the wounds I sustained
while contending with the massive heat sink towers. I booted up the machine and
found there was two red lights on one of the RAM card risers and only four of the
modules were registering with some fiddling I got the machine to see 10 GB but it 
was inconsistent. After going through the process of resetting the [PRAM and SMC](https://thenextweb.com/lifehacks/2017/06/14/how-when-why-to-reset-the-pram-smc-on-your-mac/)
I was still getting DIMM errors, so, I went online and looked for a new/used RAM riser.

After installing the new riser, I still have one light on that I could not fix
with a different RAM card or SMC/PRAM reset so I gave up and settled with my extra 4 GB
of RAM and gave up on the last 2.
      
##### d. <b>Choosing the right GPU</b>
      
Choosing a GPU was probably the most difficult part of this process. First off let me just
say that the models and 'makers' of video cards is possibly the most backwards and confusing
thing I have ever encountered. I was not able to find very much info on which models were good and 
which weren't since I wasn't sticking with Mac OS I was not limited by the available drivers
which apparently are OS version dependent and therefore limited by your computers
ability to upgrade to newer versions. 

Since I wasn't limited by driver availability I tried several searches looking for information
on which cards were best for ML/DS while also on a budget and most of the recommended cards
were still in the 500+ dollar range. 
  


### III Setup (Host System)
    
##### a1. <b> Install Ubuntu Server </b>
    
    
##### a2. Adding additional users <em>(optional)</em>

##### b. Install Software/Reconfigure SSH
  
  
### IV Setup (Router/Networking)

##### a. <b>Configuring Port Forwarding Rules</b>
        
Ports are used to direct specific types of traffic over a web connection. 
In case the notion of ports are confusing imagine that your computer is like a 
mini-mall, the ip address is analogous to the address or location of the mall while
the ports are like the different types of stores (clothing, food, electronics, etc.),
and each store is a program or service running on your computer. Not the best
analogy I know but I hope it is useful to someone.

All ports are integers from 1 - 65535 and some services like ssh, ftp, http
have dedicated ports though these can often be configured to other values 
the dedicated ports are the defaults. For ssh, ftp and http these are 22, 23 and 80,
respectively. When altering a default port or choosing a public port it is
best practice to pick a port value that is not reserved in many cases your service
will not work if you pick a reserved and registered port. [Here](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers) 
is a list of reserved ports. Or for a more basic view of ports go [here](https://en.wikipedia.org/wiki/Port_(computer_networking).  

<b><em>Anyway, in short, anything between 49152-65535 is fair game and cannot be registered but any port that is marked unofficial will work as
long as there is not a competing service using the port.</em></b>

Due to services like [shodan](https://www.shodan.io/) which actively probes the web for hosts and open ports, 
I am not sure if it really matters in terms of security what your port is though it is probably best practice
to pick a public port that is slightly unconventional. It is important though that the 
public port not be otherwise reserved.

Last important note, just be sure to write down whichever, port you choose for ssh on local and for
public on a notecard or sticky note. This way you wont have to wipe everything if you need to reset
your router and lose a reference to the port forwarding rules.
        
        
##### b. Register for DDNS
    
If you are using a typical home internet service plan then your public IP
assigned by your ISP is dynamic and this is not something you change. This 
presents a problem because if we use the public IP to SSH into the server we need 
that IP to remain static.

The solution is to use a DDNS (or Dynamic DNS) service. There are many alternatives, most of 
which have a 'freemium' option. I personally use [No-IP](https://www.noip.com/).
The service is free for up to 3 hosts and the 'standard' hosts expire in 30 days.
If you would like to make the host more permanent you can purchase an 'enchanced' 
service for one of the hosts for ~25 USD per year.

In any case, no-ip is very easy to set up. All you need to do is install the 
software and login.

You can install the software by following these [instructions](https://www.noip.com/support/knowledgebase/installing-the-linux-dynamic-update-client-on-ubuntu/).
However, I did have an issue with running it from <code>/usr/local/bin/noip2</code>
as the instructions suggest, instead I ran the commands from the 
<code>/noip-2.1.9-1</code> directory. Not sure if this will cause an issue with
the automatic updating but I will update this post if I encounter problems.
        
### (4) Deploy
   
    
### (5) Test


### (6) Post-Considerations/Final Thoughts

  1) 
    






