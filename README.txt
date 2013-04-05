The intention of this project is to learn how to build a project of Android and PhoneGap with Maven
-------
#Install Android maven plugin for Eclipse
http://rgladwell.github.com/m2e-android/

#Install maven-android-plugin:
read https://code.google.com/p/maven-android-plugin/wiki/GettingStarted

#Install cordova library in Maven repository:

Goals = install:install-file
Add parameters (name / value):
		(groupId / org.apache.phonegap)
		(artifactId / cordova)
		(version / 2.3.0)
		(packaging / jar)
		(file / C:\cordova-2.3.0\cordova-android\bin\cordova_demo_apps\libs\cordova-2.3.0.jar)
3.3 - Click on 'Run' button.

#Getting started with Android
http://docs.phonegap.com/en/2.3.0/guide_getting-started_android_index.md.html#Getting%20Started%20with%20Android


#Install Android in Jenkins:
https://wiki.jenkins-ci.org/display/JENKINS/Android+Emulator+Plugin

#Useful docs about Android-Maven build:
http://maven-android-plugin-m2site.googlecode.com/svn/index.html
http://www.sonatype.com/books/mvnref-book/reference/android-dev.html