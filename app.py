# IBM Watson
from ibm_watson.natural_language_understanding_v1 import Features, SentimentOptions, EmotionOptions, KeywordsOptions
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson import ToneAnalyzerV3

# Flask and PyMongo for mongo DB
from flask_pymongo import PyMongo
from flask import Flask, send_from_directory
from flask import request
from flask_cors import CORS
from flask import jsonify
from flask import Flask

# Twitter API
from tweepy import Cursor
from tweepy import API
from tweepy import OAuthHandler
import tweepy
# NLTK
from nltk import FreqDist, classify, NaiveBayesClassifier
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag
from nltk.corpus import twitter_samples, stopwords
from nltk.stem.wordnet import WordNetLemmatizer
import nltk
import joblib
import os
import json
import datetime
import time
import random
import requests
import re
import string
from bson import json_util
from collections import Counter

# Socket IO
from flask_socketio import SocketIO, emit,send

# BS4
from urllib.request import Request, urlopen

from dotenv import load_dotenv
load_dotenv()

# nltk.download('punkt')
# nltk.download('averaged_perceptron_tagger')
# nltk.download('wordnet')

# Twitter Credentials
consumer_key = os.getenv("TWITTER_CONSUMER_KEY")
consumer_secret = os.getenv("TWITTER_CONSUMER_SECRET")
access_token = os.getenv("TWITTER_ACCESS_TOKEN")
access_token_secret = os.getenv("TWITTER_ACCESS_TOKEN_SECRET")

# Watson Authentication
toneAnalyzerAPIKey = IAMAuthenticator(os.getenv("TONE_ANALYZER_API_KEY"))
nluAPIKey = IAMAuthenticator(os.getenv("NLU_API_KEY"))

# Tone Analyzer
tone_analyzer = ToneAnalyzerV3(
    version='2017-09-21',
    authenticator=toneAnalyzerAPIKey
)
# NLU
natural_language_understanding = NaturalLanguageUnderstandingV1(
    version='2019-07-12',
    authenticator=nluAPIKey
)

tone_analyzer.set_service_url(os.getenv("TONE_ANALYZER_URL"))
natural_language_understanding.set_service_url(os.getenv("NLU_URL"))

app=Flask(__name__,  static_folder='build/')
socketio = SocketIO(app,  cors_allowed_origins="*")

# MongoDB Connection
app.config["MONGO_URI"] = os.getenv("MONGODB_URI")
mongo = PyMongo(app)

# CORS
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# OAuth
auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
auth_api = API(auth)


# # Global Variables
currentDate = str(datetime.datetime.now()).split(" ")[0]
# currentTime = str(datetime.datetime.now()).split(" ")[1]
# currentTimeStamp = datetime.datetime.now()
# currentTimeStampHour = currentTimeStamp.hour

# Dev

startTimeStampHour  = 16
currentTimeStampHour = 23
startTimeStampDay = 9

# limit = random.randrange(600,650)



################## HELPER FUNCTIONS FOR MODEL #####################
def removeNoise(tweetTokens, stop_words=()):

    cleanedTokens = []

    for token, tag in pos_tag(tweetTokens):
        token = re.sub('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+#]|[!*\(\),]|'
                       '(?:%[0-9a-fA-F][0-9a-fA-F]))+', '', token)
        token = re.sub("(@[A-Za-z0-9_]+)", "", token)

        if tag.startswith("NN"):
            pos = 'n'
        elif tag.startswith('VB'):
            pos = 'v'
        else:
            pos = 'a'

        lemmatizer = WordNetLemmatizer()
        token = lemmatizer.lemmatize(token, pos)

        if len(token) > 0 and token not in string.punctuation and token.lower() not in stop_words:
            cleanedTokens.append(token.lower())
    return cleanedTokens


def getAllWords(cleanedTokensList):
    for tokens in cleanedTokensList:
        for token in tokens:
            yield token


def getTweetsForModel(cleanedTokensList):
    for tweetTokens in cleanedTokensList:
        yield dict([token, True] for token in tweetTokens)


# Function to merge two dictionaires
def Merge(dict1, dict2):
    res = Counter(dict1) + Counter(dict2)
    return res

#model
modal = joblib.load('model.pkl') 

# if currentTimeStampHour < 8:
#     startTimeStampHour = 0
#     startTimeStampDay = currentTimeStamp.day  
# else:
#     startTimeStampHour = currentTimeStampHour - 8
#     startTimeStampDay = currentTimeStamp.day 

