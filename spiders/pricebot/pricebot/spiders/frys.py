# -*- coding: utf-8 -*-
import scrapy
import items
import datetime
import settings
from scrapy.exceptions import DropItem
from decimal128 import Decimal128
from urllib import parse

class PricebotFrysItem(items.PricebotItem):

    def __init__(self, content):
        super().__init__()
        self._content = content

    def db_callback(self):
        pass

    def get_item_quantity(self):
        pass

    def get_item_price(self):
        price = None
        try:
            price = self._content.xpath('//span[@id="did_price1valuediv"]//text()').extract()[0]
        except IndexError:
            price = self._content.xpath('//span[@id="did_price4textdiv"]//text()').extract()[0]

        if price is None:
            raise DropItem('cant find price')

        price = Decimal128(price.replace('$', '').replace(',', ''))
        return price

    def get_item_upc(self):
        upc = self._content.xpath('//td[contains(text(),"UPC")]/following-sibling::td/text()').extract()[0].strip()
        if upc == '\r\n\t\t\t\t\t\t\t\t':
            raise DropItem('bad upc')
        return upc

    def get_item_name(self):
        name = self._content.xpath('//meta[@property="og:title"]/@content').extract()[0]
        return name

    def get_item_sku(self):
        sku = self._content.xpath('//span[contains(text(),"Frys#:")]/following-sibling::span/text()').extract()[0]
        return sku

    def get_item_image(self):
        img = None
        try:
            img = self._content.xpath('//img[@rel="#prodBigImg"]/@src').extract()[0]
        except IndexError:
            img = self._content.xpath('//img[@class="img-responsive"]/@src').extract()[0]
        return img

    # TODO: Implement frys description
    def get_item_description(self):
        pass

    def scrape_item(self):
        self['upc'] = self.get_item_upc()
        self['retailer'] = {
            'frys': {
                'price': self.get_item_price(),
                'name': self.get_item_name(),
                'sku': self.get_item_sku(),
                'image': self.get_item_image(),
                'description': self.get_item_description(),
                'date': datetime.datetime.utcnow(),
            }
        }


class FrysSpider(scrapy.Spider):
    #scrapy settings
    name = 'frys'
    allowed_domains = ['frys.com']

    # pricebot settings
    headers = settings.headers
    cookies = {'ZCS': '20886', 'HZF': 'true'}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def start_requests(self):
        start_url = 'http://www.frys.com/template/maps/index'
        yield scrapy.Request(
            start_url,
            headers=self.headers,
            callback=self.parse)

    def parse(self, response):
        for link in response.xpath('//div[@id="MainContainer"]//table//tr//td[3]//a/@href'):
            url = response.urljoin(link.extract())
            yield scrapy.Request(
                url,
                headers=self.headers,
                dont_filter=False,
                callback=self.parse_list)




    def parse_list(self, response):
        for link in response.xpath('//small//b/a/@href'):
            url = response.urljoin(link.extract())
            yield scrapy.Request(
                url,
                headers={
                    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/55.0.2883.85 Safari/537.31'
                },
                cookies=self.cookies,
                dont_filter=False,
                callback=self.parse_detail,
            )

            nexturl = None
            try:
                nexturl = response.urljoin(response.xpath('//li[@class="active"]/following-sibling::li/a/@href').extract()[0])
            # no next page link, for frys, each page is 10 items by default
            except IndexError:
                nexturl = None
            if nexturl is not None:
                nexturl = parse.urljoin('http://www.frys.com', nexturl)
                yield scrapy.Request(
                    nexturl,
                    headers=self.headers,
                    cookies=self.cookies,
                    dont_filter=False,
                    callback=self.parse_list,
                )


    def parse_detail(self, response):
        for sel in response.xpath('//body'):
            item = PricebotFrysItem(sel)
            item.scrape_item()
            yield item

