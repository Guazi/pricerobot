# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy
import util
from scrapy.exceptions import DropItem
from util import dot_notation

class PricebotItem(scrapy.Item):
    # define the fields for your item here like:
    upc = scrapy.Field()
    retailer = scrapy.Field()

    def callback(self):
        return

    def to_mongodb(self):
        item = dict(self._values)
        item = util.dot_notation(item)
        return item

class RetailerItem(scrapy.Item):
    microcenter = scrapy.Field()

class MicrocenterItem(RetailerItem):
    price = scrapy.Field()
    name = scrapy.Field()
    sku = scrapy.Field()
    image = scrapy.Field()
    description = scrapy.Field()
    url = scrapy.Field()
    retailer = scrapy.Field()
    date = scrapy.Field()
