Deploying the infrastructure
============================

This is a first commit for the investub code base. It is based on spring mvc and spring jdbc. This provides the infrastructure for services that we are going to write in future. Particularly, this involves
	
- build and deploy scripts
- database scripts
- spring configuration files
- library files 
- basic controller example that creates a record into the database and retrieves these results.
 
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
4. Assuming you already have mysql instance installed on your machine, recreate the database from the scripts/recreateDb.sql script, be sure to be in the scripts directory. Use this command (make sure you use the right permission):
```
mysql <recreateDb.sql 
``` 
possibly run
```
CREATE DATABASE mydb;
```
in mysql first and possibly run 
```
mysql mydb <recreateDb.sql
```
5. Start your tomcat server. I start using this command
```
sudo /tomcat/bin/catalina.sh start
```
6. Check your tomcat catalina logs to see that the server started properly.
7. If everything is running as expected. Make two calls via curl or from your browser
 
 * Get all the users in the table: http://localhost/investub/controller/user/getAllUsers
 * Add new users in the table via key value parameter: http://localhost/investub/controller/user/addUser?name=arpanTest
 * Add new users in the table via path variable: http://localhost/investub/controller/user/addUser/arpanTest
 
Sign up page
============

Visit http://localhost/investub/signup.html

* Email Address availability and validity not yet implemented
* Full password recovery not yet implemented 

Asset input page
================

visit http://localhost/investub/add_portfolio.html

* Barebone site, without the design added
