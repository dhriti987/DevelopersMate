import favicon
from gnews import GNews

google_news = GNews(language='en',max_results=20)
def get_favicon_url(url):
    icons = favicon.get(url)
    return icons[0].url

def get_news():
    news = google_news.get_news_by_topic('TECHNOLOGY')
    return news
