# we are extending everything from tomcat:8.0 image ...
FROM tomcat:8

COPY ./build/libs/LMS-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/LMS.war

CMD ["java","-jar", "/usr/local/tomcat/webapps/LMS.war"]