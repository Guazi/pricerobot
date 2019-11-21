# -*- coding: utf-8 -*-
import scrapy
import items
import datetime
import settings
import re
import json
import os

from scrapy.exceptions import DropItem
from decimal128 import Decimal128
from urllib import parse
from lxml import etree as ET

strip_tag = re.compile(r'<[^>]+>')


class PricebotTargetItem(items.PricebotItem):

    def __init__(self, content):
        super().__init__()
        self._content = content

    def db_callback(self):
        pass

    def get_item_quantity(self):
        pass

    def get_item_price(self):
        price = Decimal128(str(self._content['offer_price']['price']))
        return price

    def get_item_upc(self):
        try:
            upc = self._content['upc']
        except KeyError:
            raise DropItem('no upc')
        return upc

    def get_item_name(self):
        name = self._content['title']
        return name

    def get_item_sku(self):
        sku = self._content['dpci']
        return sku

    def get_item_image(self):
        img = self._content['images'][0]['base_url'] + self._content['images'][0]['primary']
        return img

    def get_item_description(self):
        description = None
        try:
            description = strip_tag.sub('',self._content['description'])
        except KeyError:
            pass
        return description

    def get_item_url(self):
        url = 'http://www.target.com{}'.format(self._content['url'])
        return url

    def scrape_item(self):
        self['upc'] = self.get_item_upc()
        self['retailer'] = {
            'target': {
                'price': self.get_item_price(),
                'name': self.get_item_name(),
                'sku': self.get_item_sku(),
                'image': self.get_item_image(),
                'description': self.get_item_description(),
                'url': self.get_item_url(),
                'date': datetime.datetime.utcnow(),
            }
        }


class TargetSpider(scrapy.Spider):
    #scrapy settings
    name = 'target'
    allowed_domains = ['target.com']

    # pricebot settings
    headers = settings.headers

    def __init__(self, *args, **kwargs):
        self.urls = self.target_sitemap_to_urllist()
        super().__init__(*args, **kwargs)

    @staticmethod
    def target_sitemap_to_urllist():
        urllist = []
        fn = os.path.join(os.path.dirname(__file__), 'sitemap.xml')
        tree = ET.parse(fn).getroot()
        tree = tree.xpath("//s:url/s:loc", namespaces={'s': "http://www.sitemaps.org/schemas/sitemap/0.9"})
        sort_orders = ['bestselling', 'PriceHigh', 'PriceLow', 'RatingHigh']
        for location in tree:
            for item in sort_orders:
                category = re.findall('(?<=N-).*$', location.text)[0]
                for num in range(0, 1248, 96):
                    urllist.append('https://redsky.target.com/v1/plp/search?count=96&offset=' + str(num) +
                                   '&category=' + str(category) + '&sort_by=' + str(item))

        return urllist

    def start_requests(self):
        for url in self.urls:
            yield scrapy.Request(
                url,
                headers=self.headers,
                callback=self.parse)

    def parse(self, response):
        for var in json.loads(response.body_as_unicode())["search_response"]["items"]["Item"]:
            item = PricebotTargetItem(var)
            item.scrape_item()
            yield item
