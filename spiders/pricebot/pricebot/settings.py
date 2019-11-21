# -*- coding: utf-8 -*-

# Scrapy settings for pricebot project
#
user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.85 Safari/537.36'
headers = {'user-agent': user_agent}
BOT_NAME = 'pricebot'
SPIDER_MODULES = ['spiders']
ITEM_PIPELINES = { 'pipelines.PricebotPipeline': 100 }
ROBOTSTXT_OBEY = False
LOG_ENABLED = True
LOG_LEVEL = 'ERROR'
MONGO_URI = 'PULL_FROM_ENV'
# PROXY = 'http://127.0.0.1:8888/?noconnect'
# SCRAPOXY
# API_SCRAPOXY = 'http://127.0.0.1:8889/api'
# API_SCRAPOXY_PASSWORD = ''
# WAIT_FOR_SCALE = 1
# DOWNLOADER_MIDDLEWARES = {
#     'scrapoxy.downloadmiddlewares.proxy.ProxyMiddleware': 100,
#     'scrapoxy.downloadmiddlewares.wait.WaitMiddleware': 101,
#     'scrapoxy.downloadmiddlewares.scale.ScaleMiddleware': 102,
#     'scrapy.downloadermiddlewares.httpproxy.HttpProxyMiddleware': None,
# }
CONCURRENT_REQUESTS_PER_DOMAIN = 40
RETRY_TIMES = 0
