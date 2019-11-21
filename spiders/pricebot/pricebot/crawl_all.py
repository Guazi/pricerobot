from spiders import microcenter, frys
from spiders.target import target

from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

process = CrawlerProcess(get_project_settings())
process.crawl(microcenter.MicrocenterSpider, store="085")
process.crawl(microcenter.MicrocenterSpider, store="081")
process.crawl(microcenter.MicrocenterSpider, store="125")
process.crawl(microcenter.MicrocenterSpider, store="061")
process.crawl(frys.FrysSpider)
process.crawl(target.TargetSpider)
process.start()
#