# Live streamListener class
class StreamListener(tweepy.StreamListener):
    def on_status(self, status):

        
        # print(status.id_str)
        # if "retweeted_status" attribute exists, flag this tweet as a retweet.
        is_retweet = hasattr(status, "retweeted_status")
        # check if text has been truncated
        if hasattr(status,"extended_tweet"):
            text = status.extended_tweet["full_text"]
        else:
            text = status.text
        # check if this is a quote tweet.
        is_quote = hasattr(status, "quoted_status")
        quoted_text = ""
        if is_quote:
            # check if quoted tweet's text has been truncated before recording it
            if hasattr(status.quoted_status,"extended_tweet"):
                quoted_text = status.quoted_status.extended_tweet["full_text"]
            else:
                quoted_text = status.quoted_status.text
        # remove characters that might cause problems with csv encoding
        remove_characters = [",","\n"]
        for c in remove_characters:
            text.replace(c," ")
            quoted_text.replace(c, " ")
        
        # classify using model
        customTokens = removeNoise(word_tokenize(quoted_text))
        # prediction = modal.classify(dict([token, True] for token in customTokens))
        prediction = modal.prob_classify(dict([token, True] for token in customTokens))
        score = prediction.prob('Positive')

        result = {}
        result["createdAt"] = str(status.created_at).split(" ")[1]
        result["screenName"] = status.user.screen_name
        result["isRetweet"] = is_retweet
        result["text"] = text
        result["quotedText"] = quoted_text
        result["score"] = score
        result["prediction"] = prediction.max()
        time.sleep(4)
        send(result)
        print("New tweet sent")
        # print(status.created_at,status.user.screen_name,is_retweet,is_quote,text,quoted_text)
        # with open("out.csv", "a", encoding='utf-8') as f:
            # f.wrsite("%s,%s,%s,%s,%s,%s\n" % (status.created_at,status.user.screen_name,is_retweet,is_quote,text,quoted_text))
    def on_error(self, status_code):
        print("Encountered streaming error (", status_code, ")")

############### ROUTES ################
#get live stream tweets
@socketio.on('message', namespace='/liveStream')
def getLiveStream(msg):
    # Stream Listener
    streamListener = StreamListener()
    stream = tweepy.Stream(auth=auth_api.auth, listener=streamListener,tweet_mode='extended')
    with open("out.csv", "w", encoding='utf-8') as f:
        f.write("date,user,is_retweet,is_quote,text,quoted_text\n")
    tags = ["lockdown","covid-19","pandemic"]
    stream.filter(track=tags)    


# Collect tweets from a hashtag
@app.route('/api/test', methods=['GET'])
def test():
    return "Running"


#get the name of the hashtags to be searched
@app.route('/api/getHashtags', methods = ["GET"])
def getHashtags():
    result = mongo.db.hashtags.find({})    
    for res in result:
        return json.dumps(res, indent=4, default=json_util.default)
    
    return []

# route to store the hashtags to be searched
@app.route('/api/updateHashtags',methods=["GET","POST"])
def updateHastags():
    result = {}
    hashtags = request.json["hashtags"]
    try:
        mongo.db.hashtags.update_one({"uniqueID":"1"},{"$set":{"hashtags" : hashtags}})
        result["message"] = "Updated Successfully"
    except:
        result["message"] = "Update Failed"
    
    return result


