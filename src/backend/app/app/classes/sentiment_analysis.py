import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import string

nltk.download('vader_lexicon')
nltk.download('punkt')
nltk.download('stopwords')


class SentimentAnalisys:
    
    analyzer = SentimentIntensityAnalyzer()
    
    @classmethod
    def get_sentiment(cls, text: str) -> str:
        # Transform the text to lowercase
        text = text.lower()
        
        # Remove punctuation and special characters
        text = text.translate(str.maketrans('', '', string.punctuation))
        
        # Tokenize the text
        tokens = word_tokenize(text)
        
        # Remove stopwords
        stop_words = set(stopwords.words('english'))
        tokens = [word for word in tokens if word not in stop_words]
        
        # Join the tokens back together
        text = ' '.join(tokens)
        
        # Get the sentiment
        sentiment = cls.analyzer.polarity_scores(text)
        
        if sentiment['compound'] >= 0.05:
            return 1
        elif sentiment['compound'] <= -0.05:
            return -1