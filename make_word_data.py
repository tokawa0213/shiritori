from bs4 import BeautifulSoup
from selenium import webdriver
import requests
import json
import re
import json
from tqdm import tqdm

def convert_name(name_str):
    name_str = re.sub("♀","メス",name_str)
    name_str = re.sub("♂","オス",name_str)
    name_str = re.sub("Z","ゼット",name_str)
    name_str = re.sub("２","ツー",name_str)
    name_str = re.sub("\(.+\)","",name_str)
    return name_str

def scrape_part1():
    base_url = "https://zukan.pokemon.co.jp/detail/"
    # + number.html
    json_dic = {}
    driver = webdriver.PhantomJS()
    with open("zukan.js","w") as f:
        f.writelines("var zukan=")
        for zukan_number in tqdm(range(1,890)):
            url = base_url+format(str(zukan_number),"0>3")+".html"
            driver.get(url)
            response = requests.get(url)
            soup = BeautifulSoup(driver.page_source,"lxml")
            info = json.loads(soup.find("script",attrs={"id":"json-data"}).text)
            json_dic[convert_name(info["pokemon"]["name"])] = {"id":info["pokemon"]["no"],"image":info["pokemon"]["image_m"]}
        '''
        base_url = "https://yakkun.com/swsh/zukan/n"
        driver = webdriver.PhantomJS()
        for zukan_number in range(810,891):
            url = base_url+str(zukan_number)
            driver.get(url)
            soup = BeautifulSoup(driver.page_source,"lxml")
            json_dic[convert_name(soup.find(class_="center").img["alt"])] = {"id":zukan_number,"image":"https:"+soup.find(class_="center").img["src"]}
        '''
        f.writelines(json.dumps(json_dic,ensure_ascii=False))

if __name__ == "__main__":
    scrape_part1()