from bs4 import BeautifulSoup
import requests
import json

def scrape_part1():
    base_url = "https://www.pokemon.jp/zukan/detail/"
    # + number.html
    json_dic = {}
    with open("zukan.js","w") as f:
        for zukan_number in range(1,810):
            url = base_url+format(str(zukan_number),"0>3")+".html"
            response = requests.get(url)
            soup = BeautifulSoup(response.text,"lxml")
            json_dic[soup.find(class_="name").text] = {"id":zukan_number,"image":"https://www.pokemon.jp"+soup.find(class_="profile-phto").img["src"]}
        f.writelines(json.dumps(json_dic,ensure_ascii=False))
scrape_part1()