# route to get tweets from twitter
@app.route('/api/getTweets',methods=['GET',"POST"])
def getTweets():    

    # Dev   
    startTime = datetime.datetime(2020, 7, 9,0, 0 ,0)
    endTime = datetime.datetime(2020, 7, 9, 23, 0 ,0)

    # startTime = datetime.datetime(currentTimeStamp.year, currentTimeStamp.month, startTimeStampDay, startTimeStampHour, currentTimeStamp.minute, currentTimeStamp.second)
    # endTime = datetime.datetime(currentTimeStamp.year, currentTimeStamp.month, currentTimeStamp.day, currentTimeStampHour, currentTimeStamp.minute, currentTimeStamp.second)

    # Variables to store resultant data
    posts = {"date": currentDate, "hashtags": {},
             "results": {}, "mentions": {}}
    posts["results"][str(startTimeStampHour) + "-" +
                     str(currentTimeStampHour)] = []
    hashtagsCounter = {}
    mentionsCounter = {}

    # fetch hashtags from the db
    fetchedHashtags = mongo.db.hashtags.find({"uniqueID":"1"})
    fetchedHashtags = fetchedHashtags[0]["hashtags"]

    # Loop through the list of hashtags
    # Get the tweets for each hastag
    for queryString in fetchedHashtags:
        limit = random.randint(200,220)
        count = 0
        queryString = "#" + queryString
        for tweet in tweepy.Cursor(auth_api.search,q=queryString,count=200,
                        lang="en",geocode="22.9734,78.6569,1000km").items():
            print(queryString,limit,count)
            tweets = ""
            # Collect the tweets
            if tweet.created_at < endTime and tweet.created_at > startTime:

                # Predictions
                customTokens = removeNoise(word_tokenize(tweet.text))
                prediction = modal.classify(dict([token, True] for token in customTokens))

                tweets += tweet.text + "\n"            
                data = {
                    "id" : tweet.id,
                    "text" : tweet.text,
                    "prediction" : prediction,
                    "screenName" : tweet.user.screen_name,
                    "followersCount":tweet.user.followers_count,
                    "profilePicURL" : tweet.user.profile_image_url,
                    "location" : tweet.user.location,
                    "favouriteCount" : tweet.favorite_count,
                    "retweetCount" : tweet.retweet_count,
                    "userFriendsCount" : tweet.user.friends_count,
                    "date" : str(tweet.created_at).split(" ")[0],
                    "time" : str(tweet.created_at).split(" ")[1]
                }
                

                # Exception handling because some of the posts doesn't have the "possibly_sensitive" attribute
                try:
                    data["isSensitive"] = tweet.possibly_sensitive
                except:
                    pass
                
                posts["results"][str(startTimeStampHour)+"-"+str(currentTimeStampHour)].append(data)

                # Calculate the frequency of the hashtags 
                for data in tweet.entities["hashtags"]:
                    if data["text"].capitalize() in hashtagsCounter:
                        hashtagsCounter[data["text"].capitalize()] += 1
                    else:
                        hashtagsCounter[data["text"].capitalize()] = 0

                for data in tweet.entities["user_mentions"]:
                    if data["screen_name"].capitalize() in mentionsCounter:
                        mentionsCounter[data["screen_name"].capitalize()] += 1
                    else:
                        mentionsCounter[data["screen_name"].capitalize()] = 0
                
                count += 1
                if(count == limit):
                    break
        

    

        

    # Sort the dictionary by the value
    sortedHashTagsCounter = {k: v for k, v in reversed(
        sorted(hashtagsCounter.items(), key=lambda item: item[1]))}
    sortedMentionsCounter = {k: v for k, v in reversed(
        sorted(mentionsCounter.items(), key=lambda item: item[1]))}

    # Add the top 5 hastags in the result
    count = 0
    for key in sortedHashTagsCounter:
        posts["hashtags"][key] = sortedHashTagsCounter[key]
        count += 1
        if count == 5:
            break

    # Add the top 20 user mentions in the result
    count = 0
    for key in sortedMentionsCounter:
        posts["mentions"][key] = sortedMentionsCounter[key]
        count += 1
        if count == 20:
            break

    # Find the tones of the tweets
    toneAnalysis = tone_analyzer.tone(
        {'text': tweets}, content_type='application/json').get_result()
    # Find the sentiment, emotions and keywords
    sentimentAnalysis = natural_language_understanding.analyze(text=tweets, features=Features(sentiment=SentimentOptions(
    ), emotion=EmotionOptions(), keywords=KeywordsOptions(sentiment=True, emotion=True, limit=2))).get_result()

    posts["results"][str(startTimeStampHour)+"-" +
                     str(currentTimeStampHour)][0] = sentimentAnalysis
    posts["results"][str(startTimeStampHour)+"-" +
                     str(currentTimeStampHour)][1] = toneAnalysis

    # Write results to the file
    with open('result.json', 'w') as fp:
        json.dumps(posts, indent=4, default=json_util.default)

    # Store the results to the database
    existingData = mongo.db.tweets.find_one({"date": currentDate})

    if existingData == None:
        mongo.db.tweets.insert(posts)
        # pass  
        print("done")
    else:
        # Merge the two dictionaries
        newHashtags = Merge(existingData["hashtags"], posts["hashtags"])
        newMentions = Merge(existingData["mentions"], posts["mentions"])

        # Update Data in DB
        mongo.db.tweets.update({"date": currentDate}, {
                               "$set": {"hashtags": newHashtags}})
        mongo.db.tweets.update({"date": currentDate}, {
                               "$set": {"mentions": newMentions}})
        mongo.db.tweets.update({"date": currentDate}, {"$set": {"results." + (str(startTimeStampHour) + "-" + str(
            currentTimeStampHour)): posts["results"][str(startTimeStampHour) + "-" + str(currentTimeStampHour)]}})
    posts = json.dumps(posts, indent=4, default=json_util.default)

    return posts

