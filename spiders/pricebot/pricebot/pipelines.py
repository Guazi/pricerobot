# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
import datetime
from pymongo import MongoClient
from spiders.microcenter import PricebotMicrocenterItem

class PricebotPipeline(object):

    def __init__(self, mongo_uri):
        self.mongo_uri = mongo_uri

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            mongo_uri=crawler.settings.get('MONGO_URI'),
        )

    def open_spider(self, spider):
        self.client = MongoClient(self.mongo_uri, connect=False)
        self.db = self.client['v3']

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        retailer_name = list(item['retailer'].keys())[0]
        retVal = self.db['items'].find_one_and_update({"upc": item['upc']},
                                             {"$set": item.to_mongodb()}, upsert=True)

        if isinstance(item, PricebotMicrocenterItem):
            self.db['items'].find_one_and_update({"upc": item['upc']},
                                                 {"$set": item.db_callback()}, upsert=True)

        return item
