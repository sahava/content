# Advanced Content Tracking by Justin Cutroni
http://cutroni.com/blog/2014/02/12/advanced-content-tracking-with-universal-analytics/

Adapted for Google Tag Manager by Simo Ahava

For this code to work, you will need the following:


**TRIGGER**

Create a new Custom Event Trigger, and set Event Name to **scrollEvent**.


**VARIABLES**


Create the following Data Layer Variables:

{{scrollCategory}} - Variable Name: scrollCategory

{{scrollAction}} - Variable Name: scrollAction

{{scrollLabel}} - Variable Name: scrollLabel

{{scrollValue}} - Variable Name: scrollValue

{{scrollNonInteraction}} - Variable Name: scrollNonInteraction

{{scrollMetric1}} - Variable Name: scrollMetric1

{{scrollMetric2}} - Variable Name: scrollMetric2

{{scrollMetric3}} - Variable Name: scrollMetric3

{{scrollDimension}} - Variable Name: scrollDimension


**EVENT TAG**

Create new Universal Analytics Tag of type Event, and set the following fields:


Category - {{scrollCategory}}

Action - {{scrollAction}}

Label - {{scrollLabel}}

Value - {{scrollValue}}

Non-Interaction Hit - {{scrollNonInteraction}}


Custom Dimensions

...set dimension index... - {{scrollDimension}}


Custom Metrics

...set metric index... - {{scrollMetric1}}

...set metric index... - {{scrollMetric2}}

...set metric index... - {{scrollMetric3}}

**CUSTOM HTML TAG**

Create a new Custom HTML Tag, set it to fire on the All Pages trigger, and copy-paste the code in *script.js* into it.