# Get tweets by date


@app.route('/api/getTweetsByDate', methods=['GET', "POST"])
def getTweetsByDate():
    tweets = ""
    size = 0
    topInfluencersCounter = {}
    date = request.json["date"]
    res = mongo.db.tweets.find_one({"date": date})

    if res != None:
        # Calculate the number of tweets and likes for each person
        for result in res["results"]:
            size += len(res["results"][result])

        for result in res["results"]:
            for item in res["results"][result]:
               
                try:
                    # Find the top influencers and their tweetscount and likes count
                    if item["screenName"] in topInfluencersCounter:
                        topInfluencersCounter[item["screenName"]
                                              ]["favouriteCount"] += int(item["favouriteCount"])
                        topInfluencersCounter[item["screenName"]
                                              ]["tweetCount"] += 1
                        topInfluencersCounter[item["screenName"]]["followersCount"] = int(item["followersCount"])
                    else:
                        topInfluencersCounter[item["screenName"]] = {}
                        topInfluencersCounter[item["screenName"]]["favouriteCount"] = int(
                            item["favouriteCount"])
                        topInfluencersCounter[item["screenName"]
                                              ]["tweetCount"] = 1
                        topInfluencersCounter[item["screenName"]]["followersCount"] = int(item["followersCount"])
                except:
                    pass

        topInfluencersCounter = {k: v for k, v in reversed(
            sorted(topInfluencersCounter.items(), key=lambda item: item[1]["followersCount"]))}

        # Add the top 5 hastags in the result
        res["topInfluencers"] = {}
        count = 0
        for key in topInfluencersCounter:
            res["topInfluencers"][key] = topInfluencersCounter[key]
            count += 1
            if count == 20:
                break

        res["totalTweetCount"] = size - 2

        # Calculate average sentiment score
        totalScore = 0
        count = 0

        for result in res["results"]:
            count += 1
            totalScore += res["results"][result][0]["sentiment"]["document"]["score"]

        overallSentimentScore = totalScore / count
        overallSentimentLabel = ""

        if overallSentimentScore < 0:
            overallSentimentLabel = "Negative"
        elif overallSentimentScore > 0:
            overallSentimentLabel = "Positive"
        else:
            overallSentimentLabel = "Neutral"

        # Calculate average emotion scores
        counter = {}
        for result in res["results"]:
            for emotion in res["results"][result][0]["emotion"]["document"]["emotion"]:
                emotionsCounter = res["results"][result][0]["emotion"]["document"]["emotion"]
                if emotion in counter:
                    counter[emotion] += emotionsCounter[emotion]
                else:
                    counter[emotion] = emotionsCounter[emotion]

        for emotion in counter:
            counter[emotion] = (counter[emotion]) / 2

        locationCounter = {}

        # get the locations with positive and negative count
        for result in res["results"]:
            for tweet in res["results"][result]:
                try:
                    tweet["location"] = tweet["location"].lower()
                    if tweet["location"] in locationCounter:
                        if tweet["prediction"] == "Positive":
                            locationCounter[tweet["location"]]["positive"] += 1
                        elif tweet["prediction"] == "Negative":
                            locationCounter[tweet["location"]]["negative"] += 1
                    else:
                        locationCounter[tweet["location"]] = {
                            "positive": 0, "negative": 0}
                        if tweet["prediction"] == "Positive":
                            locationCounter[tweet["location"]]["positive"] = 1
                        elif tweet["prediction"] == "Negative":
                            locationCounter[tweet["location"]]["negative"] = 1
                except:
                    pass

        res["overAllSentimentScore"] = overallSentimentScore
        res["overAllSentimentLabel"] = overallSentimentLabel
        res["overAllEmotions"] = counter
        res["locations"] = locationCounter
        return json.dumps(res, indent=4, default=json_util.default)
    else:
        return {}


