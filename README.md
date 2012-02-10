Infrastructure
==============

- front-end
- back-end
- scripts
- configuration
- integration

Front-end
=========

Location: web/ui

Back-end
========

Location: src/com/betatrek/service

Scripts
=======

Location: scripts

Configuration
=============

Location:
- root
- src
- web/WEB-INF
- WebContent

Server setup
============
 
To deploy this infrastructure. Follow these steps (I assume you have ant installed):
	
1. Download the tomcat from apache site. 
2. Update the build.xml file with the right path to your tomcat webapp directory
```
<property name="tomcat.home"   value="/tomcat/webapps"/>
``` 
3. Build and deploy the code base by
```
cd <project folder>
ant deploywar
```
5. Start your tomcat server. I start using this command
```
sudo /tomcat/bin/catalina.sh start
```
6. Check your tomcat catalina logs to see that the server started properly.
