# Binge - News Aggregation API

<h1>API Endpoint</h1>
<h2>Topic Endpoints</h2>
<h3>Update Topic Information</h3>
Update and aggregate news content based on topics. Use the endpoint `fetch_articles` to request an aggregation of trending news based on Binge topics.

<h3>Return Topic Information</h3>
Given a `topic` parameter, it will return the associated topic information. `topic` is case-sensitive.
```
GET http://binge.azurewebsites.net/api/topics?topic=Your%20Topic
```
<h3>Return All Topic Information</h3>
It will return the all topic information in the database.
```
GET http://binge.azurewebsites.net/api/all_topics
```
<h2>Article Endpoints</h2>
<h3>Return Article Information</h3>
Given a `topic` parameter, it will return the associated articles in an Array. `topic` is case-sensitive. To receive articles for more than one topic, make a comma separated list past using the `favorite` parameter. 
```
GET http://binge.azurewebsites.net/api/articles?topic=Your%20Topic # Single Topic
GET http://binge.azurewebsites.net/api/articles?favorite=Topic%20One,Topic%20Two,Topic%20Three # Multiple Topic
```
<h3>Return All Article Information</h3>
It will return the all article information in the database.
```
GET http://binge.azurewebsites.net/api/all_articles
```
<h3>Add New Article</h3>
Will add a new article given the necessary parameters:
* `topic` - Topic the article belongs to
* `title` - Title of the article
* `publisher` - Source publisher of article
* `publisher_url` - Article URL
* `image_url` - Preview image URL
* `type` - Type of article (0 - Text article, 1 - Video article)

```
GET http://binge.azurewebsites.net/api/add_article?topic=Your%20Topic&title=Your%20Title&publisher=Publisher&publisher_url=Publisher%20Url&image_url=Image%20Url&type=0
```