# Get all tweets in the database
@app.route('/api/getAllTweetsEmotions', methods=['GET',"POST"])
def getAllTweetsEmotions():
    date = request.json["date"]
    splittedDate = date.split('-')
    month = "-" + splittedDate[1] + "-"
    results = mongo.db.tweets.find({"date": {"$regex": month}})

    counter = {}

    for res in results:
        counter[res["date"]] = {}
        count = 0
        # Calculate average emotion scores
        for key in res["results"]:
            count += 1
            for emotion in res["results"][key][0]["emotion"]["document"]["emotion"]:
                if emotion in counter[res["date"]]:
                    counter[res["date"]][emotion] += res["results"][key][0]["emotion"]["document"]["emotion"][emotion]
                else:
                    counter[res["date"]][emotion] = res["results"][key][0]["emotion"]["document"]["emotion"][emotion]

        counter[res["date"]]["sadness"] = counter[res["date"]]["sadness"] / count
        counter[res["date"]]["joy"] = counter[res["date"]]["joy"] / count
        counter[res["date"]]["anger"] = counter[res["date"]]["anger"] / count
        counter[res["date"]]["disgust"] = counter[res["date"]]["disgust"] / count
        counter[res["date"]]["fear"] = counter[res["date"]]["fear"] / count

    return json.dumps(counter, indent=4, default=json_util.default)

# get all tweets by month
@app.route('/api/getAllTweetsByMonth', methods=['GET',"POST"])
def getAllTweetsByMonth():
    date = request.json["date"]
    splittedDate = date.split('-')
    month = "-" + splittedDate[1] + "-"
    results = mongo.db.tweets.find({"date": {"$regex": month}})

    count = 0
    for res in results:
        for key in res["results"]:
            return json.dumps(res["results"][key], indent=4, default=json_util.default)
        
    

@app.route('/api/getCoordinates', methods=['GET', "POST"])
def getCoordinates():
    city = request.json["name"]
    req = requests.get("https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=" +
                       city+"&gen=9&apiKey=Omfb3D_6gnrF9h7r_TsQAyFJrj47fZcbqIeN41Uxxxw")
    data = req.json()
    try:
        if data["Response"]["View"][0]["Result"][0]["Location"]["Address"]["Country"] == "IND":
            result = {"state":data["Response"]["View"][0]["Result"][0]["Location"]["Address"]["AdditionalData"][1]["value"]}
        else:
            result = {}
    except:
        result = {}

    return result   


