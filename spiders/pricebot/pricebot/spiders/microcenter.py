# -*- coding: utf-8 -*-
import scrapy
import items
import re
import datetime
import settings
from scrapy.exceptions import DropItem
from decimal128 import Decimal128

class PricebotMicrocenterItem(items.PricebotItem):

    def __init__(self, content, store_number=None):
        super().__init__()
        self._content = content
        self._details = content.xpath('//script[contains(., "dataLayer")]/text()').extract_first()
        if store_number is None:
            raise UserWarning('this method not implemented')
        self._store_number = store_number

    def detailsRegex(self, string):
        return re.findall(r"'{}':\'(.+)\'".format(string), self._details)[0]

    def db_callback(self):
        return {'retailer.microcenter.quantity.{}'.format(self._store_number): self.get_item_quantity()}

    def get_item_quantity(self):
        quantity = self._content.xpath('//div[@id="pnlInventory"]//span[@class="inventoryCnt"]').extract()[0]
        quantity = int(re.sub('[^0-9]','', quantity))
        return quantity

    def get_item_price(self):
        price = Decimal128(self.detailsRegex('productPrice'))
        return price

    def get_item_upc(self):
        upc = self.detailsRegex('ean')
        return upc

    def get_item_name(self):
        name = self._content.xpath('//div[@id="details"]//span[@itemprop="name"]//@data-name').extract()[0]
        return name

    def get_item_sku(self):
        sku = self.detailsRegex('SKU')
        return sku

    def get_item_image(self):
        image = None
        try:
            image = self._content.xpath('//img[@itemprop="image"]/@src').extract()[0].replace("thumbnail", "zoom")
        except IndexError:
            try:
                image = self._content.xpath('//div[@id="details"]//img/@src').extract()[0]
            except IndexError:
                pass
        return image

    def get_item_description(self):
        description = self._content.xpath('//div[@itemprop="description"]//p/text()').extract()[0]
        return description

    def scrape_item(self):
        self['upc'] = self.get_item_upc()
        self['retailer'] = {
            'microcenter': {
                'price': self.get_item_price(),
                'name': self.get_item_name(),
                'sku': self.get_item_sku(),
                'image': self.get_item_image(),
                'description': self.get_item_description(),
                'date': datetime.datetime.utcnow(),
            }
        }



class MicrocenterSpider(scrapy.Spider):
    name = 'microcenter'
    allowed_domains = ['microcenter.com']

    headers = settings.headers

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.store = kwargs.get('store')

    def start_requests(self):
        start_url = 'http://www.microcenter.com/search/search_results.aspx?N=1'
        yield scrapy.Request(
            start_url,
            headers=self.headers,
            cookies={'storeSelected': self.store},
            callback=self.parse)

    def parse(self, response):
        for link in response.xpath('//ul[@role="tabpanel"]/li/div/a/@href'):
            url = response.urljoin(link.extract())
            yield scrapy.Request(
                url,
                headers=self.headers,
                cookies={'storeSelected': self.store},
                dont_filter=False,
                callback=self.parse_item)

        next_page_url = response.xpath(
            '//li[@class="current"]/following-sibling::li/a/@href'
        ).extract_first()
        if next_page_url is not None:
            yield scrapy.Request(
                response.urljoin(next_page_url),
                headers=self.headers,
                cookies={'storeSelected': self.store},
                dont_filter=True)


    def parse_item(self, response):
        for sel in response.xpath('//body'):
            item = PricebotMicrocenterItem(sel, self.store)
            item.scrape_item()
            yield item
