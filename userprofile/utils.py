import favicon

def get_favicon_url(url):
    icons = favicon.get(url)
    return icons[0].url