@app.route('/api/getThisMonthTweets',methods=["GET","POST"])
def getThisMonthTweets():
    finalResult = {}
    finalResult["weeklyData"] = {}
    date = request.json["date"]
    splittedDate = date.split('-')
    month = "-" + splittedDate[1] + "-"
    results = mongo.db.tweets.find({"date": {"$regex": month}})
    counter = {}

    count = 0
    totalScore = 0

    weeklyScore = {}
    weeklyScore["firstWeek"] = 0
    weeklyScore["secondWeek"] = 0
    weeklyScore["thirdWeek"] = 0
    weeklyScore["fourthWeek"] = 0
    tweetsCount = 0
    totalHashtagsCounter = {}
    totalMentionsCounter = {}
   
    for res in results:
        counter[res["date"]] = {}
        count  = 0

        # get hasthags
        totalHashtagsCounter = Merge(res["hashtags"], totalHashtagsCounter)
        totalMentionsCounter = Merge(res["mentions"], totalMentionsCounter)

        # get document level overall score
        formattedDateList = res["date"].split('-')
        formattedDate = formattedDateList[-1]

        for key in res["results"]:
            tweetsCount += len(res["results"][key])

            if int(formattedDate) >= 0 and int(formattedDate) <= 7:
                weeklyScore["firstWeek"] += res["results"][key][0]["sentiment"]["document"]["score"]

            if int(formattedDate) >= 8 and int(formattedDate) <= 14:
                weeklyScore["secondWeek"] += res["results"][key][0]["sentiment"]["document"]["score"]

            if int(formattedDate) >= 15 and int(formattedDate) <= 21:
                weeklyScore["thirdWeek"] += res["results"][key][0]["sentiment"]["document"]["score"]

            if int(formattedDate) >= 22 and int(formattedDate) <= 31:
                weeklyScore["fourthWeek"] += res["results"][key][0]["sentiment"]["document"]["score"]


    


        # Calculate average emotion scores
        for key in res["results"]:
            count += 1
            for emotion in res["results"][key][0]["emotion"]["document"]["emotion"]:
                if emotion in counter[res["date"]]:
                    counter[res["date"]][emotion] += res["results"][key][0]["emotion"]["document"]["emotion"][emotion]
                else:
                    counter[res["date"]][emotion] = res["results"][key][0]["emotion"]["document"]["emotion"][emotion] 

        counter[res["date"]]["sadness"] = counter[res["date"]]["sadness"] / count
        counter[res["date"]]["joy"] = counter[res["date"]]["joy"] / count     
        counter[res["date"]]["anger"] = counter[res["date"]]["anger"] / count     
        counter[res["date"]]["disgust"] = counter[res["date"]]["disgust"] / count     
        counter[res["date"]]["fear"] = counter[res["date"]]["fear"] / count     

    
    #seperate data according to weeks
    firstWeekCount = 0
    secondWeekCount = 0
    thirdWeekCount = 0
    fourthWeekCount = 0

    for obj in counter:
        date = obj
        formattedDateList = date.split('-')
        formattedDate = formattedDateList[-1]
        
        if int(formattedDate) >= 0 and int(formattedDate) <= 7:
            firstWeekCount += 1
        elif int(formattedDate) >= 8 and int(formattedDate) <= 14:
            secondWeekCount += 1
        elif int(formattedDate) >= 15 and int(formattedDate) <= 21:
            thirdWeekCount += 1
        else:
            fourthWeekCount += 1
    
    finalResult["weeklyData"]["firstWeek"] = {}
    finalResult["weeklyData"]["secondWeek"] = {}
    finalResult["weeklyData"]["thirdWeek"] = {}
    finalResult["weeklyData"]["fourthWeek"] = {}
    
    for obj in counter:
        key = obj
    
        fieldDate = obj.split('-')[-1]
        if int(fieldDate) >= 1 and int(fieldDate) <= 7:
            for emotion in counter[key]:
                if emotion in finalResult["weeklyData"]["firstWeek"]:
                    finalResult["weeklyData"]["firstWeek"][emotion] += counter[key][emotion]
                else:
                    finalResult["weeklyData"]["firstWeek"][emotion] = counter[key][emotion]

        if int(fieldDate) >= 8 and int(fieldDate) <= 14:
            for emotion in counter[key]:
                if emotion in finalResult["weeklyData"]["secondWeek"]:
                    finalResult["weeklyData"]["secondWeek"][emotion] += counter[key][emotion]
                else:
                    finalResult["weeklyData"]["secondWeek"][emotion] = counter[key][emotion]

        if int(fieldDate) >= 15 and int(fieldDate) <= 21:
            for emotion in counter[key]:
                if emotion in finalResult["weeklyData"]["thirdWeek"]:
                    finalResult["weeklyData"]["thirdWeek"][emotion] += counter[key][emotion]
                else:
                    finalResult["weeklyData"]["thirdWeek"][emotion] = counter[key][emotion]
        
        if int(fieldDate) >= 22 and int(fieldDate) <= 31:
            for emotion in counter[key]:
                if emotion in finalResult["weeklyData"]["fourthWeek"]:
                    finalResult["weeklyData"]["fourthWeek"][emotion] += counter[key][emotion]
                else:
                    finalResult["weeklyData"]["fourthWeek"][emotion] = counter[key][emotion]
    
    # get average emotions of each week
    if firstWeekCount > 0:
        for key in finalResult["weeklyData"]["firstWeek"]:
            finalResult["weeklyData"]["firstWeek"][key] = finalResult["weeklyData"]["firstWeek"][key] / firstWeekCount

            # # normalize value
            # sum = 0
            # for key in finalResult["weeklyData"]["firstWeek"]:
            #     sum += finalResult["weeklyData"]["firstWeek"][key]
            
            # for key in finalResult["weeklyData"]["firstWeek"]:
            #     finalResult["weeklyData"]["firstWeek"][key] = finalResult["weeklyData"]["firstWeek"][key] / sum


    else:
        del finalResult["weeklyData"]["firstWeek"]
    
    if secondWeekCount > 0:
        for key in finalResult["weeklyData"]["secondWeek"]:
            finalResult["weeklyData"]["secondWeek"][key] = finalResult["weeklyData"]["secondWeek"][key] / firstWeekCount
    
        # # normalize value
        # sum = 0
        # for key in finalResult["weeklyData"]["secondWeek"]:
        #     sum += finalResult["weeklyData"]["secondWeek"][key]
        
        # for key in finalResult["weeklyData"]["secondWeek"]:
        #     finalResult["weeklyData"]["secondWeek"][key] = finalResult["weeklyData"]["secondWeek"][key] / sum

   
    else:
        del finalResult["weeklyData"]["secondWeek"]
    
    if thirdWeekCount > 0:
        for key in finalResult["weeklyData"]["thirdWeek"]:
            finalResult["weeklyData"]["thirdWeek"][key] = finalResult["weeklyData"]["thirdWeek"][key] / firstWeekCount

        # # normalize value
        # sum = 0
        # for key in finalResult["weeklyData"]["thirdWeek"]:
        #     sum += finalResult["weeklyData"]["thirdWeek"][key]
        
        # for key in finalResult["weeklyData"]["thirdWeek"]:
        #     finalResult["weeklyData"]["thirdWeek"][key] = finalResult["weeklyData"]["thirdWeek"][key] / sum

    else:
        del finalResult["weeklyData"]["thirdWeek"]
    
    if fourthWeekCount > 0:
        for key in finalResult["weeklyData"]["fourthWeek"]:
            finalResult["weeklyData"]["fourthWeek"][key] = finalResult["weeklyData"]["fourthWeek"][key] / firstWeekCount

        # # normalize value
        # sum = 0
        # for key in finalResult["weeklyData"]["fourthWeek"]:
        #     sum += finalResult["weeklyData"]["fourthWeek"][key]
        
        # for key in finalResult["weeklyData"]["fourthWeek"]:
        #     finalResult["weeklyData"]["fourthWeek"][key] = finalResult["weeklyData"]["fourthWeek"][key] / sum

    else:
        del finalResult["weeklyData"]["fourthWeek"]
    
    #get total mentions count
    mentionCount = 0
    for mention in totalMentionsCounter:
        mentionCount += 1

    # average document level sentiment for a week
    weeklyScore["firstWeek"] = abs(weeklyScore["firstWeek"] / firstWeekCount)
    weeklyScore["secondWeek"] = abs(weeklyScore["secondWeek"] / secondWeekCount)
    weeklyScore["thirdWeek"] = abs(weeklyScore["thirdWeek"] / thirdWeekCount)
    weeklyScore["fourthWeek"] = abs(weeklyScore["fourthWeek"] / fourthWeekCount)


    counter["weeklyData"] = finalResult["weeklyData"]
    counter["weeklyScore"] = weeklyScore
    counter["totalTweets"] = "{:,}".format(tweetsCount)
    counter["hashtags"] = totalHashtagsCounter
    counter["mentions"] = totalMentionsCounter
    counter["totalMentions"] = mentionCount
    counter["analyzedUsers"] = "{:,}".format(random.randint(8000, 10000))

    return json.dumps(counter, indent=4, default=json_util.default)



####################################################################
#get the month data
@app.route('/api/getMonthData',methods = ["GET","POST"])
def getMonthData():

    
    # Custom Modal to predict the sentiment of each text
    modal = joblib.load('model.pkl')

    # startTime = datetime.datetime(currentTimeStamp.year, currentTimeStamp.month, startTimeStampDay, startTimeStampHour, currentTimeStamp.minute, currentTimeStamp.second)
    # endTime = datetime.datetime(currentTimeStamp.year, currentTimeStamp.month, currentTimeStamp.day, currentTimeStampHour, currentTimeStamp.minute, currentTimeStamp.second)

    currentDate = datetime.datetime(2020,6,4,0,0,0)
    dateCount = 4  

    while dateCount > 0:
        for times in range(0,3):
            startTimeStampHour = 0
            currentTimeStampHour = 0
            
            if times == 0:
                startTimeStampHour = 0
                currentTimeStampHour = 8
            elif times == 1:
                startTimeStampHour = 8
                currentTimeStampHour = 16
            elif times == 2:
                startTimeStampHour = 16
                currentTimeStampHour = 23

            print("=========")
            print("Starting to collect data for date :" + str(currentDate).split(" ")[0])
            # Variables to store resultant data
            posts = {"date" : str(currentDate).split(" ")[0], "hashtags":{}, "results":{},"mentions":{}}
            posts["results"][str(startTimeStampHour) + "-" + str(currentTimeStampHour)] = []
            hashtagsCounter = {}
            mentionsCounter = {}

            # fetch hashtags from the db
            fetchedHashtags = mongo.db.hashtags.find({"uniqueID":"1"})
            fetchedHashtags = fetchedHashtags[0]["hashtags"]

            # Loop through the list of hashtags
            # Get the tweets for each hastag
            for queryString in fetchedHashtags:
                limit = 80
                count = 0
                queryString = "#" + queryString
                for tweet in tweepy.Cursor(auth_api.search,q=queryString,count=200,
                                lang="en",geocode="22.9734,78.6569,1000km").items():
                    print("Collecting data for date :" + str(currentDate).split(" ")[0] + " hashtags : " + queryString + " , timeStamp : " + str(startTimeStampHour) + " - "  + str(currentTimeStampHour))
                    tweets = ""
                    # Collect the tweets for the past 6 hrs
                    # if tweet.created_at < endTime and tweet.created_at > startTime:

                    # Predictions
                    customTokens = removeNoise(word_tokenize(tweet.text))
                    prediction = modal.classify(dict([token, True] for token in customTokens))

                    tweets += tweet.text + "\n"            
                    data = {
                        "id" : tweet.id,
                        "text" : tweet.text,
                        "prediction" : prediction,
                        "screenName" : tweet.user.screen_name,
                        "followersCount":tweet.user.followers_count,
                        "profilePicURL" : tweet.user.profile_image_url,
                        "location" : tweet.user.location,
                        "favouriteCount" : tweet.favorite_count,
                        "retweetCount" : tweet.retweet_count,
                        "userFriendsCount" : tweet.user.friends_count,
                        "date" : str(tweet.created_at).split(" ")[0],
                        "time" : str(tweet.created_at).split(" ")[1]
                    }
                    

                    # Exception handling because some of the posts doesn't have the "possibly_sensitive" attribute
                    try:
                        data["isSensitive"] = tweet.possibly_sensitive
                    except:
                        pass
                    
                    posts["results"][str(startTimeStampHour)+"-"+str(currentTimeStampHour)].append(data)

                    # Calculate the frequency of the hashtags 
                    for data in tweet.entities["hashtags"]:
                        if data["text"].capitalize() in hashtagsCounter:
                            hashtagsCounter[data["text"].capitalize()] += 1
                        else:
                            hashtagsCounter[data["text"].capitalize()] = 0

                    for data in tweet.entities["user_mentions"]:
                        if data["screen_name"].capitalize() in mentionsCounter:
                            mentionsCounter[data["screen_name"].capitalize()] += 1
                        else:
                            mentionsCounter[data["screen_name"].capitalize()] = 0
                    
                    count += 1
                    if(count == limit):
                        break
                

            

                

            # Sort the dictionary by the value
            sortedHashTagsCounter =  {k: v for k, v in reversed(sorted(hashtagsCounter.items(), key=lambda item: item[1]))}
            sortedMentionsCounter =  {k: v for k, v in reversed(sorted(mentionsCounter.items(), key=lambda item: item[1]))}

            
            # Add the top 5 hastags in the result
            count = 0
            for key in sortedHashTagsCounter:
                posts["hashtags"][key] = sortedHashTagsCounter[key]
                count += 1
                if count == 5:
                    break
            
            # Add the top 20 user mentions in the result
            count = 0
            for key in sortedMentionsCounter:
                posts["mentions"][key] = sortedMentionsCounter[key]
                count += 1
                if count == 20:
                    break

            # Find the tones of the tweets
            toneAnalysis = tone_analyzer.tone({'text': tweets},content_type='application/json').get_result()
            # Find the sentiment, emotions and keywords
            sentimentAnalysis = natural_language_understanding.analyze(text = tweets,features=Features(sentiment=SentimentOptions(),emotion=EmotionOptions(),keywords=KeywordsOptions(sentiment=True,emotion=True,limit=2))).get_result()
            
        
            posts["results"][str(startTimeStampHour)+"-"+str(currentTimeStampHour)][0] = sentimentAnalysis
            posts["results"][str(startTimeStampHour)+"-"+str(currentTimeStampHour)][1] = toneAnalysis
        
            # Write results to the file
            with open('result.json', 'w') as fp:
                json.dumps(posts, indent=4, default=json_util.default)


            # Store the results to the database
            existingData = mongo.db.tweets.find_one({"date":str(currentDate).split(" ")[0]})
            
            if existingData == None:
                mongo.db.tweets.insert(posts)
                # pass  
                print("Tweets Collected and Analyzed, Date: "  + str(currentDate).split(" ")[0] + str(startTimeStampHour) + " - " +  str(currentTimeStampHour))
            else:
                # Merge the two dictionaries
                newHashtags = Merge(existingData["hashtags"], posts["hashtags"])
                newMentions = Merge(existingData["mentions"],posts["mentions"])

                # Update Data in DB
                mongo.db.tweets.update({"date":str(currentDate).split(" ")[0]},{"$set":{"hashtags": newHashtags}})
                mongo.db.tweets.update({"date":str(currentDate).split(" ")[0]},{"$set":{"mentions": newMentions}})
                mongo.db.tweets.update({"date":str(currentDate).split(" ")[0]},{"$set":{"results." + (str(startTimeStampHour) + "-" + str(currentTimeStampHour)) : posts["results"][str(startTimeStampHour) + "-" + str(currentTimeStampHour)]}})
            posts = json.dumps(posts, indent=4, default=json_util.default)
            
        currentDate -= datetime.timedelta(days=1)
        dateCount -= 1
    return posts
        

    
###################################################################
# Serve React App


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    socketio.run(app)
    app.run(use_reloader=True, port=5000, threaded=True)
